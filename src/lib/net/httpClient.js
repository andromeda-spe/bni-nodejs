import axios from 'axios';
import { stringify } from 'qs';
import { getTimeStamp, generateTokenSignature } from '../util/util.js';
class HttpClient {
  constructor() {
    this.httpClient = axios.create();
  }

  /**
   * Initiate with options
   * @param  {Object} options - should have these props:
   * url, username, password
   *
   * @return {Object} promse with resolve or reject
   *
   */

  tokenRequest(options = { url, username, password }) {
    const headers = {
      'content-type': 'application/x-www-form-urlencoded',
      'user-agent': 'bni-nodejs/0.1.6'
    };

    return new Promise(async (resolve, reject) => {
      // TODO add request body validation

      try {
        const res = await this.httpClient({
          method: 'POST',
          headers: headers,
          url: options.url,
          auth: {
            username: options.username,
            password: options.password
          },
          data: stringify({
            grant_type: 'client_credentials'
          })
        });

        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * Initiate with options
   * @param  {Object} options - should have these props:
   * url, username, password
   *
   * @return {Object} promse with resolve or reject
   *
   */

  tokenRequestSnapBI(options = { url, clientId, privateKeyPath }) {
    const timeStamp = getTimeStamp();
    const headers = {
      'Content-Type': 'application/json',
      'X-SIGNATURE': generateTokenSignature({
        privateKeyPath: options.privateKeyPath,
        clientId: options.clientId,
        timeStamp: timeStamp
      }),
      'X-TIMESTAMP': timeStamp,
      'X-CLIENT-KEY': options.clientId
    };

    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.httpClient({
          method: 'POST',
          headers: headers,
          url: options.url,
          data: {
            grantType: 'client_credentials',
            additionalInfo: {}
          }
        });

        resolve(res.data);
      } catch (err) {
        reject(err.data);
      }
    });
  }

  /**
   * Initiate with options
   * @param  {Object} options - should have these props:
   * method, apiKey, accessToken, url, data
   *
   * @return {Object} promse with resolve or reject
   *
   */

  request(options = { method, apiKey, accessToken, url, data }) {
    const headers = {
      'content-type': 'application/json',
      'user-agent': 'bni-nodejs/0.1.6',
      'x-api-key': options.apiKey
    };

    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.httpClient({
          method: options.method,
          headers: headers,
          url: options.url,
          params: { access_token: options.accessToken },
          data: options.data
        });

        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  requestSnapBI(
    options = { method, apiKey, accessToken, url, data, additionalHeader: {} }
  ) {
    const header = {
      'content-type': 'application/json',
      'user-agent': 'bni-nodejs/0.1.6',
      Authorization: `Bearer ${options.accessToken}`
    };

    const headers = {
      ...header,
      ...options.additionalHeader
    };

    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.httpClient({
          method: options.method,
          headers: headers,
          url: options.url,
          data: options.data
        });

        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  requestV2(options = { method, apiKey, accessToken, url, data, signature, timestamp }) {
    const headers = {
      'content-type': 'application/json',
      'user-agent': 'bni-nodejs/0.1.6',
      'x-api-key': options.apiKey,
      'x-signature': options.signature,
      'x-timestamp': options.timestamp
    };
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.httpClient({
          method: options.method,
          headers: headers,
          url: options.url,
          params: { access_token: options.accessToken },
          data: options.data
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }
}

<<<<<<< HEAD

export default HttpClient;
=======
export default HttpClient;
>>>>>>> 430c9b0b4080bed344aca86b696030e1cdb462d4
