using System.ComponentModel.DataAnnotations;

namespace Team7WebAPI.Models
{
    public class AbscenceType
    {
        [Key]
		public int id { get; set; }
		public string typeName { get; set; }
		public int days { get; set; }
    }
}
