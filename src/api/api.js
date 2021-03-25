import axios from "axios";

const ApiClient = axios.create({
  // baseURL: "https://api.example.com",
  baseURL: "http://localhost:5000",
  headers: {
    // Authorization: "Bearer " + jwtToken,
    "Content-Type": "application/json",
  },
  //    ... rest of configuration
});

export default ApiClient;
