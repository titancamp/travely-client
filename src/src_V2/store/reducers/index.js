import { combineReducers } from 'redux';
import example from './example.reducer';
import todoReducer from './todo.reducer';

export const rootReducer = combineReducers({
    example,
    todoReducer,
});
