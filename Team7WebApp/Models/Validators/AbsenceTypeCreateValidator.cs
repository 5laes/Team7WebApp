using FluentValidation;
using Team7WebApp.Models.DTOs;

namespace Team7WebApp.Models.Validators
{
	public class AbsenceTypeCreateValidator : AbstractValidator<AbsenceTypeCreateDTO>
	{
		public AbsenceTypeCreateValidator()
		{
			RuleFor(model => model.typeName).NotEmpty();
			RuleFor(model => model.days).NotEmpty();
		}
	}
}
