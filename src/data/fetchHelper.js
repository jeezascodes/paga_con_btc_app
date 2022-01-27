// Utils
import Store from '_utils/helpers/store';
import {ApiOperations, statusCodes} from '_utils/constans/Constants';
import uuid from 'react-native-uuid';
import utf8 from 'utf8';
import {locallyStoredUserVariables} from '_utils/constans/Constants';

const GetBody = (body, boundary) => {
  var bodyString = '';
  let boundaryPrefix = `--${boundary}\r\n`;
  for (const property in body) {
    bodyString += boundaryPrefix;
    bodyString += `Content-Disposition: form-data; name="${property}"\r\n\r\n`;
    bodyString += `${body[property]}\r\n`;
  }

  bodyString += `--${boundary}--\r\n`;
  return utf8.encode(bodyString);
};

const fetchHelper = async (
  url,
  options = {},
  isBoundary = false,
  oldApi = false,
  useToken = true,
) => {
  const fetchOptions = {
    method: 'POST',
    headers: {},
    ...options,
  };
  let fireBaseUserId = await Store.get(locallyStoredUserVariables.USER_ID);

  let token = await Store.get(locallyStoredUserVariables.ACCESS_TOKEN);
  if (token && useToken) {
    fetchOptions.headers.Authorization = `Bearer ${token}`;
  }

  if (isBoundary) {
    const newUid = uuid.v4();
    let boundary = `Boundary-${newUid}`;

    fetchOptions.headers[
      'Content-Type'
    ] = `multipart/form-data; boundary=${boundary}`;
    fetchOptions.headers.APP_TOKEN = 'C44zayLL2+MB-DhKuEeVz_j_Cr!HD6=X';
    fetchOptions.headers.USER_ID = fireBaseUserId;

    fetchOptions.body = GetBody(options?.body, boundary);
  } else {
    if (fetchOptions.method !== 'GET' && fetchOptions.body) {
      fetchOptions.headers['Content-Type'] = 'application/json';
      fetchOptions.body = JSON.stringify(fetchOptions.body);
    }
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
