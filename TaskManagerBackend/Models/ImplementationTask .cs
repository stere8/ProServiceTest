using System.ComponentModel.DataAnnotations;

namespace TaskManagerBackend.Models
{
    public class ImplementationTask : TaskBase
    {
        [StringLength(1000)]            //  1000 chars
        [Required]
        public string ImplementationContent { get; set; }
    }
}
