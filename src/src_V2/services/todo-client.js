import ApiClient from './network';
import {
    ReminderStatus,
    TaskPriority,
    TaskStatus
} from '../modules/manager/todo/utils';
import { generateDate } from '../utils';

const transformReminder = {
    '5m': date => {
        const transformed = new Date(date);
        transformed.setMinutes(transformed.getMinutes() - 5);
        return transformed;
    },
    '1h': date => {
        const transformed = new Date(date);
        date.setHours(transformed.getHours() - 1);
        return transformed;
    },
    '2h': date => {
        const transformed = new Date(date);
        date.setHours(transformed.getHours() - 2);
        return transformed;
    },
    '1d': date => {
        const transformed = new Date(date);
        date.setDay(transformed.getDay() - 1);
        return transformed;
    },
};

const mapToStatuses = {
    [TaskStatus.TODO]: 1,
    [TaskStatus.IN_PROGRESS]: 2,
    [TaskStatus.DONE]: 3,
    [TaskStatus.ARCHIVED]: 4,
};

const mapToPriorities = {
    [TaskPriority.HIGH]: 1,
    [TaskPriority.MEDIUM]: 2,
    [TaskPriority.LOW]: 3,
};

const mapToStatusesClient = {
    1: TaskStatus.TODO,
    2: TaskStatus.IN_PROGRESS,
    3: TaskStatus.DONE,
    4: TaskStatus.ARCHIVED,
};

const mapToPrioritiesClient = {
    1: TaskPriority.HIGH,
    2: TaskPriority.MEDIUM,
    3: TaskPriority.LOW,
};

const todoAdapterClient = (todo) => {
    const reminder = generateDate(todo.reminder);
    let reminderStatus = ReminderStatus.NOT_SET;
    if (reminder) {
        if (new Date(reminder) < new Date()) {
            reminderStatus = ReminderStatus.PASSED;
        } else {
            reminderStatus = ReminderStatus.SET;
        }
    }
    return ({
        ...todo,
        status: mapToStatusesClient[todo.status],
        priority: mapToPrioritiesClient[todo.priority],
        reminder,
        reminderStatus,
    });
};

const todoUpdateAdapterAPI = (todo) => {
    const formData = { ...todo };
    formData.status = mapToStatuses[todo.status];
    formData.priority = mapToPriorities[todo.priority];
    formData.tourId = todo.tourId || 0;
    return formData;
};

const todoAdapterAPI = (todo) => {
    const formData = { ...todo };
    if (todo.reminder) {
        formData.reminder = transformReminder[todo.reminder](todo.deadline).toISOString();
    }
    return todoUpdateAdapterAPI(formData);
};

const TodoClient = {
    getTodos: async (filters) => {
        const adaptedFilters = [];
        if (filters.name) {
            adaptedFilters.push({
                fieldName: 'Name',
                value: filters.name,
                type: 1,
            });
        }

        if (filters.statuses) {
            filters.statuses.split(',').forEach(status => adaptedFilters.push({
                fieldName: 'Status',
                value: String(mapToStatuses[status]),
                type: 1,
            }));
        }

        const data = await ApiClient
            .post('api/v1/ToDo/List', {
                filters: adaptedFilters,
                orderings: [
                    {
                        fieldName: 'Deadline',
                        isDescending: true
                    }
                ],
                paging: {
                    from: 0,
                    count: 200,
                }
            });

        return data?.data ? data.data.map(todoAdapterClient) : [];
    },
    addTodo: (values) => {
        return ApiClient
            .post('api/v1/ToDo', todoAdapterAPI(values));
    },
    updateTodo: (todo) => {
        return ApiClient
            .put('api/v1/ToDo', todoUpdateAdapterAPI(todo));
    },
    getTodoById: async (id) => {
        const { data } = await ApiClient
            .get(`api/v1/ToDo/${id}`);
        return todoAdapterClient(data);
    },
    deleteTodo: (id) => ApiClient.delete(`api/v1/ToDo/${id}`),

    duplicateTodo: (todo) =>
        ApiClient.post('api/v1/ToDo', todoUpdateAdapterAPI(todo)),
};

export default TodoClient;
