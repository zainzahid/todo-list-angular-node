import { Todo } from "./Todo";

export interface TodosResponse { 
    message: string,
    todos: Todo[] 
}

export interface TodoResponse { 
    message: string,
    todo: Todo 
} 
