import { PasswordStrengthLevels } from '../utils';

export const generateDate = (date) => date;

export const getPasswordStrengthLevel = (password) => {
  let currentLevel = 0;

  Object.keys(PasswordStrengthLevels).forEach((strengthLevel) => {
    if (PasswordStrengthLevels[strengthLevel].test(password)) {
      currentLevel |= strengthLevel;
    }
  });

  return currentLevel;
};
