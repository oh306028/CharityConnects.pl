using API.Dtos;
using API.Exceptions;
using API.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public interface IApplicationService
    {
        Task Apply(int projectId, IFormFile file);
        Task<IEnumerable<ApplicationDto>> GetApplications(int projectId);
    }

    public class ApplicationService : IApplicationService
    {
        private readonly CharityDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IUserContextService _userContextService;

        public ApplicationService(CharityDbContext dbContext, IMapper mapper, IUserContextService userContextService)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _userContextService = userContextService;
        }

        public async Task Apply(int projectId, IFormFile file)
        {
            if (file is null || file.Length == 0)
                throw new BadHttpRequestException("File not found");

            var beneficiaryId = _userContextService.UserId;
            var beneficiary = _dbContext.Beneficiaries.FirstOrDefault(i => i.Id == beneficiaryId);
            var project = _dbContext.CharityProjects
                .Include(b => b.Beneficiaries)
                .ThenInclude(b => b.Beneficiary)
                .ThenInclude(a => a.Applications)   
                .FirstOrDefault(i => i.Id == projectId);

            if (project is null)
                throw new NotFoundException("Project not found");


            string fileContent;
            using (var reader = new StreamReader(file.OpenReadStream()))
            {
                fileContent = await reader.ReadToEndAsync();
            }

            var application = new Application()
            {
                Description = fileContent,
                Beneficiary = beneficiary,
                CharityProject = project,
                IsAccepted = false
                
            };


            _dbContext.Applications.Add(application);
            await _dbContext.SaveChangesAsync();

        }

        public async Task<IEnumerable<ApplicationDto>> GetApplications(int projectId)
        {
            var applications = await _dbContext.Applications
                .Include(b => b.Beneficiary)
                .AsNoTracking()
                .Where(i => i.CharityProjectId == projectId && (i.IsAccepted == false || i.IsAccepted == null)).ToListAsync();

            var result = _mapper.Map<IEnumerable<ApplicationDto>>(applications);
            return result;


        }


    }
}
