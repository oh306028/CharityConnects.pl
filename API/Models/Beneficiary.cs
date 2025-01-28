namespace API.Models
{
    public class Beneficiary : User
    {
        public virtual List<ProjectBeneficiary> Projects { get; set; } = new List<ProjectBeneficiary>();
        public virtual List<Application> Applications { get; set; } = new();
    }
}
