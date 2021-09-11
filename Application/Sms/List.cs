using System.Collections.Generic;
using MediatR;
using Domain;
using System.Threading.Tasks;
using System.Threading;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Core;

namespace Application.Sms
{
    public class List
    {
        public class Query : IRequest<Result<List<SMS>>> { }

        public class Handler : IRequestHandler<Query, Result<List<SMS>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<List<SMS>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<SMS>>.Success( await _context.Smss.Include(o=> o.Project ).Include(o=>o.Status).ToListAsync());
               
            }
        }
    }
}