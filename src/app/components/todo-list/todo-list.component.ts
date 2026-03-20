import {Component, computed, inject} from '@angular/core';
import {AsyncPipe,} from '@angular/common';
import {FilterBarComponent} from '../filter-bar/filter-bar.component';
import {TodoItemComponent} from '../todo-item/todo-item.component';
import {TodoService} from '../../core/services/todo.service';
import {combineLatest, map} from 'rxjs';
import {toSignal} from '@angular/core/rxjs-interop';
import {Todo} from '../../shared/models/todo';

@Component({
  selector: 'app-todo-list',
  imports: [
    FilterBarComponent,
    TodoItemComponent,
    AsyncPipe
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  private todoService = inject(TodoService);
  tasks$ = this.todoService.tasks$;

  tasks = toSignal(this.todoService.tasks$, { initialValue: [] });
  filter = toSignal(this.todoService.filter$, { initialValue: 'All' });

  totalCount = computed(() => this.tasks().length);
  activeCount = computed(() => this.tasks().filter(t => !t.isCompleted).length);

  onDelete(id: string) {
    this.todoService.deleteTask(id);
  }

  onUpdate(task: Todo) {
    this.todoService.updateTask(task);
  }

  filteredTasks$ = combineLatest([
    this.todoService.tasks$,
    this.todoService.filter$
  ]).pipe(
    map(([tasks, filter]) => {
      if (filter === 'Active') return tasks.filter(t => !t.isCompleted);
      if (filter === 'Completed') return tasks.filter(t => t.isCompleted);
      return tasks;
    })
  );

}
