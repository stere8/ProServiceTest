using System.ComponentModel.DataAnnotations;
using static TaskManagerBackend.Enums;

namespace TaskManagerBackend.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string NameAndSurname { get; set; }

        [Required]
        public UserType UserType { get; set; }
    }
}
