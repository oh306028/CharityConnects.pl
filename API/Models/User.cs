using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public abstract class User
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(35)]
        public string Email { get; set; }

        [Required]
        [MaxLength(20)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(20)]
        public string LastName { get; set; }

        [Required]
        public int Age { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        public Role Role { get; set; }

        [Required]
        public string PasswordHash { get; set; }    
    }
}
