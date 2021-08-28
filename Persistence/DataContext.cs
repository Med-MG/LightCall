using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
 public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
            
        }
        public  DbSet<OperatorAcc> OperatoreAccount { get; set; }
        public  DbSet<City> Cities { get; set; }
        public DbSet<StatusModel> Status { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Confirmation> Confirmations { get; set; }
        public  DbSet<Shipping_Company> Shipping_Companies { get; set; }
        public  DbSet<Product> Products { get; set; }
        public  DbSet<Upsell> Upsell { get; set; }
        public  DbSet<Customer> Customers { get; set; }
        public  DbSet<Photo> Photos { get; set; }

    }
}