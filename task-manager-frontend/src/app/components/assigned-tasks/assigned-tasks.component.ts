import { Component, Input } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-assigned-tasks',
  templateUrl: './assigned-tasks.component.html',
  styleUrls: ['./assigned-tasks.component.css'],
})
export class AssignedTasksComponent {
  @Input() tasks: Task[] = [];

  // Add constructor to inject TaskService
  constructor(private taskService: TaskService) {}

  updateTaskStatus(task: Task, status: 'ToDo' | 'Done'): void {
    task.status = status;
    this.taskService.updateTaskStatus(task.id, status).subscribe({
      next: () => {
        console.log(`Task ${task.id} status updated to ${status}`);
      },
      error: (error) => {
        console.error('Error updating task status:', error);
        // Revert the status change if the API call fails
        task.status = status === 'ToDo' ? 'Done' : 'ToDo';
      },
    });
  }
}
