namespace API.Models
{
    public class ApplicationBeneficiary
    {
        public int ApplicationId { get; set; }
        public virtual Application Application { get; set; }


        public int BeneficiaryId { get; set; }
        public virtual Beneficiary Beneficiary { get; set; }
    }
}
