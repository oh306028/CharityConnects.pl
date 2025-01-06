namespace API.Models
{
    public class Admin : User
    {
        public virtual Organization Organization { get; set; }
    }
}
