namespace API.Models
{
    //application for charity project
    public class Application
    {
        public int Id { get; set; }

        public int EmployeeId { get; set; }
        public virtual Employee Employee { get; set; }


        public virtual List<ApplicationBeneficiary> ApplicationBeneficiary { get; set; } = new List<ApplicationBeneficiary>();

        public virtual List<Document> Documents { get; set; } = new List<Document>();
    }
}
