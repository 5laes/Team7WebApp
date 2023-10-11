using FluentValidation;
using Team7WebApp.Models.DTOs;

namespace Team7WebApp.Models.Validators
{
	public class AbsenceTypeUpdateValidator : AbstractValidator<AbsenceTypeUpdateDTO>
	{
		public AbsenceTypeUpdateValidator()
		{
			RuleFor(model => model.id).NotEmpty().GreaterThan(0);
			RuleFor(model => model.typeName).NotEmpty();
			RuleFor(model => model.days).NotEmpty();
		}
	}
}
