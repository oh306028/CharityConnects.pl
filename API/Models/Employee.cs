namespace API.Models
{
    public class Employee : User
    {
        public int? OrganizationId { get; set; }
        public virtual Organization Organization { get; set; }

        public virtual List<CharityProject> CreatedProjects { get; set; } = new List<CharityProject>();

        public virtual List<Application> Applications { get; set; } = new List<Application>();

    }
}
