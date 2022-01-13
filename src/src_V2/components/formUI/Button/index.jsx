import { Button } from '@mui/material';
import { useFormikContext } from 'formik';

const ButtonWrapper = ({ children, ...otherProps }) => {
  const context = useFormikContext();
  const { submitForm } = context;

  const configButton = {
    variant: 'contained',
    color: 'primary',
    fullWidth: true,
    size: 'large',
    type: 'submit',
    onClick: submitForm,
    disabled: context.isSubmitting,
    ...otherProps,
  };

  return <Button {...configButton}>{children}</Button>;
};

export default ButtonWrapper;
