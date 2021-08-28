using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Products
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var prduct = await _context.Products.FindAsync(request.id);

                var photo = await _context.Photos.Where(p => p.product == prduct)
                                      .FirstOrDefaultAsync();

                _context.Remove(photo);
                _context.Remove(prduct);
                var Result =  await _context.SaveChangesAsync() > 0;
                if (!Result) return Result<Unit>.Failure("Failed to Delete Product");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}