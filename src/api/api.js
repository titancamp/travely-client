import axios from "axios";

const ApiClient = axios.create({
  baseURL: "https://api.example.com",
  headers: {
    // Authorization: "Bearer " + jwtToken,
    // "Content-Type": "application/json",
  },
  //    ... rest of configuration
});

export const JsonConfig = {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
};

export const FormDataConfig = {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
};

export default ApiClient;
