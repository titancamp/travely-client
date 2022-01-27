import ApiClient from '../ApiClient';
import { AUTH_ENDPOINTS } from './auth.urls';

function logIn(data) {
  return ApiClient.post(AUTH_ENDPOINTS.logIn, data);
}

function signUp(formData) {
  /**
   We can add normalization or adaption functionality here, for example change data/formData object for sending backend.
   And also the config changes for example change default  'application/json' to 'multipart/form-data' as it made here.
   */

  formData.append('something', 'something else');

  return ApiClient.post(AUTH_ENDPOINTS.signUp, formData, {
    'Content-Type': 'multipart/form-data',
  });
}

function deactivate(id) {
  return ApiClient.delete(AUTH_ENDPOINTS.deactivate(id));
}

function reactivate(id) {
  return ApiClient.put(AUTH_ENDPOINTS.reactivate(id));
}

export const AuthAPI = {
  logIn,
  signUp,
  deactivate,
  reactivate,
};
