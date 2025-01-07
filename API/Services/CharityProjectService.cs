using API.Dtos;
using API.Exceptions;
using API.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public interface ICharityProjectService
    {
        Task<IEnumerable<CharityProjectDto>> GetAllProjectsAsync();
        Task<int> CreateCharityProjectAsync(CreateProjectDto dto);
    }

    public class CharityProjectService : ICharityProjectService
    {

        private readonly CharityDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IUserContextService _userContextService;

        public CharityProjectService(CharityDbContext dbContext, IMapper mapper, IUserContextService userContextService)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _userContextService = userContextService;
        }


        public async Task<IEnumerable<CharityProjectDto>> GetAllProjectsAsync() 
        {
            var projects = await _dbContext.CharityProjects
               .Include(d => d.Donors).ThenInclude(d => d.Donor)
               .Include(b => b.Beneficiaries).ThenInclude(d => d.Beneficiary)
               .Include(r => r.Requirements)
               .AsNoTracking()
               .ToListAsync();

            var result = _mapper.Map<IEnumerable<CharityProjectDto>>(projects);
            return result;
        }

        public async Task<int> CreateCharityProjectAsync(CreateProjectDto dto)
        {
            var newProject = _mapper.Map<CharityProject>(dto);

            var userId = _userContextService.UserId;
            if (userId is null)
                throw new NotFoundException("User not found");

            newProject.EmployeeId = (int)userId;


            await _dbContext.CharityProjects.AddAsync(newProject);
            await _dbContext.SaveChangesAsync();

            return newProject.Id;
        }
    }
}
