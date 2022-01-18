import { BaseSchemas } from '../BaseSchemas';
import * as Yup from 'yup';

import { TaskPriority, TaskStatus } from '../../../modules/manager/todo/utils';

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
