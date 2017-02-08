using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Web;
using System.Data;
using System.IO;
using System.Security.Principal;
using Microsoft.AspNet.Identity;
using VGWagers.Models;
using Microsoft.Owin.Security;
using Moq;
using VGWagers.Controllers;
using System.Web.Helpers;

namespace VGWagers.Tests.Controllers
{
    [TestClass]
    public class AccountControllerTest
    {
        [TestMethod]
        public void WhenRegisteredUserLogsIn()
        {
            HttpContext.Current = CreateHttpContext(userLoggedIn: true);
            var userStore = new Mock<IUserStore<ApplicationUser>>();
            var roleStore = new Mock<IRoleStore<CustomUserRole>>();
            var authenticationManager = new Mock<IAuthenticationManager>();

            var userManager = new Mock<ApplicationUserManager>(userStore.Object);
            var roleManager = new Mock<ApplicationRoleManager>(roleStore.Object);
            var signInManager = new Mock<ApplicationSignInManager>(userManager.Object,authenticationManager.Object);

            var accountController = new AccountController(
        userManager.Object, signInManager.Object,roleManager.Object);

            var result = accountController.LoginJson(new LoginViewModel() { Username = "rohitashwa", Password = "amitabh"}, "");

            //Assert.AreEqual();
        }

        private static HttpContext CreateHttpContext(bool userLoggedIn)
        {
            var httpContext = new HttpContext(
                new HttpRequest(string.Empty, "http://sample.com", string.Empty),
                new HttpResponse(new StringWriter())
            )
            {
                User = userLoggedIn
                    ? new GenericPrincipal(new GenericIdentity("userName"), new string[0])
                    : new GenericPrincipal(new GenericIdentity(string.Empty), new string[0])
            };

            return httpContext;
        }
    }
}
