using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class CharityProject
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [Required]
        public int EmployeeId { get; set; }
        public virtual Employee Employee { get; set; }

        public virtual List<ProjectDonor> Donors { get; set; } = new List<ProjectDonor>();            
        public virtual List<ProjectBeneficiary> Beneficiaries { get; set; } = new List<ProjectBeneficiary>();            
        public virtual List<ProjectRequirement> Requirements { get; set; } = new List<ProjectRequirement>();

    }
}
