using System.ComponentModel.DataAnnotations;

namespace TaskManagerBackend.Models
{
    public class AssignmentRequest
    {
        [Required]
        public int UserId { get; set; }

        [Required]
        [MaxLength(10)]
        public List<int> TaskIds
        {
            get => _taskIds;
            set
            {
                if (value.Count != new HashSet<int>(value).Count)
                {
                    throw new ValidationException("Duplicate task IDs are not allowed.");
                }

                _taskIds = value;
            }
        }
        private List<int> _taskIds;
    }
}
