import { memo } from 'react';
import clsx from 'clsx';
import { Typography } from '@mui/material';
import { Check } from '@mui/icons-material';

import styles from './PasswordValidator.module.css';
import { PasswordStrengthLevels, PasswordValidationNames } from '../../../../utils';

export default memo(function PasswordValidator({ password }) {
  let currentStrengthLevel = 0;

  Object.keys(PasswordStrengthLevels).forEach((strengthLevel) => {
    if (PasswordStrengthLevels[strengthLevel].test(password)) {
      currentStrengthLevel |= strengthLevel;
    }
  });

  return (
    <div className={styles.wrapper}>
      {Object.keys(PasswordValidationNames).map((strengthLevel) => (
        <div
          key={strengthLevel}
          className={clsx({
            [styles.validationField]: true,
            [styles.success]: strengthLevel & currentStrengthLevel,
          })}
        >
          <Typography variant='subtitle1'>
            {PasswordValidationNames[strengthLevel]}
          </Typography>
          <Typography variant='subtitle1'>
            {strengthLevel & currentStrengthLevel ? <Check fontSize={'inherit'} /> : null}
          </Typography>
        </div>
      ))}
    </div>
  );
});
