// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskAssignmentComponent } from './components/task-assignment/task-assignment.component';
import { UnsavedChangesGuard } from './unsaved-changes.guard';

const routes: Routes = [
  {
    path: '',
    component: TaskAssignmentComponent,
    canDeactivate: [UnsavedChangesGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
