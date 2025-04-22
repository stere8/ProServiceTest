
using System.ComponentModel.DataAnnotations;
using static TaskManagerBackend.Enums;
using TaskStatus = TaskManagerBackend.Enums.TaskStatus;

namespace TaskManagerBackend.Models
{
    public abstract class TaskBase
    {
        public int Id { get; set; }

        [Required]
        [StringLength(400)]
        public string ShortDescription { get; set; }

        [Range(1, 5)]
        public int Difficulty { get; set; }
        public TaskStatus Status { get; set; } = TaskStatus.ToDo;


        public TaskType TaskType { get; set; }
        public int? AssignedUserId { get; set; }
    }
}
