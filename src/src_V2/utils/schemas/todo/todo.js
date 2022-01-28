import * as Yup from 'yup';

import { TaskPriority, TaskStatus } from '../../../modules/manager/todo/utils';
import { BaseSchemas } from '../BaseSchemas';

export const getTodoFormInitialValues = (initialValues = {}) => ({
  title: '',
  deadline: '',
  description: '',
  tourId: '',
  reminder: '',
  status: TaskStatus.TODO,
  priority: TaskPriority.MEDIUM,
  ...initialValues,
});

export const getTodoFormValidation = () =>
  Yup.object().shape({
    name: BaseSchemas.textField(50),
    deadline: Yup.date().required(),
    description: BaseSchemas.textField(1000),
  });

export const getTodoFilterInitialValues = (initialValues = {}) => ({
  name: initialValues.name || '',
  statuses: initialValues.statuses ? initialValues.statuses.split(',') : [],
  priorities: initialValues.priorities ? initialValues.priorities.split(',') : [],
});
