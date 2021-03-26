import axios from "axios";

const ApiClient = axios.create({
  baseURL: "https://api.example.com",
  headers: {
    // Authorization: "Bearer " + jwtToken,
    // "Content-Type": "application/json",
  },
  //    ... rest of configuration
});

export default ApiClient;
