using FluentValidation;
using Team7WebApp.Models.DTOs;

namespace Team7WebApp.Models.Validators
{
	public class AbsenceUpdateValidation : AbstractValidator<AbsenceUpdateDTO>
	{
		public AbsenceUpdateValidation()
		{
			RuleFor(model => model.id).NotEmpty().GreaterThan(0);
		}
	}
}
