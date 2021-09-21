
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;


namespace Application.Sms
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public SmsDto sms { get; set; }
        }

        public class Handler : IRequestHandler<Command  , Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {

                var status = await _context.Status.FindAsync(request.sms.Status);
                var project = await _context.Projects.FindAsync(request.sms.Project);

                var sms = new SMS
                {
                    IsActive = request.sms.IsActive,
                    SmsName = request.sms.SmsName,
                    Message = request.sms.Message,
                    Status = status,
                    Project = project
                };


                await _context.Smss.AddAsync(sms);

               var Result =  await _context.SaveChangesAsync() > 0;
                if (!Result) return Result<Unit>.Failure("Failed to create sms");
                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}