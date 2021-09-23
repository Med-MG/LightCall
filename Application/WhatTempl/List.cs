﻿using System.Collections.Generic;
using MediatR;
using Domain;
using System.Threading.Tasks;
using System.Threading;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Core;

namespace Application.WhatTempl
{
    public class List
    {
        public class Query : IRequest<Result<List<WhatTemp>>> { }

        public class Handler : IRequestHandler<Query, Result<List<WhatTemp>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<List<WhatTemp>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<WhatTemp>>.Success( await _context.WhatTemps.ToListAsync());
               
            }
        }
    }
}