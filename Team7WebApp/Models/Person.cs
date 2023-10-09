using System.ComponentModel.DataAnnotations;

namespace Team7WebAPI.Models
{
    public class Person
    {
        [Key]
        int id { get; set; }
        string name { get; set; }
        bool isAdmin { get; set; }
        string email { get; set; }
        int age { get; set; }
    }
}
