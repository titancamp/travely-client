/**
 * The base client module
 */
export default class BaseClient {

    /**
     * Creates new instance of base client
     * 
     * @param {string} service The service to connect
     * @param {object} config The client configuration 
     */
    constructor(service, config) {
        this.service = service;
        this.config = config;
        this.client = config.client;
        this.clientId = config.clientId;
        this.clientSecret = config.clientSecret;
    }

    /**
     * The auth bearer header
     * 
     * @param {string} token The token
     */
    authBearer(token){
        return { 'Authorization': `Bearer ${token}`};
    }
    
    /**
     * Allow CORS header
     * 
     */
    allowCORS(){
        return { 'Access-Control-Allow-Origin':'*'  }
    }   

    /**
     * The content type header
     * 
     * @param {string} value The content type value
     */
    contentType(value){

        // use value if given
        if(value){
            return {'Content-Type': value};
        }

        // json by default
        return {'Content-Type': 'application/json'}; 
    }
}