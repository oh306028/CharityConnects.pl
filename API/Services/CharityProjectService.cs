using API.Dtos;
using API.Exceptions;
using API.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace API.Services
{
    public interface ICharityProjectService
    {
        Task<IEnumerable<CharityProjectDto>> GetAllProjectsAsync();
        Task<int> CreateCharityProjectAsync(CreateProjectDto dto);
        Task Support(int projectId, int beneficiaryId);
        Task<IEnumerable<CharityProjectDto>> GetOrganizationProjectsAsync();
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
               .Include(a => a.Applications).ThenInclude(b => b.Beneficiary)
               .AsNoTracking()
               .ToListAsync();

            var result = _mapper.Map<IEnumerable<CharityProjectDto>>(projects);
            return result;
        }

        public async Task<IEnumerable<CharityProjectDto>> GetOrganizationProjectsAsync()    
        {
            var user = _dbContext
                .Employees
                .Include(o => o.Organization)
                .FirstOrDefault(i => i.Id == _userContextService.UserId);

            if (user is null)
                throw new NotFoundException("Employee not found");


            var projects = await _dbContext.CharityProjects
               .Include(e => e.Employee)
               .Include(d => d.Donors).ThenInclude(d => d.Donor)
               .Include(b => b.Beneficiaries).ThenInclude(d => d.Beneficiary)
               .Include(r => r.Requirements)
               .Include(a => a.Applications).ThenInclude(b => b.Beneficiary)
               .AsNoTracking()
               .Where(i => i.Employee.OrganizationId == user.Organization.Id)
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

        public async Task Support(int projectId, int beneficiaryId)    
        {
            var projectToApply = _dbContext.CharityProjects
                .Include(b => b.Beneficiaries)
                .ThenInclude(b => b.Beneficiary)
                .ThenInclude(a => a.Applications)
                .FirstOrDefault(i => i.Id == projectId);
                

            if (projectToApply is null)
                throw new NotFoundException("Project to apply not found");
          
            var application = _dbContext.Applications.FirstOrDefault(i => i.CharityProjectId == projectId);

            if (application is null)
                throw new NotFoundException("Application not found");   

            var beneficiary = _dbContext.Users.FirstOrDefault(i => i.Id == beneficiaryId);
            if (beneficiary is null)
                throw new NotFoundException("Beneficiary not found");

            projectToApply.Beneficiaries
                .Add(new ProjectBeneficiary() 
                { Beneficiary = (Beneficiary)beneficiary, CharityProject = projectToApply });   

            application.IsAccepted = true;

            await _dbContext.SaveChangesAsync();


        }


    }
}
