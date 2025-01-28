using API.Dtos;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/projects")]
    [ApiController]
    public class ApplicationController : ControllerBase
    {
        private readonly IApplicationService _applicationService;

        public ApplicationController(IApplicationService applicationService)
        {
            _applicationService = applicationService;
        }

        [HttpPost("{projectId}/apply")]
        [Authorize(Roles = "Beneficiary")]
        public async Task<ActionResult> ApplyForProjects([FromRoute] int projectId, [FromForm] IFormFile file)
        {
            await _applicationService.Apply(projectId, file);
            return Ok();
        }

        [HttpGet("{projectId}/applications")]
        [Authorize(Roles = "Employee")]
        public async Task<ActionResult<IEnumerable<ApplicationDto>>> GetApplications([FromRoute] int projectId)
        {
            var result = await _applicationService.GetApplications(projectId);
            return Ok(result);
        }

        [HttpDelete("{projectId}/deny")]
        [Authorize(Roles = "Employee")]
        public async Task<ActionResult> DenyProjectApply([FromRoute] int projectId)  
        {
            await _applicationService.Deny(projectId);
            return Ok();
        }

    }
}
