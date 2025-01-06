namespace API.Models
{
    public class ProjectRequirement
    {
        public int Id { get; set; }
        public string Requirement { get; set; }

        public virtual CharityProject CharityProject { get; set; }
        public int CharityProjectId { get; set; }   
    }
}
