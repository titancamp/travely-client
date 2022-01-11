import { passwordStrengthLevels } from '../modules/login/password-criteria';

export const generateDate = (date) => date;

export const validatePassword = (password) => {
  let level = 0;
  console.log('VALIDATING IN PROGRESS');
  Object.keys(passwordStrengthLevels).forEach((strengthLevel) => {
    if (passwordStrengthLevels[strengthLevel].test(password)) {
      level |= strengthLevel;
    }
  });
  console.log('STRENGTH LEVEL', level);

  return level;
};
