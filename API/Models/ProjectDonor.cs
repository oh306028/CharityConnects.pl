namespace API.Models
{
    public class ProjectDonor
    {
        public int DonorId { get; set; }
        public virtual Donor Donor { get; set; }


        public int CharityProjectId { get; set; }
        public virtual CharityProject CharityProject { get; set; }
    }
}
