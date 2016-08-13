using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Drill_Sim.Models
{
    public class ExternalLoginConfirmationViewModel
    {
        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; }
    }

    public class ExternalLoginListViewModel
    {
        public string ReturnUrl { get; set; }
    }

    public class SendCodeViewModel
    {
        public string SelectedProvider { get; set; }
        public ICollection<System.Web.Mvc.SelectListItem> Providers { get; set; }
        public string ReturnUrl { get; set; }
        public bool RememberMe { get; set; }
    }

    public class VerifyCodeViewModel
    {
        [Required]
        public string Provider { get; set; }

        [Required]
        [Display(Name = "Code")]
        public string Code { get; set; }
        public string ReturnUrl { get; set; }

        [Display(Name = "Remember this browser?")]
        public bool RememberBrowser { get; set; }

        public bool RememberMe { get; set; }
    }

    public class ForgotViewModel
    {
        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; }
    }

    public class LoginViewModel
    {
        [Required]
        [Display(Name = "Email")]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        // Name + Surname = UserName
        [Required]
        [Display(Name = "Username")]
        public string Username { get; set; }

        // drilelr or supervisor
        public string Mode { get; set; }
        //[Display(Name = "Remember me?")]
        //public bool RememberMe { get; set; }
    }

    public class RegisterViewModel
    {
        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Пароль")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Подтвердите пароль")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }

        [Required]
        [Display(Name = "Имя")]
        public string name { get; set; }

        [Required]
        [Display(Name = "Фамилия")]
        public string surname { get; set; }

        [Required]
        [Display(Name = "Номер паспорта")]
        public string pass_id { get; set; }

        [Required]
        [Display(Name = "Кем выдано")]
        public string issued_by { get; set; }
        [Required]
        [Display(Name = "Название дисциплины")]
        public string course_name { get; set; }
        [Required]
        [Display(Name = "IP - адрес")]
        public string ip { get; set; }
        // uroven slojnosti
        [Required]
        [Display(Name = "Уровень сложности = (2,3,4)")]
        //[StringLength(1, ErrorMessage = "Введите допустимый уровень сложности!", MinimumLength = 1)]
        public int diff_lvl { get; set; }

        // DEFAULT PROPERTIES
        [Required]
        [EmailAddress]
        [Display(Name = "Email")]
        public string Email { get; set; }
    }

    public class InstructorRegisterViewModel
    {
        [Required]
        [Display(Name = "Имя пользователя")]
        public string Username { get; set; }

        [Required]
        [Display(Name = "Пароль для входа в систему")]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }

    public class InstructorLoginViewModel
    {
        [Required]
        [Display(Name = "Имя пользователя")]
        public string Username { get; set; }

        [Required]
        [Display(Name = "Пароль для входа в систему")]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }


    public class ResetPasswordViewModel
    {
        [Required]
        [EmailAddress]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }

        public string Code { get; set; }
    }

    public class ForgotPasswordViewModel
    {
        [Required]
        [EmailAddress]
        [Display(Name = "Email")]
        public string Email { get; set; }
    }
}
