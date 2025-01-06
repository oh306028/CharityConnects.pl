namespace API.Models
{
    public class Donor : User
    {
        public virtual List<ProjectDonor> Projects { get; set; } = new List<ProjectDonor>();                                    
    }
}
