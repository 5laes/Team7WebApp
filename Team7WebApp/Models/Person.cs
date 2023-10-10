using System.ComponentModel.DataAnnotations;

namespace Team7WebApp.Models
{
    public class Person
    {
        [Key]
        public int id { get; set; }
        public string name { get; set; }
        public string password { get; set; }
        public bool isAdmin { get; set; }
        public string email { get; set; }
        public int age { get; set; }
    }
}
