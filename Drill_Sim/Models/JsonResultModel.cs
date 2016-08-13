using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Drill_Sim.Models
{
    public class JsonResultModel : JsonResult
    {
        public JsonResultModel()
        {
            // TODO: Empty Constructor
        }
        public bool is_success { get; set; }
        public string id { get; set; }
        public string password { get; set; }
        public string name_surname { get; set; }
        public string pass_num{ get; set; }
        public string issued_by { get; set; }
        public string course_name { get; set; }
        public string ip_num { get; set; }
        public string diff_lvl { get; set; }
    }
}