using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MyManagerAPI.Models
{
    public class Note
    {
        public int Id { get; set; }
        [Required]
        public int  UserId { get; set; }
        public DateTime DateCreated { get; set; }
        public int ListId { get; set; }
        public List List { get; set; }
        [Required]
        public string Text { get; set; }
    }
}
