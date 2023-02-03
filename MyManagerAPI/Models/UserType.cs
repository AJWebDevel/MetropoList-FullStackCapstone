using System;
using System.ComponentModel.DataAnnotations;

namespace MyManagerAPI.Models
{
    public class UserType
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public static int ADMIN_ID => 1;
        public static int LISTUSER_ID => 2;
    }
}
