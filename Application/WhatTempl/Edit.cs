using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;


namespace Application.WhatTempl
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public WhatTemp whatTemp { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;




            public Handler(DataContext context, IMapper mapper)

            {
                _mapper = mapper;
                _context = context;

            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {

                var templ = await _context.WhatTemps.FindAsync(request.whatTemp.Id);
                templ.Message = request.whatTemp.Message;
                

               
                var Result = await _context.SaveChangesAsync() > 0;

                if (!Result) return Result<Unit>.Failure("Failed to Update Template");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}