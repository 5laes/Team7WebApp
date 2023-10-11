using FluentValidation;
using Team7WebApp.Models.DTOs;

namespace Team7WebApp.Models.Validators
{
	public class AbsenceCreateValidation : AbstractValidator<AbsenceCreateDTO>
	{
		public AbsenceCreateValidation()
		{
			RuleFor(model => model.typeID).NotEmpty().GreaterThan(0);
			RuleFor(model => model.leaveStart).NotEmpty();
			RuleFor(model => model.leaveEnd).NotEmpty();
		}
	}
}
