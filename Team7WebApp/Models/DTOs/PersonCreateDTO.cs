using System.ComponentModel.DataAnnotations;

namespace Team7WebApp.Models.DTOs
{
	public class PersonCreateDTO
	{
		[Required]
		public string name { get; set; }
		[Required]
		public string password { get; set; }
		[Required]
		public string email { get; set; }
		[Required]
		public int age { get; set; }
	}
}
