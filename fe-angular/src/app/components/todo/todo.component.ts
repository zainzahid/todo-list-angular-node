import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  @Input() todoItem: Todo;
  @Output() itemRemoved = new EventEmitter();

  constructor(private todoService: TodoService) { }

  deleteTodo(): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.todoService.deleteTodo(this.todoItem._id)
      .subscribe(
        () => {
          // Handle success
          this.itemRemoved.emit(this.todoItem._id)
        },
        (error) => {
          console.error('Error deleting todo item:', error);
        }
      );
    }
  }
}
