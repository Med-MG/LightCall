using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Sms
{
    public class Details
    {
        public class Query : IRequest<Result<SMS>>
        {
            public Guid id { get; set; }

        }

        public class Handler : IRequestHandler<Query, Result<SMS>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<SMS>> Handle(Query request, CancellationToken cancellationToken)
            {
                var sms = await _context.Smss.FindAsync(request.id);

                return Result<SMS>.Success(sms);
            }
        }
    }
}