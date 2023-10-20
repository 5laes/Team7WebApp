using FluentValidation;
using Team7WebApp.Models.DTOs;

namespace Team7WebApp.Models.Validators
{
	public class PersonLoginValidation : AbstractValidator<PersonLoginDTO>
	{
		public PersonLoginValidation()
		{
			RuleFor(model => model.email).NotEmpty();
			RuleFor(model => model.password).NotEmpty();
		}
	}
}
