using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    //application for charity project
    public class Application
    {
        public int Id { get; set; }
        public bool IsAccepted { get; set; }

        public int CharityProjectId { get; set; }   
        public CharityProject CharityProject { get; set; }  

        public int? EmployeeId { get; set; }
        public virtual Employee? Employee { get; set; }

        public virtual Beneficiary Beneficiary { get; set; }
        public int BeneficiaryId { get; set; }  

        [Required]
        public string Description { get; set; }
    }
}
