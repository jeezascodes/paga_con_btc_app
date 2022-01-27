export const ThemeTypes = {
  LIGHT: 'light',
  DARK: 'dark',
};

export const ButtonTypes = {
  PRIMARY: 'Primary',
  SECONDARY: 'Secondary',
  GRADIENT: 'Gradient',
};

export const ButtonPaddingTypes = {
  NORMAL: 'Normal',
  THICK: 'Thick',
  THIN: 'Thin',
};

export const IconNames = {
  ADD: 'Add',
  CHECKBOX: 'Checkbox',
  INFO: 'Info',
  HOME: 'Home',
  EDUCATION: 'Education',
  COMMUNITY: 'Community',
  CHAT: 'Chat',
  RESOURCES: 'Resources',
  ARROW_DOWN: 'ArrowDown',
  ARROW_UP: 'ArrowUp',
  PHONE: 'Phone',
  APPLE_LOGO: 'AppleLogo',
  GOOGLE_LOGO: 'GoogleLogo',
  EDIT: 'Edit',
  CLOSE: 'Close',
  MUSIC_NOTE: 'MusicNote',
  PICTURE: 'Picture',
  PLAY: 'Play',
  PAUSE: 'Pause',
};

export const RouteNames = {
  HOME: 'Home',
  OFFLINE: 'OfflineScreen',
  // AuthStack
  LOGIN: 'Login',
  LOADING: 'Loading',
  REGISTER_PHONE: 'RegisterPhone',
  VERIFY_PHONE: 'VerifyPhone',
  // HomeStack
  FEED: 'Feed',
  PROFILE: 'Profile',
};

export const TextTypes = {
  BODY: 'Body',
  HEADLINELARGE: 'HeadLineLarge',
  HEADLINEMEDIUM: 'HeadLineMedium',
  TITLE: 'Title',
  SUBHEADER: 'Subheader',
  TIRTIARY: 'Tirtiary',
};

export const BadgeTypes = {
  DEFAULT: 'DEFAULT',
  CONTRAST: 'CONTRAST',
};

export const placeholderTexts = {
  BIRTH_DATE: 'MM/dd/yyyy',
};

export const FIRST_HELLO = 'hello';
export const START_OVER = 'cancel';
export const GO_BACK_COMMAND_CHAT = 'return';

export const dateFormats = {
  SHORT_DATE: 'YYYY-MM-DD',
  FULL_DATE: 'YYYY-MM-DD HH:mm:ss',
  REGULAR_TIME: 'hh:mm:ss a',
  MILITARY_TIME: 'HH:mm:ss',
  MONTH_DAY: 'MMMM DD',
  WEEKDAY_NAME: 'dddd',
};

export const SHOW_ON_LIST = '1';

export const SlidewayTextTypes = {
  ONLY_TITLE: 'ONLY_TITLE',
  WITH_SUBTITLE: 'WITH_SUBTITLE',
  WITH_DESCRIPTION: 'WITH_DESCRIPTION',
};

export const IconButtonTypes = {
  NORMAL: 'Normal',
  SMALL: 'Small',
  EXTRASMALL: 'ExtraSmall',
};

export const fieldKeys = {
  EMAIL: 'email',
  BIRTH: 'date_of_birth',
  NAME: 'first_name',
  LAST_NAME: 'last_name',
  PHONE: 'firebase_phone',
  PHONE_VALID: 'phone_is_valid',
};
export const messageInterval = 1000;

export const statusCodes = {
  CONTENT_EMPTY: 204,
};

export const locallyStoredUserVariables = {
  KVELL_USER_ID_KEY: 'userKvellId',
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_ID: 'userId',
  USER_COMPLETED_ACTIVITIES: 'userCompletedActivities',
  TYPE_LOGIN: 'typeLogin',
  COMPLETE_WIZARD: 'feedWizardComplete',
};

export const OsTypes = {
  ANDROID: 'android',
  IOS: 'ios',
};

export const errorMessages = {
  INVALID_CODE: 'Invalid verification code',
  USER_NOT_FOUND: 'User not found',
  WRONG: 'Something went wrong, please try again.',
  INVALID_NUMBER: 'Please use valid phone number',
};
export const firebaseErrors = {
  VERIFICATION_CODE: 'auth/invalid-verification-code',
  USER_NOT_FOUND: 'auth/user-not-found',
  INVALID_NUMBER: 'auth/invalid-phone-number',
};
export const successMessages = {
  PROFILE_UPDATE: 'Profile updated successfully',
};

export const registrarionProviders = {APPLE: 'Apple', FIREBASE: 'Firebase'};

export const FEEDBACK_COMMENT =
  'Thanks for your feedback! Would you like to leave a comment?';

export const LoginTypes = {
  APPLE: 'Apple',
  PHONE: 'Phone',
};

export const DefaultName = 'Hero';
