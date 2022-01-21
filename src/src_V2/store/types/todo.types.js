import createPrefix from "./createPrefixe";

const createTodoPrefix = createPrefix('TODO');

export const TodoTypes = {
    TODOS_RECEIVED: createTodoPrefix('DATA_RECEIVED'),
    TODO_UPDATED: createTodoPrefix('DATA_UPDATED'),
};
