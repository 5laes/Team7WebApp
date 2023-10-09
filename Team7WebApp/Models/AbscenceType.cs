using System.ComponentModel.DataAnnotations;

namespace Team7WebAPI.Models
{
    public class AbscenceType
    {
        [Key]
        int id { get; set; }
        string typeName { get; set; }
        int days { get; set; }
    }
}
