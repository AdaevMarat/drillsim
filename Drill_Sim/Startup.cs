using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Drill_Sim.Startup))]
namespace Drill_Sim
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
            app.MapSignalR();
        }
    }
}
