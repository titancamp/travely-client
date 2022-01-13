import clsx from 'clsx';
import { Typography } from '@mui/material';
import { Check } from '@mui/icons-material';

import styles from './PasswordValidator.module.css';
import { PasswordValidationNames } from '../../utils/';

export default function PasswordValidator(props) {
  return (
    <div className={styles.wrapper}>
      {Object.keys(PasswordValidationNames).map((validationLevel) => (
        <div
          key={validationLevel}
          className={clsx({
            [styles.validationField]: true,
            [styles.success]: validationLevel & props.passedLevel,
          })}
        >
          <Typography variant='subtitle1'>
            {PasswordValidationNames[validationLevel]}
          </Typography>
          <Typography variant='subtitle1'>
            {validationLevel & props.passedLevel ? <Check fontSize={'inherit'} /> : null}
          </Typography>
        </div>
      ))}
    </div>
  );
}
