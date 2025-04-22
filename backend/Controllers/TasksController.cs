using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using TaskManagerBackend.Models;
using TaskManagerBackend.Services;
using static TaskManagerBackend.Enums;


namespace TaskManagerBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly ITaskServices _taskServices;
        public record TaskStatusPatchDto { public Enums.TaskStatus Status { get; init; } }

        private const int MaxPageSize = 10;

        public TasksController(ITaskServices taskServices)
        {
            _taskServices = taskServices;
        }


        [HttpGet]
        public async Task<IActionResult> GetAllTasks(
        [FromQuery] int page = 1,
        [FromQuery][Range(1, 10)] int pageSize = 10)
        {
            // Validate input
            pageSize = Math.Min(pageSize, MaxPageSize);

            var allTasks = await _taskServices.GetAllTasks().ConfigureAwait(false);
            var totalCount = allTasks.Count;

            var sortedTasks = allTasks
                .OrderByDescending(t => t.Difficulty)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Ok(new PaginatedResponse<TaskBase>
            {
                Data = sortedTasks,
                TotalCount = totalCount,
                Page = page,
                PageSize = pageSize,
                TotalPages = (int)Math.Ceiling(totalCount / (double)pageSize)
            });
        }

        [HttpPatch("{id:int}/status")]
        public async Task<IActionResult> PatchStatus(int id, [FromBody] TaskStatusPatchDto dto)
        {
            var result = await _taskServices.UpdateStatusAsync(id, dto.Status).ConfigureAwait(false);
            return result.IsSuccess ? Ok(result.Message) : NotFound(result.Message);
        }

        [HttpGet("unassigned")]
        public async Task<IActionResult> GetAllUnassignedTasks(
        [FromQuery] int page = 1,
        [FromQuery][Range(1, 10)] int pageSize = 10)
        {
            // Validate input
            pageSize = Math.Min(pageSize, MaxPageSize);

            var allTasks = await _taskServices.GetAllTasks().ConfigureAwait(false);
            var totalCount = allTasks.Count;

            var sortedTasks = allTasks
                .Where(t => t.AssignedUserId == null)
                .OrderByDescending(t => t.Difficulty)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Ok(new PaginatedResponse<TaskBase>
            {
                Data = sortedTasks,
                TotalCount = totalCount,
                Page = page,
                PageSize = pageSize,
                TotalPages = (int)Math.Ceiling(totalCount / (double)pageSize)
            });
        }

        [HttpPost("assign")]
        public async Task<IActionResult> AssignTasksAsync([FromBody] AssignmentRequest request)
        {
            if (request.TaskIds.Count > 10)
            {
                return BadRequest("Cannot assign more than 10 tasks at once.");
            }

            var result = await _taskServices.AssignTasksAsync(request).ConfigureAwait(false);
            if (result.IsSuccess)
            {
                return Ok(new { message = result.Message });
            }
            return BadRequest(new { message = result.Message });
        }


        [HttpGet("user/{id:int}")]
        public IActionResult GetTasksByUserId(int id, int page = 1, int pageSize = 10)
        {
            pageSize = Math.Min(pageSize, MaxPageSize);
            var tasks = _taskServices.GetTasksByUserIdAsync(id).Result;

            var totalCount = tasks.Count;
            var pageData = tasks.Skip((page - 1) * pageSize).Take(pageSize).ToList();

            return Ok(new PaginatedResponse<TaskBase>
            {
                Data = pageData,
                Page = page,
                PageSize = pageSize,
                TotalPages = (int)Math.Ceiling(totalCount / (double)pageSize),
                TotalCount = totalCount
            });
        }
    }
}
