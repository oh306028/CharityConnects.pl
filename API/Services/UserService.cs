using API.Dtos;
using API.Exceptions;
using API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace API.Services
{
    public interface IUserService
    {
        Task<string> LoginUserAsync(LoginUserDto dto);
        Task RegisterUserAsync(RegisterUserDto dto);
        UserDto GetUserData();
    }

    public class UserService : IUserService
    {
        private readonly CharityDbContext _dbContext;
        private readonly JwtOptions _jwtOptions;
        private readonly IUserContextService _userContextService;
        private readonly IMapper _mapper;

        public UserService(CharityDbContext dbContext, JwtOptions jwtOptions, IUserContextService userContextService, IMapper mapper)
        {
            _dbContext = dbContext;
            _jwtOptions = jwtOptions;
            _userContextService = userContextService;
            _mapper = mapper;
        }

        public UserDto GetUserData()  
        {
            var userId = _userContextService.UserId;
            var currentUser = _dbContext.Users.FirstOrDefault(i => i.Id == userId);

            if (currentUser is null)
                throw new NotFoundException("User not found");

            var result = _mapper.Map<UserDto>(currentUser);
            return result;
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


        public async Task<string> LoginUserAsync(LoginUserDto dto)
        {
            var currentUser = _dbContext.Users.FirstOrDefault(e => e.Email == dto.Email);

            if (currentUser is null)
                throw new NotFoundException("Invalid Email or password");

            var hasher = new PasswordHasher<User>();

            var verifyPasswordResult = hasher.VerifyHashedPassword(currentUser, currentUser.PasswordHash, dto.Password);

            if (verifyPasswordResult == PasswordVerificationResult.Failed)
                throw new NotFoundException("Invalid Email or password");

            var token = GenerateToken(currentUser);
            return token;

        }

        private string GenerateToken(User user)
        {
            var key = Encoding.ASCII.GetBytes(_jwtOptions.Key);
            var securityKey = new SymmetricSecurityKey(key);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Role, Enum.GetName(typeof(Role), user.Role) ?? string.Empty)

            }),
                Expires = DateTime.UtcNow.AddDays(1),
                Issuer = _jwtOptions.Issuer,
                Audience = _jwtOptions.Audience,
                SigningCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature)
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }



    }
}
