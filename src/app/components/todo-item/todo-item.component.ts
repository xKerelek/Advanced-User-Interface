import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Todo} from '../../shared/models/todo';

@Component({
  selector: 'app-todo-item',
  imports: [
    NgClass,
    FormsModule,
  ],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent {
  @Input() task!: Todo;
  @Output() delete = new EventEmitter<string>();
  @Output() update = new EventEmitter<Todo>();

  isEditing = false;
  editValue = '';

  onToggle() {
    this.update.emit({...this.task, isCompleted: !this.task.isCompleted});
  }

  onDelete() {
    if(this.task.id) {
      this.delete.emit(this.task.id);
    }
  }

  startEdit() {
    this.isEditing = true;
    this.editValue = this.task.content;
  }

  saveEdit() {
    if(this.editValue.trim()) {
      this.update.emit({...this.task, content: this.editValue})
    }
    this.isEditing = false;
  }

  cancelEdit() {
    this.isEditing = false;
  }
}
