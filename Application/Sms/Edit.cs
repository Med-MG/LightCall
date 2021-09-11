using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;


namespace Application.Sms
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public SmsDto sms { get; set; }
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

                var status = await _context.Status.FindAsync(request.sms.StatusId);
                var project = await _context.Projects.FindAsync(request.sms.ProjectId);

                var sms = await _context.Smss.FindAsync(request.sms.Id);

                sms.IsActive = request.sms.IsActive;
                sms.SmsName = request.sms.SmsName;
                sms.Message = request.sms.Message;
                sms.Status = status;
                sms.Project = project;



                var Result = await _context.SaveChangesAsync() > 0;

                if (!Result) return Result<Unit>.Failure("Failed to Update SMS");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}