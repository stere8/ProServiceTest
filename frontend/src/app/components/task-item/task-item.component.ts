// /task-manager-frontend/src/app/components/task-item/task-item.component.ts

import { Component, Input } from '@angular/core';
import { Task } from '../../models/task.model';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-task-item',
  template: `
    <mat-card class="task-card">
      <mat-card-header>
        <div [ngClass]="'difficulty-badge difficulty-' + task.difficulty">
          {{ task.difficulty }}
        </div>
        <mat-icon>{{ getTypeIcon() }}</mat-icon>
      </mat-card-header>
      <mat-card-content>
        <p>{{ truncateText(task.shortDescription, 400) }}</p>
        <p>{{ truncateText(task.implementationContent || '', 1000) }}</p>
        <mat-chip-listbox>
          <mat-chip>{{ task.status }}</mat-chip>
        </mat-chip-listbox>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .task-card {
        margin: 8px;
      }
      .difficulty-badge {
        padding: 4px 8px;
        border-radius: 4px;
        margin-right: 8px;
      }
      .difficulty-1 {
        background-color: #e0f2f1;
      }
      .difficulty-2 {
        background-color: #b2dfdb;
      }
      .difficulty-3 {
        background-color: #80cbc4;
      }
      .difficulty-4 {
        background-color: #4db6ac;
      }
      .difficulty-5 {
        background-color: #26a69a;
      }
    `,
  ],
})
export class TaskItemComponent {
  @Input() task!: Task;

  truncateText(text: string, maxLength: number): string {
    return text?.length > maxLength
      ? text.substring(0, maxLength) + '...'
      : text;
  }

  getTypeIcon(): string {
    switch (this.task.taskType) {
      case 'Implementation':
        return 'code';
      case 'Deployment':
        return 'cloud_upload';
      case 'Maintenance':
        return 'build';
      default:
        return 'task';
    }
  }
}
