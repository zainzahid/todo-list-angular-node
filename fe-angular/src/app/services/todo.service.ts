import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Todo } from '../models/Todo';
import { TodosResponse, TodoResponse } from '../models/Response';


@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private baseUrl = '/todo';

  constructor(private http: HttpClient) { }

  getTodos(): Observable<TodosResponse> {
    return this.http.get<TodosResponse>(this.baseUrl);
  }

  getTodoById(id: string): Observable<TodoResponse> {
    return this.http.get<TodoResponse>(`${this.baseUrl}/${id}`);
  }

  createTodo(todo: Todo): Observable<TodoResponse> {
    return this.http.post<TodoResponse>(this.baseUrl, todo);
  }

  updateTodo(id: string, todo: Todo): Observable<TodoResponse> {
    return this.http.put<TodoResponse>(`${this.baseUrl}/${id}`, todo);
  }

  deleteTodo(id?: string): Observable<TodoResponse> {
    return this.http.delete<TodoResponse>(`${this.baseUrl}/${id}`);
  }
}
