import {
  firebaseApiKey,
  firebaseAuthDomain,
  firebaseDatabaseURL,
  firebaseProjectId,
  firebaseStorageBucket,
  firebaseMessagingSenderId,
  firebaseAppId,
  webClientId,
  apikeyRaygun,
  apikeyRaygunDev,
  apiUrl,
  apiProd,
} from '@env';

export const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: firebaseAuthDomain,
  databaseURL: firebaseDatabaseURL,
  projectId: firebaseProjectId,
  storageBucket: firebaseStorageBucket,
  messagingSenderId: firebaseMessagingSenderId,
  appId: firebaseAppId,
};
export const isProduction = url => {
  return url === apiProd ? true : false;
};

export const raygunConfig = {
  apiKey: isProduction(apiUrl) ? apikeyRaygun : apikeyRaygunDev,
  enableCrashReporting: true,
  enableRealUserMonitoring: true,
};
export const googleConfig = {
  // Replace with your firebaseWebClientId
  // Generated from Firebase console
  scopes: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/user.emails.read',
    'https://www.googleapis.com/auth/user.phonenumbers.read',
    'https://www.googleapis.com/auth/contacts.readonly',
  ],
  webClientId,
};
