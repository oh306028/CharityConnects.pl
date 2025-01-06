namespace API.Dtos
{
    public class RegisterUserDto
    {
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string Password { get; set; }    

        public int Age { get; set; }

        public DateTime DateOfBirth { get; set; }
        public string Role { get; set; }

        public int? OrganizationId { get; set; } 
    }
}
