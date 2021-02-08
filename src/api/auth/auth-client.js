import BaseAxiosClient from "../base-axios-client";
/**
 * The client for "auth" service
 */
export default class AuthClient extends BaseAxiosClient {
  /**
   * Creates new instance of the auth client
   *
   * @param {*} config The client configuration
   */
  constructor(config) {
    super("auth", config);
  }

  /**
   * Login the given user
   *
   * @param {any} request The user login request
   * @returns {object} The login response
   */
  login(request) {
    // build url
    const url = "";

    const data = {
      client_id: "",
      client_secret: "",
      grant_type: "password",
      scope: "openid offline_access",
      username: request.username,
      password: request.password,
    };

    return this.webClient.post(url, new URLSearchParams(data), {
      headers: {
        ...this.contentType("application/x-www-form-urlencoded")
      }
    });
  }
}
