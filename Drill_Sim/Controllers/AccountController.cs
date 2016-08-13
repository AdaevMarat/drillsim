using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Drill_Sim.Models;

namespace Drill_Sim.Controllers
{
    //[Authorize]
    public class AccountController : Controller
    {
        ApplicationDbContext db = new ApplicationDbContext();
        private ApplicationSignInManager _signInManager;
        private ApplicationUserManager _userManager;
        public AccountController()
        {
        }

        public AccountController(ApplicationUserManager userManager, ApplicationSignInManager signInManager )
        {
            UserManager = userManager;
            SignInManager = signInManager;
        }

        public ApplicationSignInManager SignInManager
        {
            get
            {
                return _signInManager ?? HttpContext.GetOwinContext().Get<ApplicationSignInManager>();
            }
            private set 
            { 
                _signInManager = value; 
            }
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        // GET: /Account/Login
        [AllowAnonymous]
        public ActionResult Login()
        {
            return View();
        }


        //TODO: create http post that fils form, separate with login. Login creates role and redirects to Standalone.
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> Validate(LoginViewModel model)
        {
            JsonResultModel j_model = new JsonResultModel();
            var list = new ApplicationDbContext().Users.ToList();
            var hasher = UserManager.PasswordHasher;
            foreach (ApplicationUser u in list)
            {
                if (hasher.VerifyHashedPassword(u.PasswordHash, model.Password) == PasswordVerificationResult.Success)
                {
                    j_model.id = u.Id;
                    j_model.is_success = true;
                    j_model.name_surname = u.name + " " + u.surname;
                    j_model.pass_num = u.pass_id;
                    j_model.issued_by = u.issued_by;
                    j_model.course_name = u.course_name;
                    j_model.ip_num = u.ip;
                    j_model.diff_lvl = u.diff_lvl + "";
                    return await Task.FromResult(Json(j_model, JsonRequestBehavior.AllowGet));
                }
            }
            j_model.is_success = false;
            return await Task.FromResult(Json(j_model, JsonRequestBehavior.AllowGet));
        }

        // Hint: called when student submits exam form
        // GET
        public async Task<JsonResult> AddToExamList(string id)
        {
            var user = UserManager.FindById(id);
            GlobalVariables.Online_exam_waiting_list_instance.Add(new JsonResultModel()
            {
                id = id,
                name_surname = User.Identity.Name,
                pass_num = user.pass_id,
                issued_by = user.issued_by,
                course_name = user.course_name,
                ip_num = user.ip,
                diff_lvl = user.diff_lvl + "",
            });
            return await Task.FromResult(Json(new JsonResultModel() { is_success = true }, JsonRequestBehavior.AllowGet));
        }

        // Hint: onlly called if role = (supervisor || universal)
        // Account/GetDataAsync
        [AllowAnonymous]
        public async Task<JsonResult> GetDataAsync(string concat)
        {
            // split concat get vals
            string[] parts = concat.Split(null);
            var uid = parts[0]; var driller_uid = parts[1]; var snp_name = parts[2]; var snp_id = parts[3];
            TempData[uid + "_driller_uid"] = driller_uid;
            TempData[uid + "_snp_name"] = snp_name;
            TempData[uid + "_snp_id"] = snp_id;
            TempData.Keep();
            var data = new JsonResultModel() { is_success = true };
            return await Task.FromResult(Json(data, JsonRequestBehavior.AllowGet));
        }

        // Hint: triggers when user select working mode in practice_form
        // /Account/SetWorkMode?type=
        [AllowAnonymous]
        public async Task<JsonResult> SetWorkMode(string concat)
        {
            // concant string id + " " + type
            string[] parts = concat.Split('_');
            var id = parts[0]; var role = parts[1]; var data = "success";
            TempData[id] = role; TempData.Keep();
            return await Task.FromResult(Json(data, JsonRequestBehavior.AllowGet));
        }

        // Hint: triggers when submit button called// receive ajax request from client here
        // GET
        // /Account/GetOnlineList?id=
        [AllowAnonymous]
        public async Task<JsonResult> GetOnlineList(string id)
        {
            if(GlobalVariables.Online_driller_list_instance.Any()) // if !empty
            {
                return await Task.FromResult(Json(GlobalVariables.Online_driller_list_instance, JsonRequestBehavior.AllowGet));
            } else {
                // if empty
                var data = new JsonResultModel[1];
                data[0] = new JsonResultModel() {
                    id = null,
                    name_surname = "no one is online currently",
                    diff_lvl = null
                };
                return await Task.FromResult(Json(data, JsonRequestBehavior.AllowGet));
            }
        }


        // GET:
        // /Account/SetStatus
        public void SetStatus(string ids)
        {
            // ids = s.id + d_id + s_id
            var parts = ids.Split(null);
            var snapshot_id = parts[0]; var driller_id = parts[1]; var supervisor_id = parts[2];
            TempData["exam_role_" + supervisor_id] = "supervisor";
            TempData["exam_role_" + driller_id] = "driller";
            // info, values to peek for a single request
            TempData["exam_snpid_" + driller_id] = snapshot_id;
            TempData["exam_snpid_" + supervisor_id] = snapshot_id;
            TempData["exam_drillerid_" + supervisor_id] = driller_id; // storing roomName for supervisor
            // for GetStatus, to check whether it's empty or not
            TempData["exam_" + driller_id] = driller_id;
            TempData["exam_" + supervisor_id] = supervisor_id;
        }

        // GET:
        // /Account/GetStatus
        public async Task<JsonResult> GetStatus(string uid)
        {
            // authorized till this moment
            if (TempData["exam_" + uid] != null)
            {
                // redirect to exam with id
                var url = Url.Action("Exam", "User", new { id = uid });
                return await Task.FromResult(Json(url, JsonRequestBehavior.AllowGet));
            }
            return await Task.FromResult(Json(null, JsonRequestBehavior.AllowGet));
        }

        //
        // POST: /Account/Login
        [AllowAnonymous]
        [HttpPost]
        //[ValidateAntiForgeryToken]
        public async Task<ActionResult> Login(LoginViewModel model)
        {
            if (model.Username == " Фамилия и имя") // not validated
            {
                return await Validate(model);
            }
            string returnUrl = "Error";
            // This doesn't count login failures towards account lockout
            // To enable password failures to trigger account lockout, change to shouldLockout: true
            var result = await SignInManager.PasswordSignInAsync(model.Username, model.Password, false, shouldLockout: false);
            switch (result)
            {
                case SignInStatus.Success:
                    //UserManager.AddToRole(cur_id, model.Mode);
                    return Json(new { RedirectUrl = Url.Action("Standalone", "User", new { id = model.Username }) });
                case SignInStatus.LockedOut:
                    return View("Lockout");
                case SignInStatus.RequiresVerification:
                    return RedirectToAction("SendCode", new { ReturnUrl = returnUrl, RememberMe = false });
                case SignInStatus.Failure:
                default:
                    ModelState.AddModelError("", "Invalid login attempt.");
                    return Content("Username or Pass incorrect");
            }
        }

        //
        // GET: /Account/LoginInstructor
        [AllowAnonymous]
        public ActionResult LoginInstructor()
        {
            return View();
        }

        //
        // POST: /Account/LoginInstructor
        [AllowAnonymous]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> LoginInstructor(InstructorLoginViewModel model)
        {
            string returnUrl = "Error";
            // This doesn't count login failures towards account lockout
            // To enable password failures to trigger account lockout, change to shouldLockout: true
            var result = await SignInManager.PasswordSignInAsync(model.Username, model.Password, false, shouldLockout: false);
            switch (result)
            {
                case SignInStatus.Success:
                    //UserManager.AddToRole(cur_id, model.Mode);
                    return RedirectToAction("Instructor", "User", new { id = model.Username });
                case SignInStatus.LockedOut:
                    return View("Lockout");
                case SignInStatus.RequiresVerification:
                    return RedirectToAction("SendCode", new { ReturnUrl = returnUrl, RememberMe = false });
                case SignInStatus.Failure:
                default:
                    ModelState.AddModelError("", "Invalid login attempt.");
                    return Content("Username or Pass incorrect");
            }
        }

        //
        // GET: /Account/VerifyCode
        [AllowAnonymous]
        public async Task<ActionResult> VerifyCode(string provider, string returnUrl, bool rememberMe)
        {
            // Require that the user has already logged in via username/password or external login
            if (!await SignInManager.HasBeenVerifiedAsync())
            {
                return View("Error");
            }
            return View(new VerifyCodeViewModel { Provider = provider, ReturnUrl = returnUrl, RememberMe = rememberMe });
        }

        //
        // POST: /Account/VerifyCode
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> VerifyCode(VerifyCodeViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            // The following code protects for brute force attacks against the two factor codes. 
            // If a user enters incorrect codes for a specified amount of time then the user account 
            // will be locked out for a specified amount of time. 
            // You can configure the account lockout settings in IdentityConfig
            var result = await SignInManager.TwoFactorSignInAsync(model.Provider, model.Code, isPersistent:  model.RememberMe, rememberBrowser: model.RememberBrowser);
            switch (result)
            {
                case SignInStatus.Success:
                    return RedirectToLocal(model.ReturnUrl);
                case SignInStatus.LockedOut:
                    return View("Lockout");
                case SignInStatus.Failure:
                default:
                    ModelState.AddModelError("", "Invalid code.");
                    return View(model);
            }
        }
        
        //
        // GET: /Account/Register
        [AllowAnonymous]
        public ActionResult Register(String key)
        {
            if (key == null)
            {
                return View("Error");
            }
            if(key.Equals("rsha123")) {
                return View();
            }
            return View("Error");
        }

        //
        // GET: /Account/RegisterInstructor
        [AllowAnonymous]
        public ActionResult RegisterInstructor()
        {
            return View();
        }

        //
        // POST: /Account/RegisterInstructor
        [HttpPost]
        public async Task<ActionResult> RegisterInstructor(InstructorRegisterViewModel model)
        {
            if(ModelState.IsValid)
            {
                // creating instructor
                var user = new ApplicationUser
                {
                    UserName = model.Username,
                    name = model.Username,
                    surname = model.Username,
                    pass_id = model.Username,
                    issued_by = model.Username,
                    course_name = "drill_sim",
                    ip = model.Username,
                    Email = model.Username + "@gmail.com"
                };
                var result = await UserManager.CreateAsync(user, model.Password);
                if(result.Succeeded)
                {
                    await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);
                    return RedirectToAction("Instructor", "User");
                }
            }
            return View("Error");
        }

