import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const ApiClient = axios.create({
  baseURL: SERVER_URL,
  headers: {
    // Authorization: "Bearer " + jwtToken,
    // "Content-Type": "application/json",
  },
  //    ... rest of configuration
});

export default ApiClient;
