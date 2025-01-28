namespace API.Dtos
{
    public class CharityProjectDto
    {
        public int Id { get; set; } 

        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }


        public List<ProjectRequirementDto> Requirements { get; set; } = new List<ProjectRequirementDto>();
        public List<BeneficiaryDto> Beneficiaries { get; set; } = new List<BeneficiaryDto>();
        public List<DonorDto> Donors { get; set; } = new List<DonorDto>();


        //new
        public List<ApplicationDto> Applications { get; set; } = new List<ApplicationDto>();


    }
}
