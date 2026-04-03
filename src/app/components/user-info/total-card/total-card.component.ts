import {Component, computed, inject} from '@angular/core';
import {MaterialModule} from '../../../materials/material.core';
import {TodoService} from '../../../core/services/todo.service';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-total-card',
  imports: [MaterialModule],
  templateUrl: './total-card.component.html',
  styleUrl: './total-card.component.css'
})
export class TotalCardComponent {

  private todoService = inject(TodoService);
  tasks = toSignal(this.todoService.tasks$, { initialValue: [] });

  totalTasks = computed(() => this.tasks().length);
  completedTasks = computed(() => this.tasks().filter(t => t.isCompleted).length);
  uncompletedTasks = computed(() => this.totalTasks() - this.completedTasks());

}
