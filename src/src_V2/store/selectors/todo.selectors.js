import { createSelector } from 'reselect';

export const getTodosSelectors = (store) => store.todoReducer;

export const getTodosList = createSelector(getTodosSelectors, (todos) => todos.data);

export const getTodoItemSelector = (id) =>
  createSelector(getTodosList, (todos) => todos.find((todo) => todo.id === id));
