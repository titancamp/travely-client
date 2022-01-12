import { Typography } from '@mui/material';
import { PasswordValidationNames } from '../../utils/';
import styles from './PasswordValidator.module.css';
import clsx from 'clsx';
import CheckIcon from '@mui/icons-material/Check';

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
            {validationLevel & props.passedLevel ? (
              <CheckIcon fontSize={'inherit'} />
            ) : null}
          </Typography>
        </div>
      ))}
    </div>
  );
}
