using System.ComponentModel.DataAnnotations;

namespace TaskManagerBackend.Models
{
    public class MaintenanceTask : TaskBase
    {
        [StringLength(400)]
        public string ListOfServices { get; set; }
        [Required]
        public DateTime Deadline { get; set; }
        [StringLength(400)]
        public string ListOfServers { get; set; }
    }
}
