using static TaskManagerBackend.Enums;
using TaskManagerBackend.Models;


namespace TaskManagerBackend.Services
{
    public interface ITaskServices
    {
        Task<(bool IsSuccess, string Message)> AssignTasksAsync(AssignmentRequest request);
        Task<List<TaskBase>> GetAllTasks();
        Task<List<TaskBase>> GetTasksByUserIdAsync(int id);
        Task<(bool IsSuccess, string Message)> UpdateStatusAsync(int taskId, Enums.TaskStatus status);

    }
}
