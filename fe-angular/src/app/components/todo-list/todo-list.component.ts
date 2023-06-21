import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/Todo';
import { TodosResponse } from '../..//models/Response';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todoItems: Todo[] = [];
  filteredItems: Todo[] = [];
  searchKeyword = '';
  sortBy = '';
  userEmail: string | null

  constructor(private todoService: TodoService, public authService: AuthService) { }

  ngOnInit(): void {
    this.loadTodos();
    // this.userEmail = this.authService.getUser()?.email
  }

  loadTodos(): void {
    this.todoService.getTodos()
    .subscribe(
      (response: TodosResponse) => {
        console.log("response -> ", response)
        this.todoItems = response.todos;
        this.filteredItems = [...this.todoItems];
      },
      (error: unknown) => {
        console.error('Error loading todos:', error);
      }
    );
  }

  sortTasks(): void {
    switch (this.sortBy) {
      case 'priority':
        this.filteredItems.sort((a, b) => {
          const priorityOrder = ['high', 'medium', 'low'];
          return priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
        });
        break;
      case 'dueDate':
        this.filteredItems.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
        break;
      case 'status':
        this.filteredItems.sort((a, b) => {
          const statusOrder = ['pending', 'in-progress', 'completed'];
          return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
        });
        break;
    }
  }

  searchTasks(): void {
    if (this.searchKeyword.trim() !== '') {
      this.filteredItems = this.todoItems.filter((item) =>
        item.title.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
        item.description.toLowerCase().includes(this.searchKeyword.toLowerCase())
      );
    } else {
      this.filteredItems = [...this.todoItems];
    }
  }

  removeItem(id: string) {
    console.log(`hello id to delete`, id);
    console.log(`todoItems`, this.filteredItems);
    
    const indexForItemToRemove = this.filteredItems.findIndex(item => item?._id === id)
    if(indexForItemToRemove != -1) {
      console.log(`Removing`);
      this.filteredItems.splice(indexForItemToRemove, 1);
    }
  }
}
