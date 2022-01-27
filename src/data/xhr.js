// this method is only for upload file o image

// Utils
import Store from '_utils/helpers/store';
import {includes} from 'lodash';

const fxhr = (url, option = {method: 'GET'}) => {
  return new Promise(async (resolve, reject) => {
    // new instance of XMLHttpRequest
    const xhr = new XMLHttpRequest();
    const valid_status = [200, 201, 206];

    const {method, data} = option;
    // get token of storage
    let token = await Store.get('token');

    // open conecction
    xhr.open(method, url, true);

    // set header
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'multipart/form-data');
    xhr.setRequestHeader('Authorization', `JWT-V3 ${token}`);

    // on moment that fecth is ready
    xhr.onload = () => {
      if (xhr.readyState === xhr.DONE && includes(valid_status, xhr.status)) {
        resolve(JSON.parse(xhr.response));
      } else {
        reject({
          status: xhr.status,
          data: JSON.parse(xhr.response),
        });
      }
    };

    // faltal error
    xhr.onerror = e => {
      reject({
        [e.type]: e.target.responseText,
      });
    };

    // send fetch
    xhr.send(data);
  });
};

export default fxhr;
