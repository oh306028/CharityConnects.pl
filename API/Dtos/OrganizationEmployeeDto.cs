namespace API.Dtos
{
    public class OrganizationEmployeeDto    
    {
        public IEnumerable<EmployeeDto> Employees { get; set; } = new List<EmployeeDto>();
        public string OrganizationName { get; set; }
    }
}
