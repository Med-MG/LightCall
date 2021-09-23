using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.WhatTempl
{
    public class Details
    {
        public class Query : IRequest<Result<WhatTemp>>
        {
            public Guid id { get; set; }

        }

        public class Handler : IRequestHandler<Query, Result<WhatTemp>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<WhatTemp>> Handle(Query request, CancellationToken cancellationToken)
            {
                var templ = await _context.WhatTemps.FindAsync(request.id);

                return Result<WhatTemp>.Success(templ);
            }
        }
    }
}