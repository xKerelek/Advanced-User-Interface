import {Component, inject} from '@angular/core';
import {TodoService} from '../../core/services/todo.service';
import {FormsModule} from '@angular/forms';
import {TodoListComponent} from '../todo-list/todo-list.component';

@Component({
  selector: 'app-add-todo-form',
  imports: [
    FormsModule,
    TodoListComponent
  ],
  templateUrl: './add-todo-form.component.html',
  styleUrl: './add-todo-form.component.css'
})
export class AddTodoFormComponent {
  private todoService = inject(TodoService);

  newTaskContent = '';

  onAdd() {
    if(this.newTaskContent.trim()) {
      this.todoService.addTask(this.newTaskContent);
      this.newTaskContent = '';
    }
  }
}
