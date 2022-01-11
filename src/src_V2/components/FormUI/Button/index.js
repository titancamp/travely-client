import { Button } from '@mui/material';
import { useFormikContext } from 'formik';

const ButtonWrapper = ({ children, ...otherProps }) => {
  const context = useFormikContext();
  const { submitForm } = context;

  const handleSubmit = () => {
    submitForm();
  };

  const configButton = {
    variant: 'contained',
    color: 'primary',
    fullWidth: true,
    size: 'large',
    onClick: handleSubmit,
    disabled: context.isSubmitting,
    ...otherProps,
  };

  return <Button {...configButton}>{children}</Button>;
};

export default ButtonWrapper;
