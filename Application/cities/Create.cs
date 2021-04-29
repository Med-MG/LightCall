using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.cities
{
    public class Create
    {
        public class Command : IRequest
        {
            public CityDto City { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator() {
                RuleFor(x => x.City).SetValidator(new CityValidator());
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                List<Shipping_Company> Shipping_Companies = new List<Shipping_Company>();

                foreach (var company in request.City.shipping_ids)
                {
                    Shipping_Companies.Add(await _context.Shipping_Companies.FindAsync(company));
                }
                
                City city = new City(){
                    CityName = request.City.CityName,
                    ZipCode = request.City.ZipCode,
                    Shipping_Companies = Shipping_Companies
                };

                await _context.Cities.AddAsync(city);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}