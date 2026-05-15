import {Component, computed, inject, signal, ViewChild, ElementRef, HostListener} from '@angular/core';
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

  @ViewChild('modalContainer') modalContainer!: ElementRef;
  @ViewChild('modalCloseBtn') modalCloseBtn!: ElementRef;

  tasks$ = this.todoService.tasks$;

  tasks = toSignal(this.todoService.tasks$, { initialValue: [] });
  filter = toSignal(this.todoService.filter$, { initialValue: 'All' });

  totalCount = computed(() => this.tasks().length);
  activeCount = computed(() => this.tasks().filter(t => !t.isCompleted).length);

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

  filteredTasksList = toSignal(this.filteredTasks$, { initialValue: [] });
  liveMessage = computed(() => {
    const count = this.filteredTasksList()?.length || 0;
    const currentFilter = this.filter();
    return `Displaying ${count} ${currentFilter.toLowerCase()} tasks.`;
  });

  isModalOpen = signal(false);
  taskToDelete = signal<string | null>(null);
  previousFocus = signal<HTMLElement | null>(null);

  onDelete(id: string) {
    this.previousFocus.set(document.activeElement as HTMLElement);
    this.taskToDelete.set(id);
    this.isModalOpen.set(true);

    setTimeout(() => {
      this.modalCloseBtn?.nativeElement.focus();
    }, 0);
  }

  confirmDelete() {
    const id = this.taskToDelete();
    if (id) {
      this.todoService.deleteTask(id);
    }
    this.closeModal();
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.taskToDelete.set(null);
    const prev = this.previousFocus();
    if (prev) prev.focus();
  }

  onUpdate(task: Todo) {
    this.todoService.updateTask(task);
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (!this.isModalOpen()) return;

    if (event.key === 'Escape') {
      this.closeModal();
      return;
    }

    if (event.key === 'Tab') {
      const focusableElements = this.modalContainer.nativeElement.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          event.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          event.preventDefault();
        }
      }
    }
  }
}
