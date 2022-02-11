import { AddAlert, NotificationsActive } from '@mui/icons-material';

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

export const mapToReminderState = (notificationTime) => ({
  [ReminderStatus.NOT_SET]: {
    icon: <AddAlert sx={{ opacity: 0.25 }} />,
    tooltipText: 'No reminder',
  },
  [ReminderStatus.SET]: {
    icon: <NotificationsActive color='warning' />,
    tooltipText: notificationTime,
  },
  [ReminderStatus.PASSED]: {
    icon: <NotificationsActive color='warning' sx={{ opacity: 0.5 }} />,
    tooltipText: 'Sent',
  },
});
