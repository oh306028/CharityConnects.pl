using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class Organization
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }    
        public virtual List<Employee> Employees { get; set; } = new List<Employee>();
        public virtual Admin Admin { get; set; }
        public int AdminId { get; set; }    
    }
}
