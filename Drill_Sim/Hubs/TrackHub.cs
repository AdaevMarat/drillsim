using Microsoft.AspNet.Identity;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.Identity.EntityFramework;
using Drill_Sim.Models;

namespace Drill_Sim.Hubs
{
    public class TrackHub : Hub
    {
        // To manipulate db asynchronously
        private UserStore<ApplicationUser> store;
        private UserManager<ApplicationUser> userManager;

        public override Task OnConnected()
        { 
            return base.OnConnected();
        }

        // Hint: roomName = (Driller.uid)
        // TODO:
        public async Task JoinRoom(string roomName, string role)
        {
            await Groups.Add(Context.ConnectionId, roomName);
            if(role == "driller")
            {
                var user = get_user();
                GlobalVariables.Online_driller_list_instance.Add(new JsonResultModel()
                {
                    id = Context.User.Identity.GetUserId(),
                    name_surname = Context.User.Identity.Name,
                    diff_lvl = userManager.FindById(Context.User.Identity.GetUserId()).diff_lvl + ""
                });
            }
            // if role == supervisor get snapshot by Tempdata[uid + _snp_name]
            //Clients.OthersInGroup(roomName).notify(role);
            //return Groups.Add(Context.ConnectionId, roomName);
        }

        public Task LeaveRoom(string roomName)
        {
            return Groups.Remove(Context.ConnectionId, roomName);
        }

        public void print_list()
        {
            System.Diagnostics.Debug.WriteLine("List content: ");
            var list = GlobalVariables.Online_driller_list_instance;
            int i = 0;
            foreach( var user in list)
            {
                System.Diagnostics.Debug.WriteLine(++i + " " + user);
            }
        }

        // TODO:// iterate through db asynchronously to get user info
        public async Task<ApplicationUser> get_user()
        {
            if(store == null && userManager == null)
            {
                store = new UserStore<ApplicationUser>(GlobalVariables.Db_instance);
                userManager = new UserManager<ApplicationUser>(store);
            }
            return await Task.FromResult(userManager.FindByNameAsync(Context.User.Identity.Name).Result);
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            var cur_id = Context.User.Identity.GetUserId();
            // remove from practice list
            if(GlobalVariables.Online_driller_list_instance != null) 
            {
                for (int i = 0; i < GlobalVariables.Online_driller_list_instance.Count; i++)
                {
                    if(GlobalVariables.Online_driller_list_instance[i].id == cur_id)
                    {
                        GlobalVariables.Online_driller_list_instance.RemoveAt(i);
                    }
                }
            }
            // remove from exam list
            if(GlobalVariables.Online_exam_waiting_list_instance != null)
            {
                for (int i = 0; i < GlobalVariables.Online_exam_waiting_list_instance.Count; i++)
                {
                    if (GlobalVariables.Online_exam_waiting_list_instance[i].id == cur_id)
                    {
                        GlobalVariables.Online_exam_waiting_list_instance.RemoveAt(i);
                    }
                }
            }
            return base.OnDisconnected(stopCalled);
        }

        /*
         * Closing room, occupying driller, removing from list
         * */
        public void Occupy(string roomName)
        {
            //roomName uid
            for (var i = 0; i < GlobalVariables.Online_driller_list_instance.Count; i++)
            {
                if(GlobalVariables.Online_driller_list_instance[i].id == roomName)
                {
                    GlobalVariables.Online_driller_list_instance.RemoveAt(i);
                }
            }
        }

        /*
         * remove current user from exam_wait_list
        */
        public void RemoveFromWaitList(string uid)
        {
            for (var i = 0; i < GlobalVariables.Online_exam_waiting_list_instance.Count; i++)
            {
                if (GlobalVariables.Online_exam_waiting_list_instance[i].id == uid)
                {
                    GlobalVariables.Online_exam_waiting_list_instance.RemoveAt(i);
                }
            }
        }

        /*
        // TODO: js alarm: client connected
        public void NotifyServer(string name)
        {
            Clients.Others.notify(name);
        }
        */
        // TODO: notify that someone joined particular room
        public void Notify(string roomName)
        {
            Clients.OthersInGroup(roomName).notify();
        }

        public SnapshotDB GetSnapshot(int id)
        {
            var snp = GlobalVariables.Snapshot_db_instance.Snapshots.Find(id);
            return snp;
        }

        // getting snapshot id from supervisor
        public void ShareSnapshotId(int id, string roomName)
        {
            //TODO call driller method on client: s = socket.server.GetSnapshot();
            Clients.OthersInGroup(roomName).setSnpId(id);
        }

        // TODO: update Bitpos
        public void UpdateBitPos(double val, string roomName)
        {
            Clients.OthersInGroup(roomName).updateBitPos(val);
        }
    }
}