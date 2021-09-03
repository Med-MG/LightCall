using System;
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

namespace Application.Orders
{
    public class InAssign
    {

        public class Command : IRequest<Result<Unit>>
        {
            public Guid id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var userid = _userAccessor.GetUserId();

                var Operator = await _context.OperatoreAccount.FindAsync(userid);


                var order = await _context.Orders.Where(o => o.Id == request.id).Include(o => o.Operators).FirstOrDefaultAsync();

                Operator.AssignOrderId = null;

                order.Operators.Remove(Operator);

                var Result = await _context.SaveChangesAsync() > 0;
                if (!Result) return Result<Unit>.Failure("Failed to remove Operateur ");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
