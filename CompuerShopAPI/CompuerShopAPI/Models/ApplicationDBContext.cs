using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace CompuerShopAPI.Models
{
    public class ApplicationDBContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDBContext() : base("CS")
        {

        }
        public virtual DbSet<Computer> Computers { get; set; }
        public virtual DbSet<Cart> Carts { get; set; }

        //public System.Data.Entity.DbSet<BookStoreApi.Models.ApplicationUser> ApplicationUsers { get; set; }
    }
}