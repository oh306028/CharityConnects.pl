using API.Dtos;
using API.Exceptions;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public interface IEmployeeService
    {
        Task<OrganizationEmployeeDto> GetEmployeesByOrganization();
    }

    public class EmployeeService : IEmployeeService
    {
        private readonly CharityDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IUserContextService _userContextService;

        public EmployeeService(CharityDbContext dbContext, IMapper mapper, IUserContextService userContextService)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _userContextService = userContextService;
        }

        public async Task<OrganizationEmployeeDto> GetEmployeesByOrganization()
        {
            var userId = (int)_userContextService.UserId;
            var organization = _dbContext.Organizations.FirstOrDefault(i => i.AdminId == userId);

            if (organization is null)
                throw new NotFoundException("Organization not found");

            var employees = await _dbContext.Employees
                .Include(o => o.Organization)
                .Where(o => o.OrganizationId == organization.Id)
                .ToListAsync();


            var mappedEmployees = _mapper.Map<IEnumerable<EmployeeDto>>(employees);
            var result = new OrganizationEmployeeDto()
            {
                Employees = mappedEmployees,
                OrganizationName = organization.Name
            };

            return result;

        }
    }
}
