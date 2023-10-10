using System.ComponentModel.DataAnnotations;

namespace Team7WebApp.Models
{
    public class AbscenceType
    {
        [Key]
        public int id { get; set; }
        public string typeName { get; set; }
        public int days { get; set; }
    }
}
