import * as Yup from 'yup';

export const getTodoFormValidation = () => Yup.object().shape({
    name: Yup.string()
        .max(50, 'Please enter max 50 characters.')
        .required(),
    deadline: Yup.date()
        .required(),
    description: Yup.string()
        .max(1000, 'Please enter max 1000 characters.'),
});

