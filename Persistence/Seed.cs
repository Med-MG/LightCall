using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {

        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if(!userManager.Users.Any()){
                var users = new List<AppUser> {
                    new AppUser{FirstName = "Med", LastName = "Mouiguina", UserName = "Mouiguina", Email = "med@gmail.com", SkypeId = "9746j984938" },
                    new AppUser{FirstName = "Ned", LastName = "Nelson", UserName = "Nelson", Email = "ned@gmail.com", SkypeId = "56456984938" },
                    new AppUser{FirstName = "John", LastName = "Doe", UserName = "JDoe", Email = "john@gmail.com", SkypeId = "734b6454938" },
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                    await userManager.AddToRoleAsync(user, "Member");
                }

                var Operators = new List<OperatorAcc> {
                    new OperatorAcc{FirstName = "Austen", LastName = "Renner", UserName = "Renner", Email = "renner@gmail.com", SkypeId = "3446j984938" },
                    new OperatorAcc{FirstName = "Daren", LastName = "Boyle", UserName = "Boyle", Email = "Boyle@gmail.com", SkypeId = "12456984938" },
                };

                foreach (var op in  Operators)
                {
                    await userManager.CreateAsync(op, "Pa$$w0rd");
                    await userManager.AddToRoleAsync(op, "Operator");
                }
            }

            // if(!roleManager.Roles.Any()){

            //     var Roles = new List<Roles>{
            //         new Roles{roleName = "Admin"},
            //         new Roles{roleName = "User"}
            //     };
            //     foreach (var role in Roles)
            //     {
            //         await roleManager.CreateAsync(role);
            //     }

            // }
            // await roleManager.CreateAsync(new IdentityRole(Roles.Admin.ToString()));

            if (!context.Status.Any())
            {

                var status = new List<StatusModel>
            {
                new StatusModel
                {
                    StatusPiority = 1,
                    StatusType= "new order",
                    ClosingStatus = false ,

                }, new StatusModel
                {
                    StatusPiority = 5,
                    StatusType= "confirmer",
                    ClosingStatus = false ,

                }, new StatusModel
                {
                    StatusPiority = 6,
                    StatusType= "livrer",
                    ClosingStatus = true ,

                },new StatusModel
                {
                    StatusPiority = 4,
                    StatusType= "no answer",
                    ClosingStatus = true ,

                },new StatusModel
                {
                    StatusPiority = 7,
                    StatusType= "cancelled",
                    ClosingStatus = true ,

                },new StatusModel
                {
                    StatusPiority = 3,
                    StatusType= "busy",
                    ClosingStatus = true ,

                },new StatusModel
                {
                    StatusPiority = 2,
                    StatusType= "call later",
                    ClosingStatus = true ,

                },
            };
                await context.Status.AddRangeAsync(status);
                await context.SaveChangesAsync();
            }


            if (context.Cities.Any()) return;
             
             var Citiess = new List<City>
             {
                 new City
                 {
                     CityName = "London",
                     ZipCode = "8378",
                     Shipping_Companies = new List<Shipping_Company>{
                         new Shipping_Company {
                             Name = "Ozzon",
                             ApiClient = "dhj78hj"
                         },
                        new Shipping_Company {
                             Name = "Ozzon",
                             ApiClient = "dhj78hj"
                         }
                     }
                 }
             };

            await context.Cities.AddRangeAsync(Citiess);
            await context.SaveChangesAsync();
        }
    }
}