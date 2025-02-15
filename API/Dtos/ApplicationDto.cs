namespace API.Dtos
{
    public class ApplicationDto
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public BeneficiaryDto Beneficiary { get; set; }
        public bool IsAccepted { get; set; }
    }
}
