// task-validation.service.ts
import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskValidationService {
  validateAssignment(tasks: Task[]): { valid: boolean; message?: string } {
    const highDifficultyTasks = tasks.filter((t) => t.difficulty >= 4).length;
    const lowDifficultyTasks = tasks.filter((t) => t.difficulty <= 2).length;

    if (highDifficultyTasks > tasks.length * 0.3) {
      return {
        valid: false,
        message:
          'Too many high difficulty tasks (4-5). Maximum allowed is 30%.',
      };
    }

    if (lowDifficultyTasks > tasks.length * 0.5) {
      return {
        valid: false,
        message: 'Too many low difficulty tasks (1-2). Maximum allowed is 50%.',
      };
    }

    return { valid: true };
  }
}
