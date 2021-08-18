using API.DTOs;
using AutoMapper;
using Domain;

namespace API.Extensions
{
    public class mappingProfiles : Profile
    {
        public mappingProfiles()
        {
            CreateMap<AppUser, ProfileDto>();
            CreateMap<ProfileDto, AppUser>();
        }
    }
}