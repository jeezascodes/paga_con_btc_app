import fetch from './fetchHelper';
import * as urls from './urls';

// New API methods
export const userLogin = data => {
  return fetch(urls.userLogin, {
    method: 'POST',
    body: data,
  });
};

export const refreshToken = data => {
  return fetch(urls.refreshToken, {
    method: 'POST',
    body: data,
  });
};

export const userRegistration = data => {
  return fetch(urls.userRegistration, {
    method: 'POST',
    body: data,
  });
};

export const getUser = id => {
  return fetch(urls.getUser(id), {
    method: 'GET',
  });
};

export const getUserByFirebaseID = id => {
  return fetch(urls.getUserByFirebaseID(id), {
    method: 'GET',
  });
};

export const getUserProgressByDate = (id, date) => {
  return fetch(urls.getUserProgressByDate(id, date), {
    method: 'GET',
  });
};

export const getUserProgressByRangeDate = data => {
  const {begin_date, end_date, id} = data;
  return fetch(urls.getUserProgressByRange(id, begin_date, end_date), {
    method: 'GET',
  });
};

export const setBasicProfile = (id, data) => {
  return fetch(urls.setBasicProfile(id), {
    method: 'PUT',
    body: data,
  });
};

export const createNewFeedback = data => {
  return fetch(urls.newFeedback, {
    method: 'POST',
    body: data,
  });
};
export const updateFeedback = data => {
  return fetch(urls.updateFeedback, {
    method: 'PUT',
    body: data,
  });
};
export const updateField = (data, id) => {
  return fetch(urls.updateField(id), {
    method: 'PUT',
    body: data,
  });
};

export const sendVerificationEmail = id => {
  return fetch(urls.sendVerificationEmail(id), {
    method: 'POST',
  });
};

export const verifyEmail = (id, code) => {
  return fetch(urls.verifyEmail(id, code), {
    method: 'POST',
  });
};

export const getDailyQuoteByUser = userId => {
  return fetch(urls.getDailyQuoteByUser(userId), {
    method: 'GET',
  });
};

export const getDailyQuoteById = id => {
  return fetch(urls.getDailyQuoteById(id), {
    method: 'GET',
  });
};
