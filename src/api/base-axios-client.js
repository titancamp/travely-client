import axios from "axios";
import BaseClient from "./base-client";

/**
 * The base axios-based client module
 */
export default class BaseAxiosClient extends BaseClient {
  /**
   * Creates new instance of axios client
   *
   * @param {object} config The client configuration
   */
  constructor(service, config) {
    super(service, config);

    // create instance of default web client
    this.webClient = axios.create({
      timeout: config.timeout,
      headers: {
        ...this.contentType(),
        ...this.allowCORS(),
        client: this.client
      }
    });
  } 
}
