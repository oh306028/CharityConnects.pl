using API.Dtos;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/accounts")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }



        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody] RegisterUserDto dto)
        {
            await _userService.RegisterUserAsync(dto);
            return Created("api/accounts", null);
        }



        [HttpPost("login")]
        public async Task<ActionResult<string>> Login([FromBody] LoginUserDto dto)    
        {
            var jwtToken = await _userService.LoginUserAsync(dto);
            return Ok(jwtToken);   
        }


        [HttpGet("data")]
        [Authorize]
        public  ActionResult<UserDto> GetUserData()
        {
            var result = _userService.GetUserData();
            return Ok(result);

        }

    }
}
