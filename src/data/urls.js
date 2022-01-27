import {baseAPIChatBot} from '@env';
import {apiUrl} from '@env';

// API V3
export const BASE_API_V3 = apiUrl;

export const GOOGLE_PEOPLE_API = 'https://people.googleapis.com/v1/people/me';

export const CHATBOT_API = `${baseAPIChatBot}api/chatbot/messages/message`;
export const CHATBOT_API_CONTEXT = `${baseAPIChatBot}chatbot/precontext`;
export const BASE_API_SPOTIFY = 'https://api.spotify.com/v1/';

export const SpotifyToken = 'https://accounts.spotify.com/api/token';
export const SearchSpotify = searchValue =>
  `${BASE_API_SPOTIFY}search?q=${searchValue}&type=track`;
// New API urls
export const userRegistration = `${BASE_API_V3}/api/account/register`;

export const userLogin = `${BASE_API_V3}/api/account/login`;

export const refreshToken = `${BASE_API_V3}/api/account/refresh_token`;

export const getUser = id => `${BASE_API_V3}/api/users/${id}`;

export const getDailyQuoteByUser = userId =>
  `${BASE_API_V3}/api/daily_quotes/for_user/${userId}`;

export const getDailyQuoteById = quoteId =>
  `${BASE_API_V3}/api/daily_quotes/${quoteId}`;

export const getUserProgressByDate = (id, date) =>
  `${BASE_API_V3}/api/user_progress/by_date?userid=${id}&date=${date}`;

export const getUserByFirebaseID = firebaseUserId =>
  `${BASE_API_V3}/api/users?firebaseUserId=${firebaseUserId}`;

export const setBasicProfile = id =>
  `${BASE_API_V3}/api/users/${id}/basic_profile`;

export const checkList = `${BASE_API_V3}/api/user_progress/checklist`;

export const userDiary = `${BASE_API_V3}/api/user_progress/diary`;
export const newFeedback = `${BASE_API_V3}/api/feedback/new`;
export const updateFeedback = `${BASE_API_V3}/api/feedback/update`;
export const updateWheelValues = `${BASE_API_V3}/api/wheel_values`;

export const getUserProgressByRange = (id, begin_date, end_date) =>
  `${BASE_API_V3}/api/user_progress/by_date_range?userid=${id}&dateFrom=${begin_date}&dateTo=${end_date}`;

export const moodDiary = `${BASE_API_V3}/api/user_progress/mood`;

export const updateField = id => `${BASE_API_V3}/api/users/${id}/fields`;

export const sendVerificationEmail = id =>
  `${BASE_API_V3}/api/users/${id}/send_email_verification`;

export const verifyEmail = (id, code) =>
  `${BASE_API_V3}/api/users/${id}/verify_email?code=${code}`;
