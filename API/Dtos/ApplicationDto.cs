namespace API.Dtos
{
    public class ApplicationDto
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public BeneficiaryDto Beneficiary { get; set; }
        public bool IsAccepted { get; set; }
    }
}
