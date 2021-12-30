export const TaskStatus = {
    TODO: 'todo',
    IN_PROGRESS: 'in_progress',
    DONE: 'done',
    ARCHIVED: 'archived',
};

export const TaskPriority = {
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
};

export const ReminderStatus = {
    SET: 'set',
    NOT_SET: 'not_set',
    PASSED: 'passed',
};

export const TodoListTabs = {
    TODO: 'todo',
    ARCHIVED: 'archived',
};

export const TODO_FILTER_DEFAULT_VALUES = {
    tab: TodoListTabs.TODO,
    name: '',
    statuses: '',
    priorities: '',
};

export const TODO_FORM_INITIAL_VALES = {
    title: '',
    deadline: '',
    description: '',
    tourId: '',
    reminder: '',
    status: TaskStatus.TODO,
    priority: TaskPriority.MEDIUM,
};
