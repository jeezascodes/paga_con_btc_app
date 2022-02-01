import fetch from './fetchHelper';
import * as urls from './urls';

// New API methods
export const getCategoriesList = () => {
  return fetch(urls.categories, {
    method: 'GET',
  });
};

export const getServicesList = () => {
  return fetch(urls.services, {
    method: 'GET',
  });
};

export const createInvoice = data => {
  return fetch(urls.payment, {
    method: 'POST',
    body: data,
  });
};

export const getPaymentStatus = id => {
  return fetch(urls.paymentStatus(id), {
    method: 'GET',
  });
};
