using System;
using System.ComponentModel.DataAnnotations;
using System.Net;

namespace MyManagerAPI.Models
{
    public class Task
    {
        public int Id { get; set; }
        [Required]
        public int ListId { get; set; }
        public List List { get; set; }
        public DateTime DateDue { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public bool IsImportant { get; set; }
        [Required]
        [MaxLength(50)]
        public string Title { get; set; }
        [Required]
        [MaxLength(255)]
        public string Description { get; set; }
    }
}