        //
        // POST: /Account/Register
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Register(RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = new ApplicationUser {
                    UserName = model.name + " " + model.surname,
                    name = model.name,
                    surname = model.surname,
                    pass_id = model.pass_id,
                    issued_by = model.issued_by,
                    course_name = model.course_name,
                    ip = model.ip,
                    Email = model.Email,
                    diff_lvl = model.diff_lvl
                };
                var result = await UserManager.CreateAsync(user, model.Password);
                
                if (result.Succeeded)
                {
                    await SignInManager.SignInAsync(user, isPersistent:false, rememberBrowser:false);
                    
                    // For more information on how to enable account confirmation and password reset please visit http://go.microsoft.com/fwlink/?LinkID=320771
                    // Send an email with this link
                    // string code = await UserManager.GenerateEmailConfirmationTokenAsync(user.Id);
                    // var callbackUrl = Url.Action("ConfirmEmail", "Account", new { userId = user.Id, code = code }, protocol: Request.Url.Scheme);
                    // await UserManager.SendEmailAsync(user.Id, "Confirm your account", "Please confirm your account by clicking <a href=\"" + callbackUrl + "\">here</a>");
                    
                    return RedirectToAction("Index", "Home");
                }
                AddErrors(result);
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        //
        // GET: /Account/ConfirmEmail
        [AllowAnonymous]
        public async Task<ActionResult> ConfirmEmail(string userId, string code)
        {
            if (userId == null || code == null)
            {
                return View("Error");
            }
            var result = await UserManager.ConfirmEmailAsync(userId, code);
            return View(result.Succeeded ? "ConfirmEmail" : "Error");
        }

        //
        // GET: /Account/ForgotPassword
        [AllowAnonymous]
        public ActionResult ForgotPassword()
        {
            return View();
        }

        //
        // POST: /Account/ForgotPassword
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ForgotPassword(ForgotPasswordViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await UserManager.FindByNameAsync(model.Email);
                if (user == null || !(await UserManager.IsEmailConfirmedAsync(user.Id)))
                {
                    // Don't reveal that the user does not exist or is not confirmed
                    return View("ForgotPasswordConfirmation");
                }

                // For more information on how to enable account confirmation and password reset please visit http://go.microsoft.com/fwlink/?LinkID=320771
                // Send an email with this link
                // string code = await UserManager.GeneratePasswordResetTokenAsync(user.Id);
                // var callbackUrl = Url.Action("ResetPassword", "Account", new { userId = user.Id, code = code }, protocol: Request.Url.Scheme);		
                // await UserManager.SendEmailAsync(user.Id, "Reset Password", "Please reset your password by clicking <a href=\"" + callbackUrl + "\">here</a>");
                // return RedirectToAction("ForgotPasswordConfirmation", "Account");
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        //
        // GET: /Account/ForgotPasswordConfirmation
        [AllowAnonymous]
        public ActionResult ForgotPasswordConfirmation()
        {
            return View();
        }

        //
        // GET: /Account/ResetPassword
        [AllowAnonymous]
        public ActionResult ResetPassword(string code)
        {
            return code == null ? View("Error") : View();
        }

        //
        // POST: /Account/ResetPassword
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ResetPassword(ResetPasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }
            var user = await UserManager.FindByNameAsync(model.Email);
            if (user == null)
            {
                // Don't reveal that the user does not exist
                return RedirectToAction("ResetPasswordConfirmation", "Account");
            }
            var result = await UserManager.ResetPasswordAsync(user.Id, model.Code, model.Password);
            if (result.Succeeded)
            {
                return RedirectToAction("ResetPasswordConfirmation", "Account");
            }
            AddErrors(result);
            return View();
        }

        //
        // GET: /Account/ResetPasswordConfirmation
        [AllowAnonymous]
        public ActionResult ResetPasswordConfirmation()
        {
            return View();
        }

        //
        // POST: /Account/ExternalLogin
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult ExternalLogin(string provider, string returnUrl)
        {
            // Request a redirect to the external login provider
            return new ChallengeResult(provider, Url.Action("ExternalLoginCallback", "Account", new { ReturnUrl = returnUrl }));
        }

        //
        // GET: /Account/SendCode
        [AllowAnonymous]
        public async Task<ActionResult> SendCode(string returnUrl, bool rememberMe)
        {
            var userId = await SignInManager.GetVerifiedUserIdAsync();
            if (userId == null)
            {
                return View("Error");
            }
            var userFactors = await UserManager.GetValidTwoFactorProvidersAsync(userId);
            var factorOptions = userFactors.Select(purpose => new SelectListItem { Text = purpose, Value = purpose }).ToList();
            return View(new SendCodeViewModel { Providers = factorOptions, ReturnUrl = returnUrl, RememberMe = rememberMe });
        }

        //
        // POST: /Account/SendCode
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> SendCode(SendCodeViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View();
            }

            // Generate the token and send it
            if (!await SignInManager.SendTwoFactorCodeAsync(model.SelectedProvider))
            {
                return View("Error");
            }
            return RedirectToAction("VerifyCode", new { Provider = model.SelectedProvider, ReturnUrl = model.ReturnUrl, RememberMe = model.RememberMe });
        }

