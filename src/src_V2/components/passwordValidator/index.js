import { Typography } from '@mui/material';
import { passwordCriteria } from '../../modules/login/password-criteria';

export default function PasswordValidator(props) {
  return Object.keys(passwordCriteria).map((criteriaLevel) => (
    <Typography key={criteriaLevel} color={criteriaLevel & props.passedLevel ? 'green' : 'gray'}>
      {passwordCriteria[criteriaLevel]}
    </Typography>
  ));
}
