const passwordCriteria = {
  1: 'One lowercase character',
  2: 'One uppercase character',
  4: 'One number',
  8: 'One special character',
  16: '8-20 characters',
};

const passwordStrengthLevels = {
  1: /^.*[a-z]/,
  2: /^.*[A-Z]/,
  4: /^.*[0-9]/,
  8: /^.*[!@#$%^&*]/,
  16: /^.{8,20}$/,
};

Object.freeze(passwordCriteria);
Object.freeze(passwordStrengthLevels);

export { passwordCriteria, passwordStrengthLevels };