        //
        // GET: /Account/ExternalLoginCallback
        [AllowAnonymous]
        public async Task<ActionResult> ExternalLoginCallback(string returnUrl)
        {
            var loginInfo = await AuthenticationManager.GetExternalLoginInfoAsync();
            if (loginInfo == null)
            {
                return RedirectToAction("Login");
            }

            // Sign in the user with this external login provider if the user already has a login
            var result = await SignInManager.ExternalSignInAsync(loginInfo, isPersistent: false);
            switch (result)
            {
                case SignInStatus.Success:
                    return RedirectToLocal(returnUrl);
                case SignInStatus.LockedOut:
                    return View("Lockout");
                case SignInStatus.RequiresVerification:
                    return RedirectToAction("SendCode", new { ReturnUrl = returnUrl, RememberMe = false });
                case SignInStatus.Failure:
                default:
                    // If the user does not have an account, then prompt the user to create an account
                    ViewBag.ReturnUrl = returnUrl;
                    ViewBag.LoginProvider = loginInfo.Login.LoginProvider;
                    return View("ExternalLoginConfirmation", new ExternalLoginConfirmationViewModel { Email = loginInfo.Email });
            }
        }

        //
        // POST: /Account/ExternalLoginConfirmation
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ExternalLoginConfirmation(ExternalLoginConfirmationViewModel model, string returnUrl)
        {
            if (User.Identity.IsAuthenticated)
            {
                return RedirectToAction("Index", "Manage");
            }

            if (ModelState.IsValid)
            {
                // Get the information about the user from the external login provider
                var info = await AuthenticationManager.GetExternalLoginInfoAsync();
                if (info == null)
                {
                    return View("ExternalLoginFailure");
                }
                var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
                var result = await UserManager.CreateAsync(user);
                if (result.Succeeded)
                {
                    result = await UserManager.AddLoginAsync(user.Id, info.Login);
                    if (result.Succeeded)
                    {
                        await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);
                        return RedirectToLocal(returnUrl);
                    }
                }
                AddErrors(result);
            }

