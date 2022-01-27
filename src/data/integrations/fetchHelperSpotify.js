import {Base64Helper} from '_utils/helpers/base64Helper';
import {spotifyClientID, spotifyClientSecret} from '@env';
const fetchHelperSpotify = async (url, options = {}, init = false) => {
  const fetchOptions = {
    method: 'GET',
    headers: {},
    ...options,
  };

  if (fetchOptions.method !== 'GET' && fetchOptions.body) {
    fetchOptions.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  }

  if (init) {
    var clientId = spotifyClientID;
    var clientSecret = spotifyClientSecret;
    var encodedData = Base64Helper.btoa(clientId + ':' + clientSecret);
    var authorizationHeaderString = 'Basic ' + encodedData;
    fetchOptions.headers.Authorization = authorizationHeaderString;
  }

  return fetch(url, fetchOptions).then(response => {
    if (response.status === 401) {
    }
    if (response.status >= 400) {
      let error = {
        message: `Something went wrong.`,
        url: response.url,
        status: response.status,
        statusText: response.statusText,
      };
      if (response.status >= 500) {
        error = {
          message: `Something went wrong.`,
          url: response.url,
          status: +response.status,
          statusText: response.statusText,
          data: response.data,
        };
      }
      return new Promise((resolve, reject) => {
        response
          .json()
          .then(message => {
            error.code = message.code;
            error.response = message;

            reject(error);
          })
          .catch(() => {
            reject(error);
          });
      });
    }

    if (response.ok && response.status === 204) {
      return Promise.resolve('Success');
    }
    return new Promise(resolve => {
      response.json().then(resolve, () => {
        resolve('');
      });
    });
  });
};

export default fetchHelperSpotify;
