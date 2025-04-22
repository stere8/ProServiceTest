// /task-manager-frontend/src/app/unsaved-changes.guard.ts

import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { TaskAssignmentComponent } from './components/task-assignment/task-assignment.component';
import { AvailableTasksComponent } from './components/available-tasks/available-tasks.component';

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable({
  providedIn: 'root',
})
export class UnsavedChangesGuard
  implements CanDeactivate<AvailableTasksComponent>
{
  canDeactivate(component: AvailableTasksComponent): boolean {
    if (component.selectedTaskIds.length > 0) {
      return window.confirm('You have unsaved changes. Do you want to leave?');
    }
    return true;
  }
}
