import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../..//models/Todo';
import { TodoService } from '../..//services/todo.service';
import { TodoResponse } from '../..//models/Response';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
  todoItem: Todo = {
    title: '',
    description: '',
    priority: '',
    dueDate: '',
    status: ''
  };
  isUpdateMode = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private todoService: TodoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    console.log(`getUser***`, this.authService.getUser())
    const todoId = this.route.snapshot.params['id'];
    if (todoId) {
      this.isUpdateMode = true;
      this.getTodoById(todoId);
    }
  }

  getTodoById(id: string): void {
    this.todoService.getTodoById(id).subscribe(
      (response: TodoResponse) => {
        this.todoItem = response.todo;
        // formating to yyyy/mm/dd for date picker
        this.todoItem.dueDate = this.todoItem.dueDate.substring(0, 10);
      },
      (error: unknown) => {
        console.error('Error retrieving todo item:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.isUpdateMode) {
      this.updateTodo();
    } else {
      this.createTodo();
    }
  }

  createTodo(): void {
    this.todoService.createTodo(this.todoItem).subscribe(
      () => {
        this.router.navigate(['/list']);
      },
      this.handleError
    );
  }

  updateTodo(): void {
    const todoId = this.route.snapshot.params['id'];
    this.todoService.updateTodo(todoId, this.todoItem).subscribe(
      () => {
        this.router.navigate(['/list']);
      },
      this.handleError
    );
  }

  handleError = (httpErrorResponse: HttpErrorResponse) => {
    console.log(`Error***`, httpErrorResponse)
    if(httpErrorResponse?.error?.message) {
      this.errorMessage = httpErrorResponse?.error?.message
      return
    }
    if(httpErrorResponse?.error?.error?.message) {
      this.errorMessage = httpErrorResponse?.error?.error?.message
      return
    }
    this.errorMessage = 'Error creating todo item. Please input all the valid fields ';
  }
}
