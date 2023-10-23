using System.ComponentModel.DataAnnotations;


namespace Team7WebApp.Models.DTOs
{
	public class AbsenceCreateDTO
	{
		[Required]
		public int typeID { get; set; }
		[Required]
        public int personID { get; set; }
        [Required]
		public DateTime leaveStart { get; set; }
		[Required]
		public DateTime leaveEnd { get; set; }
	}
}
