using System.ComponentModel.DataAnnotations;

namespace Team7WebApp.Models.DTOs
{
	public class AbsenceTypeUpdateDTO
	{
		public int id { get; set; }
		[Required]
		public string typeName { get; set; }
		[Required]
		public int days { get; set; }
	}
}
