import { Check } from '@mui/icons-material';
import { Typography } from '@mui/material';
import clsx from 'clsx';
import { memo } from 'react';

import { PasswordStrengthNames, PasswordStrengthRegexes } from '../../../../utils';
import styles from './PasswordValidator.module.css';

export default memo(function PasswordValidator({ password }) {
  let currentStrengthLevel = 0;

  Object.keys(PasswordStrengthRegexes).forEach((strengthLevel) => {
    if (PasswordStrengthRegexes[strengthLevel].test(password)) {
      currentStrengthLevel |= strengthLevel;
    }
  });

  return (
    <div className={styles.wrapper}>
      {Object.keys(PasswordStrengthNames).map((strengthLevel) => (
        <div
          key={strengthLevel}
          className={clsx({
            [styles.validationField]: true,
            [styles.success]: strengthLevel & currentStrengthLevel,
          })}
        >
          <Typography variant='subtitle1'>
            {PasswordStrengthNames[strengthLevel]}
          </Typography>
          <Typography variant='subtitle1'>
            {strengthLevel & currentStrengthLevel ? <Check fontSize={'inherit'} /> : null}
          </Typography>
        </div>
      ))}
    </div>
  );
});
