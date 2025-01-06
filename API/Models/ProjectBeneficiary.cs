namespace API.Models
{
    public class ProjectBeneficiary 
    {
        public int BeneficiaryId { get; set; }
        public virtual Beneficiary Beneficiary { get; set; }


        public int CharityProjectId { get; set; }
        public virtual CharityProject CharityProject { get; set; }      
    }
}
