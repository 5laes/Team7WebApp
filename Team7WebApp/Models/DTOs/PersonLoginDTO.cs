using System.ComponentModel.DataAnnotations;

namespace Team7WebApp.Models.DTOs
{
	public class PersonLoginDTO
	{
		[Required]
		public string email { get; set; }
		[Required]
		public string password { get; set; }
	}
}
