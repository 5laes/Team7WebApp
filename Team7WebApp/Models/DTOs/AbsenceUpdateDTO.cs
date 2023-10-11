using System.ComponentModel.DataAnnotations;

namespace Team7WebApp.Models.DTOs
{
	public class AbsenceUpdateDTO
	{
		public int id { get; set; }
		[Required]
		public bool pending { get; set; }
		[Required]
		public bool approved { get; set; }
	}
}
