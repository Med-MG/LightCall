using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;


namespace Application.UpSell
{
    public class List
    {
        public class Query : IRequest<List<Upsell>> { }
        public class Handler : IRequestHandler<Query, List<Upsell>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<List<Upsell>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
                var allUpSell = await _context.Upsell
                                // .Where(x => x.User == user)
                                .Include(x => x.Project)
                                .Include(x => x.Product_ids)
                                .ToListAsync();
                return allUpSell;
            }
        }
    }
}