using MediatR;
using Domain;
using System.Threading.Tasks;
using System.Threading;
using Persistence;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using FluentValidation;
using Application.Core;
using System.Collections.Generic;

namespace Application.UpSell
{
    public class Create 
    {
        public class Command : IRequest<Result<Unit>>
        {
            public UpsellDto Upsell { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Upsell).SetValidator(new UpSellValidator());
            }
        }
        public class Handler : IRequestHandler<Command , Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context , IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {   
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
                // request.Upsell.User = user;
                List<Product> Products = new List<Product>();

                foreach (var product in request.Upsell.Products_ids)
                {
                    Products.Add(await _context.Products.FindAsync(product));
                }

                
                Upsell upsell = new Upsell(){
                    Status = request.Upsell.Status ,
                    Name = request.Upsell.Name,
                    Project = await _context.Projects.FindAsync(request.Upsell.Project_id),
                    // Product = Products,
                    User = user
                };

                foreach(var prd in Products)
                {
                    prd.upsell = upsell;
                    _context.Products.Update(prd);
                    // await _context.SaveChangesAsync();  
                }

                await _context.Upsell.AddAsync(upsell);
                var Result = await _context.SaveChangesAsync() > 0;
                if(!Result) return Result<Unit>.Failure("Failed to create upsell");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}