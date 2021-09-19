using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.UpSell
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
                var upSell = await _context.Upsell.FindAsync(request.Id);
                
                if(upSell != null && upSell.User == user ){
                   var product =await _context.Products
                                      .Where(p => p.upsell == upSell)
                                      .FirstOrDefaultAsync();
                    // product.upSell = null;
                    // _context.Products.Update(product);
                    product.upsell= null;
                    _context.Products.Update(product);
                    _context.Upsell.Remove(upSell);
                    await _context.SaveChangesAsync();
                    return Unit.Value;
                }
                else{
                    return Unit.Value;
                }
            }
        }
    }
}