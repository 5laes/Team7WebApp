using System;
using System.ComponentModel.DataAnnotations;

namespace Team7WebAPI.Models
{
    public class Abscence
    {
        [Key]
        int id { get; set; }
        int typeID { get; set; }
        int days { get; set; }
        int daysRequested { get; set; }
        int personID { get; set; }
        bool pending { get; set; }
        bool approved { get; set; }
        DateTime leaveStart { get; set; }
        DateTime leaveEnd { get; set; }
    }
}
