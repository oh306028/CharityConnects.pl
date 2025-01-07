using API.Dtos;
using FluentValidation;

namespace API.Validators
{
    public class CreateProjectDtoValidator : AbstractValidator<CreateProjectDto>
    {
        public CreateProjectDtoValidator()
        {
            RuleFor(n => n.Name)
                .MaximumLength(50)
                .NotEmpty();

            RuleFor(d => d.Description)
                .NotEmpty();

            RuleFor(sD => sD.StartDate)
                .NotEmpty();

            RuleFor(eD => eD.EndDate)
                .NotEmpty();
        }
    }
}
