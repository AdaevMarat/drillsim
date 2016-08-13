using System.Web;
using System.Web.Optimization;

namespace Drill_Sim
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {

            // add new bundles 
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // adding manual js in bundle to project
            bundles.Add(new ScriptBundle("~/bundles/manual_js").Include(
                "~/Scripts/manual_js/login_scripts.js",
                "~/Scripts/manual_js/rotor_scripts.js",
                "~/Scripts/d3.min.js"));
            // jQuery
            bundles.Add(new ScriptBundle("~/bundles/manual_jq").Include(
                "~/Scripts/manual_js/jquery-1.7.1.min.js",
                "~/Scripts/manual_js/jquery-ui.min.js",
                "~/Scripts/manual_js/jquery.animateNumber.js",
                "~/Scripts/manual_js/jquery.animateNumber.min.js",
                "~/Scripts/manual_js/jquery.fullscreen.js",
                "~/Scripts/manual_js/jqueryrotate.2.1.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

            bundles.Add(new StyleBundle("~/Content/manual_css").Include(
                      "~/Content/login_style.css"));
        }
    }
}
