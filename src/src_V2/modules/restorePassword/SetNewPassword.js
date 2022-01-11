import AuthPageWrapper from '../../components/authWrapper/authPageWrapper';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import Button from '../../components/FormUI/Button';
import { useNavigate } from 'react-router-dom';
import PasswordField from '../../components/FormUI/PasswordField';
// import { useState } from 'react';
import { validatePassword } from '../../utils';
import PasswordValidator from '../../components/passwordValidator';
import { useState } from 'react';

const initialValues = {
  password: '',
  repeatPassword: '',
};

const validationSchema = Yup.object({
  // password: Yup.string().required('Required'),
  repeatPassword: Yup.string().required('Required'),
});

export default function SetNewPassword() {
  const [passwordStrengthLevel, setPasswordStrengthLevel] = useState(0);
  const navigate = useNavigate();

  const submitHandler = async (_, submitProps) => {
    await new Promise((res) => {
      setTimeout(res, 1000);
    });
    if (Math.random() > 0.5) {
      submitProps.setErrors({ password: 'Wrong password type' });
    } else {
      navigate('/manager/dashboard');
    }
  };

  const passwordValidateHandler = (password) => {
    const strengthLevel = validatePassword(password);
    setPasswordStrengthLevel(strengthLevel);
    if (strengthLevel < 31) return 'Wrong strength';
  };

  return (
    <AuthPageWrapper title={'Set new password'}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        <Form>
          <PasswordField name={'password'} label={'Password'} validate={passwordValidateHandler} />
          <PasswordField name={'repeatPassword'} label={'Repeat Password'} />
          <PasswordValidator passedLevel={passwordStrengthLevel} />
          <Button>CONFIRM</Button>
        </Form>
      </Formik>
    </AuthPageWrapper>
  );
}
