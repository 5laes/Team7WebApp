using System.ComponentModel.DataAnnotations;

namespace Team7WebApp.Models
{
    public class AbsenceType
    {
        [Key]
        public int id { get; set; }
        public string typeName { get; set; }
        public int days { get; set; }
    }
}
