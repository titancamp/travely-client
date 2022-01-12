export const generateDate = (date) => date;

export const noop = () => {};

export const createTableColumn = (
    key,
    content,
    defaultContent,
    columnStyles,
) => ({
    key,
    content,
    defaultContent,
    columnStyles,
});

export const createTableRow = (
    key,
    columns,
    data,
) => ({
    key,
    columns,
    data,
});
