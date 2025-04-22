// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Add Material Imports
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// Component imports
import { AppComponent } from './app.component';
import { TaskAssignmentComponent } from './components/task-assignment/task-assignment.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { AssignedTasksComponent } from './components/assigned-tasks/assigned-tasks.component';
import { AvailableTasksComponent } from './components/available-tasks/available-tasks.component';
import { UserSelectorComponent } from './components/user-selector/user-selector.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    TaskAssignmentComponent,
    UserListComponent,
    AssignedTasksComponent,
    AvailableTasksComponent,
    UserSelectorComponent,
    TaskItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    // Add Material Modules
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatSnackBarModule, // Add this line
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
