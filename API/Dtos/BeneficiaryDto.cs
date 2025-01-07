using API.Models;
using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class BeneficiaryDto
    {
        public int Id { get; set; }

        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }


    }
}
