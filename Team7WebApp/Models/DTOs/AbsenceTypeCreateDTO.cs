using System.ComponentModel.DataAnnotations;

namespace Team7WebApp.Models.DTOs
{
	public class AbsenceTypeCreateDTO
	{
		[Required]
		public string typeName { get; set; }
		[Required]
		public int days { get; set; }
	}
}
