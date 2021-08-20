using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;


namespace Application.Orders
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Order Order { get; set; }
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

                var order = await _context.Orders.FindAsync(request.Order.Id);
                order.Customer = request.Order.Customer;
                order.Status = request.Order.Status;
                order.Price = request.Order.Price;

               
                var Result = await _context.SaveChangesAsync() > 0;

                if (!Result) return Result<Unit>.Failure("Failed to Update Order");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}