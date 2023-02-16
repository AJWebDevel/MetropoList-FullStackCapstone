using System;
using System.ComponentModel.DataAnnotations;

namespace MyManagerAPI.Models
{
    public class ListTag
    {
        public int Id { get; set; }

        public int? ListId { get; set; }
 
        public int? TagId { get; set; }
        public Tag Tag { get; set; }
    }
}
