import axios from "axios";

const ApiClient = axios.create({
  baseURL: `https://localhost:44387/api/v1.0/`,
  headers: {
    // Authorization: "Bearer " + jwtToken,
    // "Content-Type": "application/json",
  }
  //    ... rest of configuration
});

export default ApiClient;