            ViewBag.ReturnUrl = returnUrl;
            return View(model);
        }

        //
        // POST: /Account/LogOff
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult LogOff()
        {
            AuthenticationManager.SignOut();
            return RedirectToAction("Index", "Home");
        }

        //
        // GET: /Account/ExternalLoginFailure
        [AllowAnonymous]
        public ActionResult ExternalLoginFailure()
        {
            return View();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (_userManager != null)
                {
                    _userManager.Dispose();
                    _userManager = null;
                }

                if (_signInManager != null)
                {
                    _signInManager.Dispose();
                    _signInManager = null;
                }
            }

            base.Dispose(disposing);
        }

        #region Helpers
        // Used for XSRF protection when adding external logins
        private const string XsrfKey = "XsrfId";

        private IAuthenticationManager AuthenticationManager
        {
            get
            {
                return HttpContext.GetOwinContext().Authentication;
            }
        }

        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("", error);
            }
        }

        private ActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            return RedirectToAction("Index", "Home");
        }

        internal class ChallengeResult : HttpUnauthorizedResult
        {
            public ChallengeResult(string provider, string redirectUri)
                : this(provider, redirectUri, null)
            {
            }

            public ChallengeResult(string provider, string redirectUri, string userId)
            {
                LoginProvider = provider;
                RedirectUri = redirectUri;
                UserId = userId;
            }

            public string LoginProvider { get; set; }
            public string RedirectUri { get; set; }
            public string UserId { get; set; }

            public override void ExecuteResult(ControllerContext context)
            {
                var properties = new AuthenticationProperties { RedirectUri = RedirectUri };
                if (UserId != null)
                {
                    properties.Dictionary[XsrfKey] = UserId;
                }
                context.HttpContext.GetOwinContext().Authentication.Challenge(properties, LoginProvider);
            }
        }

        #endregion
    }
}