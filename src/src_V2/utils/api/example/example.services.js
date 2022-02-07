import ApiClient from '../ApiClient';
import { EXAMPLE_ENDPOINTS } from './example.urls';

function example(data) {
  return ApiClient.post(EXAMPLE_ENDPOINTS.logIn, data);
}

function example2(id) {
  return ApiClient.put(EXAMPLE_ENDPOINTS.example2(id));
}

export const ExampleAPI = {
  example,
  example2,
};
