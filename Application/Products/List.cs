using System.Collections.Generic;
using System.Linq;
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
    public class List
    {
        public class Query : IRequest<List<Product>>{}

        public class Handler : IRequestHandler<Query, List<Product>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }
            public async Task<List<Product>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
                // return Result<List<Product>>.Success( await _context.Products.ToListAsync());
                var AllProdcuts = await _context.Products
                // .Where(p => p.User == user)
                .Include(x => x.Project)
                .Include(x => x.Photos)
                .Include(x => x.User)
                .ToListAsync();
                return AllProdcuts;
            }
        } 
    }
}