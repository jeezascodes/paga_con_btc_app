// Utils
import Store from '_utils/helpers/store';
import {statusCodes} from '_utils/constans/Constants';
import {locallyStoredUserVariables} from '_utils/constans/Constants';

const fetchHelper = async (url, options = {}) => {
  const fetchOptions = {
    method: 'POST',
    headers: {},
    ...options,
  };

  if (fetchOptions.method !== 'GET' && fetchOptions.body) {
    fetchOptions.headers['Content-Type'] = 'application/json';
    fetchOptions.body = JSON.stringify(fetchOptions.body);
  }

  return fetch(url, fetchOptions).then(response => {
    if (response.status === 401) {
    }
    if (response.status >= 400) {
      let error = {url};
      error.status = response.status;

      if (response.status >= 500) {
      }
      return new Promise((resolve, reject) => {
        response
          .json()
          .then(message => {
            error.message = message;
            reject(error);
          })
          .catch(newError => {
            error.message = newError;
            reject(error);
          });
      });
    }
    if (response.ok && response.status === statusCodes.CONTENT_EMPTY) {
      return Promise.resolve(statusCodes.CONTENT_EMPTY);
    }
    return new Promise(resolve => {
      response.json().then(resolve, () => {
        resolve('');
      });
    });
  });
};

export default fetchHelper;
