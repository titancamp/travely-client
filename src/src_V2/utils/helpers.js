import { PasswordStrengthLevels } from '../utils';

export const generateDate = (date) => date;

export const noop = () => {};

export const createTableColumn = (key, content, defaultContent, columnStyles) => ({
  key,
  content,
  defaultContent,
  columnStyles,
});

export const createTableRow = (key, columns, data) => ({
  key,
  columns,
  data,
});

export const getPasswordStrengthLevel = (password) => {
  let currentLevel = 0;

  Object.keys(PasswordStrengthLevels).forEach((strengthLevel) => {
    if (PasswordStrengthLevels[strengthLevel].test(password)) {
      currentLevel |= strengthLevel;
    }
  });

  return currentLevel;
};
