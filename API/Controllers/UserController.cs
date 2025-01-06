using API.Dtos;
using API.Services;
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
        public async Task<ActionResult> Login([FromBody] LoginUserDto dto)    
        {
            await _userService.LoginUserAsync(dto);
            return Ok();   
        }

    }
}
