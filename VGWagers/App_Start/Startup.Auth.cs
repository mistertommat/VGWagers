﻿using System;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.Google;
using Owin.Security.Providers.Twitch;
using Owin;
using VGWagers.Models;

namespace VGWagers
{
    public partial class Startup
    {
        // For more information on configuring authentication, please visit http://go.microsoft.com/fwlink/?LinkId=301864
        public void ConfigureAuth(IAppBuilder app)
        {
            // Configure the db context, user manager and signin manager to use a single instance per request
            app.CreatePerOwinContext(ApplicationDbContext.Create);
            app.CreatePerOwinContext<ApplicationUserManager>(ApplicationUserManager.Create);
            app.CreatePerOwinContext<ApplicationRoleManager>(ApplicationRoleManager.Create);
            app.CreatePerOwinContext<ApplicationSignInManager>(ApplicationSignInManager.Create);

            // Enable the application to use a cookie to store information for the signed in user
            // and to use a cookie to temporarily store information about a user logging in with a third party login provider
            // Configure the sign in cookie
            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
                LoginPath = new PathString("/Account/LoginRohit"),
                Provider = new CookieAuthenticationProvider
                {
                    // Enables the application to validate the security stamp when the user logs in.
                    // This is a security feature which is used when you change a password or add an external login to your account.  
                    OnValidateIdentity = SecurityStampValidator.OnValidateIdentity<ApplicationUserManager, ApplicationUser,int>(
                        validateInterval: TimeSpan.FromMinutes(30),
                        regenerateIdentityCallback : (manager, user) => user.GenerateUserIdentityAsync(manager),getUserIdCallback:(id)=>(id.GetUserId<int>()))
                }
            });            
            app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalCookie);

            // Enables the application to temporarily store user information when they are verifying the second factor in the two-factor authentication process.
            app.UseTwoFactorSignInCookie(DefaultAuthenticationTypes.TwoFactorCookie, TimeSpan.FromMinutes(5));

            // Enables the application to remember the second login verification factor such as phone or email.
            // Once you check this option, your second step of verification during the login process will be remembered on the device where you logged in from.
            // This is similar to the RememberMe option when you log in.
            app.UseTwoFactorRememberBrowserCookie(DefaultAuthenticationTypes.TwoFactorRememberBrowserCookie);

            // Uncomment the following lines to enable logging in with third party login providers
                        
            app.UseMicrosoftAccountAuthentication(
                clientId: "000000004816AE40",
                clientSecret: "NsWZmFfNPLJWpKgtYzeqabZwKNCclnyx");

            app.UseTwitchAuthentication("81pnvg1bh7tsmg6p6ivn3mjflvezcho", "edwonh6ltgyo073z3ufgxdo89ilfabr");

            app.UseTwitterAuthentication(
               consumerKey: "QPbxUIXjC1LvqptY4qxqWGC7Y",
               consumerSecret: "EvZd0Nf8UOuIATERkaBXHXVPtiLbLnRadiNGoIX3qLgEPzclVF");

            app.UseFacebookAuthentication(
               appId: "1632364560367953",
               appSecret: "08a9b12b114133aa9408ec5893042ca4");

            //422847611256743
            //261ab3ebdeb8dfca703df360cdcf861e

            app.UseGoogleAuthentication(
                 clientId: "13059308991-ij2h290q6o779h2df0q6racogte4m5ok.apps.googleusercontent.com",
                 clientSecret: "MzYKj7ubp4sZfq5x2j2SBHcH");
        }
    }
}