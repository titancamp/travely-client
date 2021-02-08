/**
 * The API Configuration
 */
export function getApiConfig() {
  return {    
    client: process.env.REACT_APP_WEB_CLIENT,
    clientId: process.env.REACT_APP_WEB_CLIENT_ID,
    clientSecret: process.env.REACT_APP_WEB_CLIENT_SECRET,
    timeout: parseInt(process.env.REACT_APP_WEB_REQUEST_TIMEOUT)
  };
}