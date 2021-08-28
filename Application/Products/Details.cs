using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Products
{
    public class Details
    {
        public class Query : IRequest<Result<Product>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Product>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<Product>> Handle(Query request, CancellationToken cancellationToken)
            {
                var product = await _context.Products
                                .Include(x => x.Project)
                                .Include(x => x.Photos)
                                .Include(x => x.User)
                                .FirstOrDefaultAsync(p => p.Id == request.Id);;

                return Result<Product>.Success(product);
            }
        }
    }
}