using System;
using System.ComponentModel.DataAnnotations;

namespace MyManagerAPI.Models
{
    public class ListTag
    {
        public int Id { get; set; }
        [Required]
        public int ListId { get; set; }
        [Required]
        public int TagId { get; set; }

    }
}
