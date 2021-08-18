using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using API.Services;
using Application.Interfaces;
using AutoMapper;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _singnInManager;
        private readonly TokenService _tokenService;
        private readonly IMapper _mapper;
        private readonly IUserAccessor _userAccessor;
        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> singnInManager, TokenService tokenService, IMapper mapper, IUserAccessor userAccessor )
        {
            _mapper = mapper;
            _tokenService = tokenService;
            _singnInManager = singnInManager;
            _userManager = userManager;
            _userAccessor = userAccessor;
        }
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {

            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            if (user == null) return Unauthorized();

            var result = await _singnInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (result.Succeeded)
            {
                return await CreateUserObject(user);
            }

            return Unauthorized();


        }
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
            {
                return BadRequest("Email taken");
            }
            if (await _userManager.Users.AnyAsync(x => x.UserName == registerDto.UserName))
            {
                return BadRequest("Username taken");
            }

            var user = new AppUser(){};
            // var user = new AppUser
            // {
            //     DisplayName = registerDto.DisplayName,
            //     Email = registerDto.Email,
            //     UserName = registerDto.Username,
            //     TempRole = "user"
            // };
            _mapper.Map(registerDto, user);
            
            var result = await _userManager.CreateAsync(user, registerDto.Password);
            var userRole = await _userManager.AddToRoleAsync(user, "Member");
            

            if (result.Succeeded && userRole.Succeeded)
            {
                return await CreateUserObject(user);
            }

            return BadRequest("Problem registering user");
        }

        [HttpPut]
        public async Task<ActionResult<UserDto>> UpdateProfile(ProfileDto profileDto)
        {
            var user = await _userManager.FindByEmailAsync(_userAccessor.GetUserEmail());

            _mapper.Map(profileDto, user);

            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded)
            {
                return Ok();
            }

            return BadRequest("Problem updating your profile");
        }
        
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

            return await CreateUserObject(user);
        }


        [Authorize(Roles = "Admin")]
        [HttpGet("users")]
        public async Task<ActionResult<List<ProfileDto>>> GetUsers() 
        {
            var users = await _userManager.Users.ToListAsync();
            var userToReturn = _mapper.Map<List<ProfileDto>>(users);

            return userToReturn;

        }


        private async Task<UserDto>  CreateUserObject(AppUser user)
        {
            return new UserDto
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                Address = user.Address,
                Image = null,
                Token = await _tokenService.CreateToken(user),
                UserName = user.UserName
            };
        }

        
    }
}