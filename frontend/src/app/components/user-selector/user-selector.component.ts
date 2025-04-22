// /task-manager-frontend/src/app/components/user-selector/user-selector.component.ts

import { Component, Output, EventEmitter, Input } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-selector',
  template: `
    <mat-form-field appearance="fill">
      <mat-label>Select User</mat-label>
      <mat-select (selectionChange)="onUserChange($event.value)">
        <mat-option *ngFor="let user of users" [value]="user">
          {{ user.nameAndSurname }} - {{ getUserTypeString(user.userType) }}
        </mat-option>
      </mat-select>
    </mat-form-field>
  `,
})
export class UserSelectorComponent {
  @Input() users: User[] = [];
  @Output() userChange = new EventEmitter<User>();

  onUserChange(user: User): void {
    this.userChange.emit(user);
  }

  getUserTypeString(userType: number): string {
    return userType === 0 ? 'DevOpsAdministrator' : 'Programmer';
  }
}
