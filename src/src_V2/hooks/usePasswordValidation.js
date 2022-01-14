import { useCallback, useState } from 'react';
import {
  ERROR_MESSAGES,
  PasswordStrengthLevels,
  getPasswordStrengthLevel,
} from '../utils';

export function usePasswordValidation() {
  const [passwordStrengthLevel, setPasswordStrengthLevel] = useState(0);

  const validatePassword = useCallback((password) => {
    const strengthLevel = getPasswordStrengthLevel(password);
    setPasswordStrengthLevel(strengthLevel);
    if (!password) return ERROR_MESSAGES.required;
    const { length } = Object.keys(PasswordStrengthLevels);
    if (strengthLevel < 2 ** length - 1) return ERROR_MESSAGES.password;
  }, []);

  const validateRepeatPassword = useCallback((repeatPassword, { password }) => {
    if (!repeatPassword) return ERROR_MESSAGES.required;
    if (repeatPassword !== password) return ERROR_MESSAGES.repeatPassword;
  }, []);

  return { passwordStrengthLevel, validatePassword, validateRepeatPassword };
}
