using API.Dtos;
using API.Exceptions;
using API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public interface IApplicationService
    {
        Task Apply(int projectId, IFormFile file);
        Task<IEnumerable<ApplicationDto>> GetApplications(int projectId);
        Task Deny(int projectId);
        (byte[] FileData, string ContentType, string FileName) GetFile(int applicationId);
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


            using var memoryStream = new MemoryStream();
            await file.CopyToAsync(memoryStream);
            var fileData = memoryStream.ToArray();

            var application = new Application()
            {
                FileName = file.FileName,
                ContentType = file.ContentType,
                FileData = fileData,
                Beneficiary = beneficiary,
                CharityProject = project,
                IsAccepted = false
            };


            _dbContext.Applications.Add(application);
            await _dbContext.SaveChangesAsync();

        }

        public async Task Deny(int projectId)
        {
            var applicationToDeny = _dbContext.Applications.FirstOrDefault(i => i.CharityProjectId == projectId);
            if (applicationToDeny is null)
                throw new NotFoundException("Application not found");

            _dbContext.Applications.Remove(applicationToDeny);
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

        public (byte[] FileData, string ContentType, string FileName) GetFile(int applicationId)
        {
            var application = _dbContext.Applications.FirstOrDefault(a => a.Id == applicationId);

            if (application == null || application.FileData == null)
                throw new NotFoundException("File not found");

            return (application.FileData, application.ContentType, application.FileName);
        }


    }
}
