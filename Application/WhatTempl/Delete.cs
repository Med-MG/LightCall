using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Persistence;

namespace Application.WhatTempl
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
                var templToDel = await _context.WhatTemps.FindAsync(request.id);
                _context.WhatTemps.Remove(templToDel);
                var Result = await _context.SaveChangesAsync() > 0;
                if (!Result) return Result<Unit>.Failure("Failed to Delete Order");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}