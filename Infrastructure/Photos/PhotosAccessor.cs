using System;
using System.Threading.Tasks;
using Application.Interfaces;
using Application.Photos;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Infrastructure.Photos
{
    public class PhotosAccessor : IPhotoAccessor
    {
        private readonly Cloudinary _cloudinary;
        public PhotosAccessor(IOptions<CloudinarySettings> configs)
        {
            var account = new Account(
                configs.Value.CloudName,
                configs.Value.ApiKey,
                configs.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(account);
        }
        public async Task<PhotosUploadResult> AddPhoto(IFormFile file)
        {
            if(file.Length > 0){
                await using var stream = file.OpenReadStream();
                var uploaadParams = new ImageUploadParams{
                    File = new FileDescription(file.FileName , stream),
                    Transformation = new Transformation().Height(500).Width(500).Crop("fill")                    
                };

                var uploadResult = await _cloudinary.UploadAsync(uploaadParams);

                if(uploadResult.Error != null){
                    throw new Exception(uploadResult.Error.Message);
                }

                return new PhotosUploadResult{
                    PublicId = uploadResult.PublicId,
                    Url = uploadResult.SecureUrl.ToString()
                };
            }

            return null;
        }

        public async Task<string> DeletePhoto(string publicId)
        {
            var deleteParams = new DeletionParams(publicId);
            var result = await _cloudinary.DestroyAsync(deleteParams);

            return result.Result == "ok" ? result.Result : null ;
        }
    }
}