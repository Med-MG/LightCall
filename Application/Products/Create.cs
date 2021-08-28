using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Products
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>{
            public ProductDto Product { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IPhotoAccessor _photoAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor , IPhotoAccessor photoAccessor )
            {
                _context = context;
                _userAccessor = userAccessor;
                _photoAccessor = photoAccessor;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
                //find prj
                Project project = new Project();
                var prj = request.Product.ProjectId;
                project = await _context.Projects.FindAsync(prj);
                //add image
                var photoUploadResult = await _photoAccessor.AddPhoto(request.Product.file);

                var photo = new Photo{
                    Url = photoUploadResult.Url,
                    Id = photoUploadResult.PublicId
                };
                await _context.Photos.AddAsync(photo);
                // await _context.SaveChangesAsync();
                List<Photo> photos = new List<Photo>();

                photos.Add(await _context.Photos.FindAsync(photo.Id));
            
                // add prd
                Product prd = new Product(){
                    Name = request.Product.Name,
                    Description = request.Product.Description,
                    Quantity = request.Product.Quantity,
                    Project = project,
                    upsell = null,
                    Photos = photos,
                    User = user
                };

                await _context.Products.AddAsync(prd);
                var Result = await _context.SaveChangesAsync()> 0;
                if (!Result) return Result<Unit>.Failure("Failed to create Product");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
