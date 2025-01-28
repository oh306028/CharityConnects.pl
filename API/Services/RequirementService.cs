using AutoMapper;

namespace API.Services
{
    public interface IRequirementService
    {
        Task AddRequirementToProject(int projectId, string requirement);
    }

    public class RequirementService : IRequirementService
    {
        private readonly CharityDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IUserContextService _userContextService;

        public RequirementService(CharityDbContext dbContext, IMapper mapper, IUserContextService userContextService)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _userContextService = userContextService;
        }

        public async Task AddRequirementToProject(int projectId, string requirement)    
        {
            var newRequirement = new Models.ProjectRequirement()
            {
                Requirement = requirement,
                CharityProjectId = projectId
            };
            
            _dbContext.ProjectRequirements.Add(newRequirement);
            await _dbContext.SaveChangesAsync();
        }
    }
}
