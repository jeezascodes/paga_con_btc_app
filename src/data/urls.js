import {apiUrl} from '@env';

// API V3
export const BASE_API_V3 = apiUrl;

export const GOOGLE_PEOPLE_API = 'https://people.googleapis.com/v1/people/me';

// New API urls
export const userRegistration = `${BASE_API_V3}/api/account/register`;

export const userLogin = `${BASE_API_V3}/api/account/login`;

export const refreshToken = `${BASE_API_V3}/api/account/refresh_token`;

export const getUser = id => `${BASE_API_V3}/api/users/${id}`;

export const getDailyQuoteByUser = userId =>
  `${BASE_API_V3}/api/daily_quotes/for_user/${userId}`;

export const getDailyQuoteById = quoteId =>
  `${BASE_API_V3}/api/daily_quotes/${quoteId}`;

export const getUserByFirebaseID = firebaseUserId =>
  `${BASE_API_V3}/api/users?firebaseUserId=${firebaseUserId}`;

export const updateField = id => `${BASE_API_V3}/api/users/${id}/fields`;

export const sendVerificationEmail = id =>
  `${BASE_API_V3}/api/users/${id}/send_email_verification`;

export const verifyEmail = (id, code) =>
  `${BASE_API_V3}/api/users/${id}/verify_email?code=${code}`;
