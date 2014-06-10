﻿namespace AngularJSTest.App_Start {
    using System.Web.Mvc;
    using System.Web.Routing;

    public static class MvcConfig {
        public static void Register() {
            ConfigureRoutes(RouteTable.Routes);
        }

        private static void ConfigureRoutes(RouteCollection routes) {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapMvcAttributeRoutes();

            
            routes.MapRoute(
                "Error",
                "{*catchall}",
            new { controller = "Home", action = "Index" }
        );
        }
    }
}