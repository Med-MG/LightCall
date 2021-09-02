using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Products
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public ProductDto Product { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IPhotoAccessor _photoAccessor;

            public Handler(DataContext context, IMapper mapper , IPhotoAccessor photoAccessor)
            {
                _mapper = mapper;
                _context = context;
                _photoAccessor = photoAccessor;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var product = await _context.Products.FindAsync(request.Product.Id);
                //edite photo
                var photo = await _context.Photos.Where(p => p.product == product)
                                      .FirstOrDefaultAsync();
                var photoUploadResult = await _photoAccessor.AddPhoto(request.Product.file);

                photo.Url = photoUploadResult.Url;
                _context.Photos.Update(photo);
                //edite Product
                Project project = new Project();
                var prj = request.Product.ProjectId;
                project = await _context.Projects.FindAsync(prj);
                product.Name = request.Product.Name;
                product.Description = request.Product.Description;
                product.Quantity= request.Product.Quantity;
                product.Project = project;
                // product.Photos = request.Product.Photos;
                _context.Products.Update(product);
                // _mapper.Map(request.Product, product);
                // var Result = await _context.SaveChangesAsync() > 0;
                var Result = await _context.SaveChangesAsync() > 0;
                if(!Result) return Result<Unit>.Failure("Failed to edite product");
                return Result<Unit>.Success(Unit.Value);
                // if (!Result) return Result<Unit>.Failure("Failed to Update Product");
                
            }
        }
    }
}