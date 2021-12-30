import { TodoTypes } from '../types/todo.types';

export const getTodosAction = (todos) => ({ type: TodoTypes.TODOS_RECEIVED, payload: todos });

export const updateTodo = (todo) => ({ type: TodoTypes.TODO_UPDATED, payload: todo });
