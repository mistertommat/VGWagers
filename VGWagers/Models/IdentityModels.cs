using System;
using System.Data.Entity;
using System.Security.Claims;
using System.Threading.Tasks;
using VGWagers.IdentityMySQL;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace VGWagers.Models
{
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit http://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class ApplicationUser : IdentityUser<int, CustomUserLogin, CustomUserRole, CustomUserClaim>, IUser
    {
        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser, int> manager)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);
            // Add custom user claims here
            return userIdentity;
        }

        public DateTime DateOfBirth { get; set; }
        public bool TermsAndConditionAccepted { get; set; }
        public bool MarketingMailersAccepted { get; set; }

        public int CountryId { get; set; }
        public int StateId { get; set; }
        public int TimeZoneId { get; set; }

        public string TwitchId { get; set; }
        public string XBoxId { get; set; }
        public string PSNId { get; set; }

        public byte[] ProfilePhoto { get; set; }



        string IUser<string>.Id
        {
            get { throw new NotImplementedException(); }
        }

        string IUser<string>.UserName
        {
            get
            {
                throw new NotImplementedException();
            }
            set
            {
                throw new NotImplementedException();
            }
        }
    }

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser,CustomRole,int,CustomUserLogin,CustomUserRole,CustomUserClaim>
    {
        static ApplicationDbContext()
        {
            Database.SetInitializer(new MySqlInitializer());
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
           
            modelBuilder.Entity<CustomRole>().HasKey<int>(r => r.Id);
            modelBuilder.Entity<CustomUserRole>().HasKey(r => new { r.RoleId, r.UserId });
            modelBuilder.Entity<CustomUserLogin>().HasKey(u => new { u.UserId , u.LoginProvider , u.ProviderKey });
            base.OnModelCreating(modelBuilder);
            
        }

        public ApplicationDbContext()
            : base("DefaultConnection")
        {
        }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }
    }

    public class CustomUserRole : IdentityUserRole<int>, IRole
    {
        string IRole<string>.Id
        {
            get { throw new NotImplementedException(); }
        }

        string IRole<string>.Name
        {
            get
            {
                throw new NotImplementedException();
            }
            set
            {
                throw new NotImplementedException();
            }
        }
    }
    public class CustomUserClaim : IdentityUserClaim<int> { }
    public class CustomUserLogin : IdentityUserLogin<int> { }

    public class CustomRole : IdentityRole<int, CustomUserRole>
    {
        public CustomRole() { }
        public CustomRole(string name) { Name = name; }
    }

    public class CustomUserStore : UserStore<ApplicationUser, CustomRole, int,
        CustomUserLogin, CustomUserRole, CustomUserClaim>
    {
        public CustomUserStore(ApplicationDbContext context)
            : base(context)
        {
        }
    }

    public class CustomRoleStore : RoleStore<CustomRole, int, CustomUserRole>
    {
        public CustomRoleStore(ApplicationDbContext context)
            : base(context)
        {
        }
    } 
}