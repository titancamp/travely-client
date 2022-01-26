import { TodoTypes } from '../types/todo.types';

const INITIAL_STATE = {
    data: [],
    errors: [],
};

const todoReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case TodoTypes.TODOS_RECEIVED: {
            return {
                ...state,
                data: payload,
            };
        }
        case TodoTypes.TODO_UPDATED: {
            const updatedTodos = state.data.map(todo => {
                if (todo.id === payload.id) {
                    return payload;
                }
                return todo;
            });
            return {
                ...state,
                data: updatedTodos,
            };
        }
        default:
            return state;
    }
};

export default todoReducer;
