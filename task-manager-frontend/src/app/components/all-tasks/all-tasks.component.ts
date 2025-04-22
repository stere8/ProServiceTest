// all-tasks.component.ts
import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';
import { PaginatedResponse } from '../../models/paginated-response';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css'],
})
export class AllTasksComponent implements OnInit {
  tasks: Task[] = [];
  currentPage = 1;
  pageSize = 10;
  totalPages = 0;
  totalCount = 0;
  pageSizeOptions = [5, 10, 25, 50];
  userNames = new Map<number, string>();

  constructor(
    private taskService: TaskService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.loadTasks();
    this.loadUserNames();
  }

  loadTasks() {
    this.taskService.getAllTasks(this.currentPage, this.pageSize).subscribe({
      next: (response: PaginatedResponse<Task>) => {
        this.tasks = response.data;
        this.totalPages = response.totalPages;
        this.totalCount = response.totalCount;
        this.currentPage = response.page;
      },
      error: (error) => {
        console.error('Error loading tasks:', error);
      },
    });
  }

  loadUserNames() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        users.forEach((user) => {
          this.userNames.set(user.id, `${user.firstName} ${user.lastName}`);
        });
      },
      error: (error) => {
        console.error('Error loading user names:', error);
      },
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadTasks();
  }

  onPageSizeChange(event: any) {
    this.pageSize = event.target.value;
    this.currentPage = 1; // Reset to first page
    this.loadTasks();
  }

  getAssignedUserName(userId: number | undefined): string {
    if (!userId) return 'Unassigned';
    return this.userNames.get(userId) || 'Unknown User';
  }

  formatDeadline(deadline: Date | undefined): string {
    if (!deadline) return 'No deadline';
    return new Date(deadline).toLocaleDateString();
  }
}
