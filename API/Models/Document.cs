using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    //document within your project application
    public class Document
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(200)]
        public string Description { get; set; }

        [Required]
        public int ApplicationId { get; set; }
        public virtual Application Application { get; set; }        
    }
}
