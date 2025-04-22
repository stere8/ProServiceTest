import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
  /** List of available users */
  @Input() users: User[] = [];

  /** Currently selected user (to highlight) */
  @Input() selectedUser?: User;

  /** Emits when a user is clicked */
  @Output() userSelected = new EventEmitter<User>();

  /** Handler for click events in the template */
  onUserSelected(user: User): void {
    this.userSelected.emit(user);
  }

  /** Utility: display human‑readable user type */
  getUserTypeString(type: number): string {
    switch (type) {
      case 1:
        return 'Programmer';
      case 0:
        return 'DevOps/Administrator';
      default:
        return 'Unknown';
    }
  }
}
