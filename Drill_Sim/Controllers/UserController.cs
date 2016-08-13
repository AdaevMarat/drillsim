using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using Drill_Sim.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace Drill_Sim.Controllers
{
    [Authorize]
    public class UserController : Controller
    {
        // Snapshot db
        private SnapshotDBContext db = new SnapshotDBContext();
        // To manipulate db asynchronously
        private UserStore<ApplicationUser> store;
        private UserManager<ApplicationUser> userManager;
        // GET: Student
        public ActionResult Index()
        {
            return View();
        }

        // Creating snapshot from client
        // TIP: make sure snp name doesn't contain regex (" ")
        [AllowAnonymous]
        [HttpPost]
        public void CreateSnapshot(SnapshotClientModel myData)
        {
            var snp = new SnapshotDB();
            snp.init_snapshot("Snapshot_test2");
            snp.sync_snapshot(myData);
            db.Snapshots.Add(snp);
            db.SaveChanges();
            db.Dispose();
        }

        // TODO: GET: Student/Standalone/id
        public ActionResult Standalone()
        {
            var uid = User.Identity.GetUserId();
            var role = TempData[uid]; // cur role
            var snp = new SnapshotDB(); snp = null;
            ViewBag.role = role == null ? "driller" : role;
            ViewBag.uid = uid;
            if ((string)role == "supervisor" || (string)role == "universal")
            {
                ViewBag.driller_uid = TempData[uid + "_driller_uid"];
                ViewBag.snp_name = TempData[uid + "_snp_name"];
                ViewBag.snp_id = TempData[uid + "_snp_id"];
                snp = GlobalVariables.Snapshot_db_instance.Snapshots.Find(Int32.Parse(ViewBag.snp_id));
            }
            // pass snp model from db to view
            if (snp == null) // call from driller
            {
                return View();
            }
            return View(snp);
        }

        // /User/Exam
        public ActionResult Exam(string id)
        {
            // await while instructor choses work mode
            var uid = id;
            var role = TempData["exam_role_" + uid];
            ViewBag.uid = uid;
            ViewBag.snp_id = TempData.Peek("exam_snpid_" + uid);
            ViewBag.driller_uid = TempData["exam_drillerid_" + uid]; // roomName
            ViewBag.role = role;
            return View();
        }

        // return list of studs JSON res model
        public async Task<JsonResult> GetExamWaitList()
        {
            if(GlobalVariables.Online_exam_waiting_list_instance != null)
            {
                return await Task.FromResult(Json(GlobalVariables.Online_exam_waiting_list_instance, JsonRequestBehavior.AllowGet));
            }
            return await Task.FromResult(Json(null, JsonRequestBehavior.AllowGet));
        }

        // /User/GetSnapshotList
        [AllowAnonymous]
        public async Task<JsonResult> GetSnapshotList(LoginViewModel model)
        {
            var list = db.Snapshots.ToList();
            int size = list.Count;
            SnapshotJsonResultModel[] j_models = new SnapshotJsonResultModel[size];
            int i = 0;
            foreach(var s in list)
            {
                j_models[i] = new SnapshotJsonResultModel();
                j_models[i].id = s.id;
                j_models[i].name = s.name;
                j_models[i++].description = s.description;
            }
            return await Task.FromResult(Json(j_models, JsonRequestBehavior.AllowGet));
        }

        // Student/Instructor
        //[Authorize(Roles = "Instructor")]
        [AllowAnonymous]
        public ActionResult Instructor()
        {
            var snp = new SnapshotDB();
            snp.init_snapshot("Snapshot_test2");
            snp.name = "Scenario_17";
            db.Snapshots.Add(snp);
            db.SaveChanges();
            db.Dispose();
            return View();
        }
    }
}