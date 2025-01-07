using API.Dtos;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/projects")] 
    [ApiController]
    public class CharityProjectController : ControllerBase
    {
        private readonly ICharityProjectService _charityProjectService;

        public CharityProjectController(ICharityProjectService charityProjectService)
        {
            _charityProjectService = charityProjectService; 
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<CharityProjectDto>>> GetAllProjects()
        {   

            var result = await _charityProjectService.GetAllProjectsAsync();
            return Ok(result);
        }

        [HttpPost]
        [Authorize(Roles = "Employee")]
        public async Task<ActionResult> CreateProject(CreateProjectDto dto)
        {
            var postId = await _charityProjectService.CreateCharityProjectAsync(dto);
            return Created($"api/posts/{postId}", null);
        }




    }
}
