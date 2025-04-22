import { Component, HostListener, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { Task } from '../../models/task.model';
import { UserService } from '../../services/user.service';
import { TaskService } from '../../services/task.service';
import { PaginatedResponse } from '../../models/paginated-response';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-task-assignment',
  templateUrl: './task-assignment.component.html',
  styleUrls: ['./task-assignment.component.css'],
})
export class TaskAssignmentComponent implements OnInit {
  users: User[] = [];
  selectedUser?: User;

  assignedTasks: Task[] = [];
  availableTasks: Task[] = [];

  currentPage = 1;
  pageSize = 10;
  totalPages = 0;

  selectedTaskIds: number[] = [];
  hasUnsavedChanges = false;

  /* ---------- unsaved‑changes guard ---------- */
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: BeforeUnloadEvent): void {
    if (this.hasUnsavedChanges) {
      $event.preventDefault();
      $event.returnValue = true;
    }
  }

  constructor(
    private userService: UserService,
    private taskService: TaskService,
    private notification: NotificationService,
  ) {}

  /* ------------------------------- INIT ------------------------------ */
  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (users) => (this.users = users),
      error: () => this.notification.showError('Cannot load users'),
    });
  }

  /* ------------------------- helpers ------------------------- */
  private sortByDifficulty(tasks: Task[]): Task[] {
    return tasks.slice().sort((a, b) => b.difficulty - a.difficulty);
  }

  /* ---------------------------- loads --------------------------- */
  private loadAvailableTasks(): void {
    if (!this.selectedUser) return;

    this.taskService
      .getAvailableTasks(this.selectedUser.id, this.currentPage, this.pageSize)
      .subscribe({
        next: (res: PaginatedResponse<Task>) => {
          this.availableTasks = this.sortByDifficulty(res.data);
          this.totalPages = res.totalPages;
          this.currentPage = res.page;
        },
        error: () => this.notification.showError('Failed to load tasks'),
      });
  }

  private loadAssignedTasks(): void {
    if (!this.selectedUser) return;

    this.taskService.getAssignedTasks(this.selectedUser.id).subscribe({
      next: (res) => {
        this.assignedTasks = this.sortByDifficulty(res.data);
      },
      error: () => this.notification.showError('Failed to load tasks'),
    });
  }

  /* -------------------------- UI events ------------------------- */
  onUserSelected(user: User): void {
    this.selectedUser = user;
    this.currentPage = 1;
    this.hasUnsavedChanges = false;
    this.selectedTaskIds = [];
    this.loadAvailableTasks();
    this.loadAssignedTasks();
  }

  /** From child component */
  onTaskSelectionChange(taskIds: number[]): void {
    this.selectedTaskIds = taskIds;
    this.hasUnsavedChanges = taskIds.length > 0;
  }

  /** Invoked by child via (assignTasks)="onAssignTasks($event)" */
  onAssignTasks(taskIds: number[]): void {
    console.log('[parent] assign tasks', taskIds);

    if (!this.selectedUser || taskIds.length === 0) {
      this.notification.showError('No tasks selected');
      return;
    }

    this.taskService.assignTasks(this.selectedUser.id, taskIds).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.notification.showSuccess(res.message);
          this.hasUnsavedChanges = false;
          this.loadAvailableTasks();
          this.loadAssignedTasks();
        } else {
          this.notification.showError(res.message || 'Save failed');
        }
      },
      error: () => this.notification.showError('Server unreachable'),
    });
  }

  /* --------------------------- pagination ---------------------------- */
  onPageChange(newPage: number): void {
    if (newPage === this.currentPage) {
      return;
    }
    this.currentPage = newPage;
    this.loadAvailableTasks();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage += 1;
      this.loadAvailableTasks();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      this.loadAvailableTasks();
    }
  }
}
