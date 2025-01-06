using API.Dtos;
using API.Models;
using Microsoft.AspNetCore.Identity;

namespace API.Services
{
    public interface IUserService
    {
        Task LoginUserAsync(LoginUserDto dto);
        Task RegisterUserAsync(RegisterUserDto dto);    
    }

    public class UserService : IUserService
    {
        private readonly CharityDbContext _dbContext;

        public UserService(CharityDbContext dbContext)
        {
            _dbContext = dbContext;
        }



        public async Task RegisterUserAsync(RegisterUserDto dto)
        {
            Role role;
            User newUser;


            switch (dto.Role)
            {
                case "Beneficiary":
                    role = Role.Beneficiary;

                    newUser = new Beneficiary()
                    {
                        Email = dto.Email,
                        FirstName = dto.FirstName,
                        LastName = dto.LastName,
                        Age = dto.Age,           
                        DateOfBirth = dto.DateOfBirth
                    };

                    break;
                case "Donor":
                    role = Role.Donor;

                    newUser = new Donor()   
                    {
                        Email = dto.Email,
                        FirstName = dto.FirstName,
                        LastName = dto.LastName,
                        Age = dto.Age,
                        DateOfBirth = dto.DateOfBirth
                    };

                    break;
                case "Employee":
                    role = Role.Employee;

                    newUser = new Employee()
                    {
                        Email = dto.Email,
                        FirstName = dto.FirstName,
                        LastName = dto.LastName,
                        Age = dto.Age,
                        OrganizationId = dto.OrganizationId,
                        DateOfBirth = dto.DateOfBirth
                    };

                    break;
                default:
                    throw new Exception("Invalid role");
            }

            var passwordHasher = new PasswordHasher<User>();
            var hashedPassword = passwordHasher.HashPassword(newUser, dto.Password);
            newUser.PasswordHash = hashedPassword;

            _dbContext.Users.Add(newUser);
            await _dbContext.SaveChangesAsync();


        }   


        public async Task LoginUserAsync(LoginUserDto dto)
        {

        }




    }
}
