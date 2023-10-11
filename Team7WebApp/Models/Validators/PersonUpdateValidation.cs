using FluentValidation;
using Team7WebApp.Models.DTOs;

namespace Team7WebApp.Models.Validators
{
	public class PersonUpdateValidation : AbstractValidator<PersonUpdateDTO>
	{
		public PersonUpdateValidation()
		{
			RuleFor(model => model.id).NotEmpty().GreaterThan(0);
			RuleFor(model => model.age).NotEmpty().GreaterThan(18);
			RuleFor(model => model.name).NotEmpty();
			RuleFor(model => model.email).NotEmpty();
			RuleFor(model => model.password).NotEmpty();
		}
	}
}
