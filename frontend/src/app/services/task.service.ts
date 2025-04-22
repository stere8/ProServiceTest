// src/app/services/task.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Task } from '../models/task.model';
import { User } from '../models/user.model';
import { PaginatedResponse } from '../models/paginated-response';

export enum UserType {
  Programmer = 1,
  DevOpsAdmin = 2,
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private baseUrl = 'https://localhost:7281/api/tasks';
  private users: User[] = []; // Add this property

  constructor(private http: HttpClient) {}

  /**
   * Assigned tasks come from GET /api/tasks/user/{id}
   * Returns Task[] directly—no pagination wrapper here.
   */
  getAssignedTasks(userId: number): Observable<PaginatedResponse<Task>> {
    return this.http.get<PaginatedResponse<Task>>(
      `${this.baseUrl}/user/${userId}`,
    );
  }

  getAllTasks(
    page: number,
    pageSize: number,
  ): Observable<PaginatedResponse<Task>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PaginatedResponse<Task>>(`${this.baseUrl}/tasks`, {
      params,
    });
  }

  updateTaskStatus(taskId: number, status: 'ToDo' | 'Done'): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${taskId}/status`, { status });
  }

  validateTaskAssignment(userId: number, tasks: Task[]): boolean {
    const user = this.users.find((u) => u.id === userId);
    if (!user) return false;

    // Check user type restrictions
    if (user.userType === UserType.Programmer) {
      if (tasks.some((t) => t.taskType !== 'Implementation')) {
        return false;
      }
    }

    // Check task count (5-11 tasks)
    const totalTasks = tasks.length;
    if (totalTasks < 5 || totalTasks > 11) return false;

    // Check difficulty distribution
    const hardTasks = tasks.filter((t) => t.difficulty >= 4).length;
    const easyTasks = tasks.filter((t) => t.difficulty <= 2).length;

    const hardTasksPercentage = (hardTasks / totalTasks) * 100;
    const easyTasksPercentage = (easyTasks / totalTasks) * 100;

    return (
      hardTasksPercentage >= 10 &&
      hardTasksPercentage <= 30 &&
      easyTasksPercentage <= 50
    );
  }

  sortTasksByDifficulty(tasks: Task[]): Task[] {
    return tasks.sort((a, b) => b.difficulty - a.difficulty);
  }

  getAvailableTasks(
    userId: number,
    page: number = 1,
    pageSize: number = 10,
  ): Observable<PaginatedResponse<Task>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PaginatedResponse<Task>>(
      `${this.baseUrl}/unassigned`,
      { params },
    );
  }
  /**
   * Assign endpoint is POST /api/tasks/assign
   * It returns 200 + message on success, or 400 + message on failure.
   * We capture both cases and normalize to { isSuccess, message }.
   */
  assignTasks(
    userId: number,
    taskIds: number[],
  ): Observable<{ isSuccess: boolean; message: string }> {
    return this.http
      .post<{
        isSuccess: boolean;
        message: string;
      }>(`${this.baseUrl}/assign`, { userId, taskIds })
      .pipe(
        tap(() =>
          console.log('[HTTP] POST /assign → sent', { userId, taskIds }),
        ),

        // success path
        map((res) => {
          console.log('[HTTP] POST /assign → success', res);
          return { isSuccess: true, message: res.message };
        }),

        // error path
        catchError((error) => {
          const msg =
            error.error?.message || error.message || 'Failed to assign tasks';

          console.error('[HTTP] POST /assign → error', msg, error);
          return of({ isSuccess: false, message: msg });
        }),
      );
  }
}
