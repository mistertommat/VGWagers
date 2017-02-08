using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Microsoft.AspNet.Identity;

namespace VGWagers
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }

        protected async void Application_Error(object sender, EventArgs e)
        {
            var exception = Server.GetLastError();

            IdentityMessage myMessage = new IdentityMessage();
            myMessage.Destination = "er.rohitkumar@gmail.com";
            myMessage.Subject = "VGWager error";

            myMessage.Body = "Error Description: " + exception.Message;
            


            VGWagers.Utilities.EmailService emailServ = new VGWagers.Utilities.EmailService();

            await emailServ.SendAsync(myMessage);
        }


    }
}
