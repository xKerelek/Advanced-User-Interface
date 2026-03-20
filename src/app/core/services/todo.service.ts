import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {BehaviorSubject} from 'rxjs';
import {FilterType, Todo} from '../../shared/models/todo';


@Injectable({
  providedIn: 'root'
})

export class TodoService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiURL;

  private tasksSubject = new BehaviorSubject<Todo[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  private filterSubject = new BehaviorSubject<FilterType>('All');
  filter$ = this.filterSubject.asObservable();

  constructor() {
    this.loadTasks();
  }

  loadTasks() {
    this.http.get<Todo[]>(this.apiUrl).subscribe({
      next: (tasks) => {
        this.tasksSubject.next(tasks);
      },
      error: (error) => {
        console.log('Error loading tasks:', error);
      }
    });
  }

  addTask(content: string) {
    this.http.post<Todo>(this.apiUrl, { content, isCompleted: false }).subscribe({
      next: (newTask) => {
        const currentTasks = this.tasksSubject.value;
        this.tasksSubject.next([...currentTasks, newTask])
      },
      error: (error) => {
        console.log('Error adding task:', error);
      }
    });
  }

  updateTask(updatedTask: Todo) {
    this.http.put<Todo>(`${this.apiUrl}/${updatedTask.id}`, updatedTask).subscribe({
      next: () => {
        const currentTasks = this.tasksSubject.value.map(t => t.id === updatedTask.id ? updatedTask : t);
        this.tasksSubject.next(currentTasks);
      },
      error: (error) => {
        console.log('Error update tasks:', error);
      }
    });
  }

  deleteTask(id: string) {
    return this.http.delete<Todo>(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        const currentTasks = this.tasksSubject.value.filter(t => t.id !== id);
        this.tasksSubject.next(currentTasks);
      },
      error: (error) => {
        console.log('Error delete tasks:', error);
      }
    });
  }

  setFilter(filter: FilterType) {
    this.filterSubject.next(filter);
  }
}
