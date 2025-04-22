using System.ComponentModel.DataAnnotations;

namespace TaskManagerBackend.Models
{
    public class DeploymentTask : TaskBase
    {
        [Required]
        public DateTime Deadline { get; set; }

        [Required, StringLength(400)]   //  length + required
        public string? DeploymentScope { get; set; }
    }
}
