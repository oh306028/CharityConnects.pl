using API.Models;
using AutoMapper;

namespace API.Services
{
    public interface IOrganizationService
    {
        Task CreateOrganization(string name);
    }

    public class OrganizationService : IOrganizationService
    {
        private readonly CharityDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IUserContextService _userContextService;

        public OrganizationService(CharityDbContext dbContext, IMapper mapper, IUserContextService userContextService)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _userContextService = userContextService;
        }

        public async Task CreateOrganization(string name)
        {
            var organization = new Organization()
            {
                AdminId = (int)_userContextService.UserId,
                Name = name
            };

            _dbContext.Organizations.Add(organization);
            await _dbContext.SaveChangesAsync();
        }
    }
}
