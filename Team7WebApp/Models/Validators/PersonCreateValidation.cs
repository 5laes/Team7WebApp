using FluentValidation;
using Team7WebApp.Models.DTOs;

namespace Team7WebApp.Models.Validators
{
	public class PersonCreateValidation : AbstractValidator<PersonCreateDTO>
	{
		public PersonCreateValidation()
		{
			RuleFor(model => model.age).NotEmpty().GreaterThan(17);
			RuleFor(model => model.name).NotEmpty();
			RuleFor(model => model.email).NotEmpty();
			RuleFor(model => model.password).NotEmpty();
		}
	}
}
