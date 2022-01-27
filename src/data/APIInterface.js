import fetch from './fetchHelper';
import * as urls from './urls';

// New API methods
export const userLogin = data => {
  return fetch(urls.userLogin, {
    method: 'POST',
    body: data,
  });
};
