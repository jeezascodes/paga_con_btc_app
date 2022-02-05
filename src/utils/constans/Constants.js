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
  // HomeStack
  FEED: 'Feed',
  WELCOME: 'Welcome',
  PROFILE: 'Profile',
  SERVICE_DETAIL: 'ServiceDetail',
  DISPLAY_INVOICE: 'DisplayInvoice',
};

export const TextTypes = {
  BODY: 'Body',
  HEADLINELARGE: 'HeadLineLarge',
  HEADLINEMEDIUM: 'HeadLineMedium',
  TITLE: 'Title',
  SUBHEADER: 'Subheader',
  TIRTIARY: 'Tirtiary',
};

export const PaymentStates = {
  AWAITING_INVOICE_PAYMENT: 'AWAITING_INVOICE_PAYMENT',
  INVOICE_PAID: 'INVOICE_PAID',
  SERVICE_PAYMENT_IN_PROCESS: 'SERVICE_PAYMENT_IN_PROCESS',
  SERVICE_PAID: 'SERVICE_PAID',
};

export const BadgeTypes = {
  DEFAULT: 'DEFAULT',
  CONTRAST: 'CONTRAST',
};

export const placeholderTexts = {
  BIRTH_DATE: 'MM/dd/yyyy',
};

export const serviceCategories = {
  SERVICE: 'SERVICE',
  PHONE_RECHARGE: 'PHONE_RECHARGE',
  GIFT_CARD: 'GIFT_CARD',
};

export const dateFormats = {
  SHORT_DATE: 'YYYY-MM-DD',
  FULL_DATE: 'YYYY-MM-DD HH:mm:ss',
  REGULAR_TIME: 'hh:mm:ss a',
  MILITARY_TIME: 'HH:mm:ss',
  MONTH_DAY: 'MMMM DD',
  WEEKDAY_NAME: 'dddd',
};

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
  USER_STORED_EMAIL: 'userStoredEmail',
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

export const successMessages = {
  PROFILE_UPDATE: 'Profile updated successfully',
};
