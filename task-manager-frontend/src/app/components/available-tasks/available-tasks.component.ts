import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-available-tasks',
  templateUrl: './available-tasks.component.html',
  styleUrls: ['./available-tasks.component.css'],
})
export class AvailableTasksComponent {
  /** The paginated list passed from parent */
  @Input() tasks: Task[] = [];

  /** Optional flags from parent */
  @Input() selectedUserId?: number;
  @Input() hasUnsavedChanges = false;

  /** Emit when user clicks "Assign Selected Tasks" */
  @Output() assignTasks = new EventEmitter<number[]>();

  /** Emit selected IDs on each toggle */
  @Output() taskSelectionChange = new EventEmitter<number[]>();

  /** Emit the new page number */
  @Output() pageChange = new EventEmitter<number>();

  selectedTaskIds: number[] = [];

  currentPage = 1;
  pageSize = 10;

  /** Toggle one ID and re‑emit the whole list */
  toggleTaskId(id: number): number[] {
    if (this.selectedTaskIds.includes(id)) {
      this.selectedTaskIds = this.selectedTaskIds.filter((x) => x !== id);
    } else {
      this.selectedTaskIds = [...this.selectedTaskIds, id];
    }
    this.hasUnsavedChanges = this.selectedTaskIds.length > 0;
    this.taskSelectionChange.emit(this.selectedTaskIds);
    return this.selectedTaskIds;
  }

  /** User clicked the Assign button */
  assignSelected(): void {
    if (this.selectedTaskIds.length) {
      this.assignTasks.emit(this.selectedTaskIds);
      this.selectedTaskIds = [];
      this.hasUnsavedChanges = false;
    }
  }

  /** Previous page clicked */
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageChange.emit(this.currentPage);
    }
  }

  /** Next page clicked */
  nextPage(): void {
    this.currentPage++;
    this.pageChange.emit(this.currentPage);
  }

  /** MatPaginator event */
  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.pageChange.emit(this.currentPage);
  }
}
