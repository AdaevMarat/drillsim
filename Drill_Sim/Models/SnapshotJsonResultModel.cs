using System.Web.Mvc;

namespace Drill_Sim.Models
{
    public class SnapshotJsonResultModel : JsonResult
    {
        public SnapshotJsonResultModel()
        {
            // TODO: Empty Constructor
        }
        public int id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
    }
}