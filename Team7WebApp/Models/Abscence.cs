using System;
using System.ComponentModel.DataAnnotations;

namespace Team7WebAPI.Models
{
    public class Abscence
    {
        [Key]
		public int id { get; set; }
		public int typeID { get; set; }
		public int days { get; set; }
		public int daysRequested { get; set; }
		public int personID { get; set; }
		public bool pending { get; set; }
		public bool approved { get; set; }
		public DateTime leaveStart { get; set; }
		public DateTime leaveEnd { get; set; }
    }
}
