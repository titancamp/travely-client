import ApiClient from "./api";
import {Api, Task} from "@mui/icons-material";
import {TaskPriority, TaskStatus} from "../src_V2/modules/manager/todo/utils";
import {generateDate} from "../src_V2/utils";

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
}

const mapToStatuses = {
    [TaskStatus.TODO]: 1,
    [TaskStatus.IN_PROGRESS]: 2,
    [TaskStatus.DONE]: 3,
}

const mapToPriorities = {
    high: 1,
    medium: 2,
    low: 3,
}

const mapToStatusesClient = {
    1: TaskStatus.TODO,
    2: TaskStatus.IN_PROGRESS,
    3: TaskStatus.DONE,
}

const mapToPrioritiesClient = {
    1: TaskPriority.HIGH,
    2: TaskPriority.MEDIUM,
    3: TaskPriority.LOW,
}

const todoAdapterClient = (todo) => ({
    ...todo,
    status: mapToStatusesClient[todo.status],
    priority: mapToPrioritiesClient[todo.priority],
    reminder: generateDate(todo.reminder),
})

const TodoClient = {
    getTodos: async () => {
        const data = await ApiClient
            .post('api/v1/ToDo/List', {
                filters: [],
                orderings: [
                    {
                        fieldName: "Deadline",
                        isDescending: true
                    }
                ],
                paging: {
                    from: 0,
                    count: 10,
                }
            });

        return data.data.map(todoAdapterClient);
    },
    addTodo: (values) => {
        const formData = { ...values };
        formData.reminder = transformReminder[values.reminder](values.deadline).toISOString();
        formData.status = mapToStatuses[values.status];
        formData.priority = mapToPriorities[values.priority];
        formData.tourId = 0;
        return ApiClient
            .post('api/v1/ToDo', formData);
    }
}

export default TodoClient;
