using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.UpSell
{
    public class Edit
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
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context , IMapper mapper , IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
                var upSell =  await _context.Upsell.FindAsync(request.Upsell.Id);
                if(upSell != null && user == upSell.User){
                    var project = await _context.Projects.FindAsync(request.Upsell.Project_id);
                    List<Product> Products = new List<Product>();
                    foreach (var product in request.Upsell.Products_ids)
                    {
                        Products.Add(await _context.Products.FindAsync(product));
                    }

                    foreach(var prd in Products)
                    {
                        prd.upsell = upSell;
                        _context.Products.Update(prd);
                        // await _context.SaveChangesAsync();  
                    }
                     
                    // upSell.Project = project;
                    // upSell.Product = Products;
                    upSell.Name = request.Upsell.Name;
                    upSell.Status = request.Upsell.Status;
                    _context.Upsell.Update(upSell);
                    // _mapper.Map(request.Upsell , upSell);
                }else{
                    return Result<Unit>.Failure("the Upsell you want to edit doesn't exist");
                }

                var Result = await _context.SaveChangesAsync() > 0;
                if(!Result) return Result<Unit>.Failure("Failed to edit Upsell");
                return Result<Unit>.Success(Unit.Value);
                 
            }
        }
    }    
}