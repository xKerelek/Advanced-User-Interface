import {Component, inject} from '@angular/core';
import {TodoService} from '../../core/services/todo.service';
import {AsyncPipe, NgClass} from '@angular/common';
import {FilterType} from '../../shared/models/todo';

@Component({
  selector: 'app-filter-bar',
  imports: [
    AsyncPipe,
    NgClass
  ],
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.css'
})
export class FilterBarComponent {
  private todoService = inject(TodoService);

  currentFilter$ = this.todoService.filter$;

  filters: FilterType[] = ['All', 'Active', 'Completed'];

  setFilter(filter: FilterType) {
    this.todoService.setFilter(filter);
  }
}
