using System;
using System.ComponentModel.DataAnnotations;

namespace MyManagerAPI.Models
{
    public class Tag
    {
        public int Id { get; set; }

        public string TagName { get; set; }
    }
}
