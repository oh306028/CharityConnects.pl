namespace API.Models
{
    public class Beneficiary : User
    {
        public virtual List<ProjectBeneficiary> Projects { get; set; } = new List<ProjectBeneficiary>();
        public virtual List<ApplicationBeneficiary> ApplicationBeneficiary { get; set; } = new List<ApplicationBeneficiary>();
    }
}
