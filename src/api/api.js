import { getApiConfig } from "./config";
import AuthClient from "./auth/auth-client";

// read the configuration
const config = getApiConfig();

// create project client
export const authClient = new AuthClient(config);