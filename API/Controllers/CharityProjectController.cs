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

        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<CharityProjectDto>>> GetAllProjects()
        {   

            var result = await _charityProjectService.GetAllProjectsAsync();
            return Ok(result);
        }

        [Authorize(Roles = "Employee")]
        [HttpGet("organization")]
        public async Task<ActionResult<IEnumerable<CharityProjectDto>>> GetOrganizationProjects()   
        {
            var result = await _charityProjectService.GetOrganizationProjectsAsync();   
            return Ok(result);
        }


        [HttpPost]
        [Authorize(Roles = "Employee")]
        public async Task<ActionResult> CreateProject(CreateProjectDto dto)
        {
            var postId = await _charityProjectService.CreateCharityProjectAsync(dto);
            return Created($"api/posts/{postId}", null);
        }

        [HttpPost("{projectId}")]
        [Authorize(Roles = "Employee")]
        public async Task<ActionResult> SupportCharityProject([FromRoute]int projectId,[FromBody] int beneficiaryId) 
        {
            await _charityProjectService.Support(projectId, beneficiaryId);
            return Ok();
        }



    }
}
