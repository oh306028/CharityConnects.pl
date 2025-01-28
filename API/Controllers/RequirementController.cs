using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/projects")]
    [ApiController]
    public class RequirementController : ControllerBase
    {
        private readonly IRequirementService _requirementService;

        public RequirementController(IRequirementService requirementService)
        {
            _requirementService = requirementService;
        }

        [HttpPost("{projectId}/requirement")]
        [Authorize(Roles = "Employee")]
        public async Task<ActionResult> AddRequirement([FromRoute] int projectId, [FromBody] string requirement)
        {
            await _requirementService.AddRequirementToProject(projectId, requirement);
            return Ok();
        }
    }
}
