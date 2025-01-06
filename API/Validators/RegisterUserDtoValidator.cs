using API.Dtos;
using FluentValidation;

namespace API.Validators
{
    public class RegisterUserDtoValidator : AbstractValidator<RegisterUserDto>
    {
        public RegisterUserDtoValidator()
        {
            RuleFor(e => e.Email)
                .NotEmpty()
                .EmailAddress()
                .MaximumLength(53);

            RuleFor(e => e.FirstName)
               .NotEmpty()
               .MaximumLength(20);

            RuleFor(e => e.LastName)
               .NotEmpty()
               .MaximumLength(20);

            RuleFor(e => e.Age)
               .NotEmpty();

            RuleFor(e => e.DateOfBirth)
               .NotEmpty();

            RuleFor(e => e.Role)
               .NotEmpty();

            RuleFor(x => x.OrganizationId).Custom((org, context) =>
            {
                if (context.InstanceToValidate.Role == "Employee" && org == null)
                {
                    context.AddFailure("OrganizationId must be provided.");
                }
            });

            RuleFor(p => p.Password)
                .NotEmpty();



        }
    }
}
