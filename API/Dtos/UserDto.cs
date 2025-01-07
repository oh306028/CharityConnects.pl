using API.Models;

namespace API.Dtos
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public Role Role { get; set; }
    }
}
