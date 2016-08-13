using System;
using System.Collections.Generic;

namespace Drill_Sim.Models
{
    public class GlobalVariables
    {
        // SingleTon pattern
        private static readonly ApplicationDbContext db_instance = new ApplicationDbContext();
        private static SnapshotDBContext snapshot_db_instance = new SnapshotDBContext();
        // drillers
        private static List<JsonResultModel> online_driller_list_instance = new List<JsonResultModel>();
        // exam students
        private static List<JsonResultModel> online_exam_waiting_list_instance = new List<JsonResultModel>();

        static GlobalVariables ()
        {

        }
        
        private GlobalVariables()
        {

        }

        // Method to access db
        public static ApplicationDbContext Db_instance
        {
            get
            {
                return db_instance;
            }
        }
        
        // Method to access snapshot db
        public static SnapshotDBContext Snapshot_db_instance
        {
            get
            {
                return snapshot_db_instance;
            }
        }


        public static List<JsonResultModel> Online_driller_list_instance
        {
            get
            {
                return online_driller_list_instance;
            }
        }

        // for exam mode only // containts both supervisors and drillers
        public static List<JsonResultModel> Online_exam_waiting_list_instance
        {
            get
            {
                return online_exam_waiting_list_instance;
            }
        }

        public static object Online_waiting_exam_list_instance { get; internal set; }
    }
}