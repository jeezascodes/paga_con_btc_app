import {wordPressUrl} from '@env';

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
  EDUCATION: 'Education',
  COMMUNITY: 'Community',
  CHAT: 'Chat',
  RESOURCES: 'Resources',
  OFFLINE: 'OfflineScreen',
  PICKER_SONG: 'PickerSong',
  // AuthStack
  LOGIN: 'Login',
  LOADING: 'Loading',
  DAILY_QUOTE: 'DailyQuote',
  REGISTER_PHONE: 'RegisterPhone',
  VERIFY_PHONE: 'VerifyPhone',
  // HomeStack
  FEED: 'Feed',
  MENTAL_HEALTH: 'MentalHealth',
  FEED_WIZARD: 'FeedWizard',
  CALENDAR: 'Caledar',
  KVELL_WHEEL_INTRO: 'KvellWheelIntro',
  KVELL_WHEEL: 'KvellWheel',
  KVELL_WHEEL_UPDATE: 'KvellWheelUpdate',
  DIARY: 'Diary',
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

export const CalendarMarketTypes = {
  SIMPLE: 'simple',
  PERIOD: 'period',
  MULTI_DOT: 'multi-dot',
  CUSTOM: 'custom',
};

export const HealthCategoriesNames = {
  MENTAL_HEALTH: 'MentalHealth',
  SOCIAL_LIFE: 'SocialLife',
  INNER_SELF: 'InnerSelf',
  PHYSICAL_HEALTH: 'PhysicalHealth',
  FINANCIALS: 'Financials',
  LOVE: 'Love,intimacy,andsexuality',
};

export const HealthSubCategoriesNames = {
  COGNITIVE: 'Cognitive Health',
  SELF_ACTUALIZATION: 'Self-Actualization',
  EMOTIONAL_INT: 'Emotional Intelligence',
  WELL_DEVELOPED: 'Well-Developed Support System',
  FAMILY: 'Family',
  FRIENDSHIP: 'Friendship',
  SOCIAL_NETWORK: 'Social Network',
  AUTHENTICITY: 'Authenticity',
  LIFE_PURPOSE: 'Life’s Purpose',
  REST_RELAX: 'Rest and relaxation',
  HEALTH_EAT: 'Healthy Eating',
  PHYSICAL_ACTIVITY: 'Physical Activity',
  SLEEP: 'Sleep Hygiene',
  NUTRITIONAL_WELL_BEING: 'Nutritional well-being',
  HORMONAL: 'Hormonal Balance',
  FINANCIALS: 'Financials',
  LOVE: 'Love, intimacy and sexuality',
};
export const KvellWheelCategories = [
  {
    title: HealthCategoriesNames.MENTAL_HEALTH,
    properties: [
      HealthSubCategoriesNames.COGNITIVE,
      HealthSubCategoriesNames.SELF_ACTUALIZATION,
      HealthSubCategoriesNames.EMOTIONAL_INT,
    ],
  },
  {
    title: HealthCategoriesNames.SOCIAL_LIFE,
    properties: [
      HealthSubCategoriesNames.WELL_DEVELOPED,
      HealthSubCategoriesNames.FAMILY,
      HealthSubCategoriesNames.FRIENDSHIP,
      HealthSubCategoriesNames.SOCIAL_NETWORK,
    ],
  },
  {
    title: HealthCategoriesNames.INNER_SELF,
    properties: [
      HealthSubCategoriesNames.AUTHENTICITY,
      HealthSubCategoriesNames.LIFE_PURPOSE,
      HealthSubCategoriesNames.REST_RELAX,
    ],
  },
  {
    title: HealthCategoriesNames.PHYSICAL_HEALTH,
    properties: [
      HealthSubCategoriesNames.HEALTH_EAT,
      HealthSubCategoriesNames.PHYSICAL_ACTIVITY,
      HealthSubCategoriesNames.SLEEP,
      HealthSubCategoriesNames.NUTRITIONAL_WELL_BEING,
      HealthSubCategoriesNames.HORMONAL,
    ],
  },
  {
    title: HealthCategoriesNames.FINANCIALS,
    properties: [HealthSubCategoriesNames.FINANCIALS],
  },
  {
    title: HealthCategoriesNames.LOVE,
    properties: [HealthSubCategoriesNames.LOVE],
  },
];

export const HealthCategories = {
  MENTAL_HEALTH: {
    name: 'Mental Health',
    subCategory1: {
      name: 'Emotional Intelligence',
    },
    subCategory2: {
      name: 'Psychological Health',
    },
  },
  SOCIAL_LIFE: {
    name: 'Social Life',
    subCategory1: {
      name: 'Healthy Relationship',
    },
    subCategory2: {
      name: 'Well-developed support system',
    },
  },
  INNER_SELF: {
    name: 'Inner Self',
    subCategory1: {
      name: 'Authenticity',
    },
    subCategory2: {
      name: 'Purpose and meaning of life',
    },
    subCategory3: {
      name: 'Rest and relaxation',
    },
  },
  PHYSICAL_HEALTH: {
    name: 'Physical Health',
    subCategory1: {
      name: 'Hormonal balance',
    },
    subCategory2: {
      name: 'Micronutrient sufficiency',
    },
    subCategory3: {
      name: 'Healthy diet',
    },
    subCategory4: {
      name: 'Qualitative sleep',
    },
    subCategory5: {
      name: 'Physical activity',
    },
  },
  FINANCIALS: {
    name: 'Financials',
    subCategory1: {
      name: 'Mental Health',
    },
    subCategory2: {
      name: 'Emotional Intelligence',
    },
    subCategory3: {
      name: 'Psychological Health',
    },
  },
  LOVE: {
    name: 'Love, intimacy, and sexuality',
  },
};

export const BadgeTypes = {
  DEFAULT: 'DEFAULT',
  CONTRAST: 'CONTRAST',
};

export const placeholderTexts = {
  BIRTH_DATE: 'MM/dd/yyyy',
};

// This should use some kind of id in the future,
// and probably come from the API
export const HealthCategoriesQuestions = propertyName => {
  switch (propertyName) {
    case HealthCategoriesNames.MENTAL_HEALTH:
      return 'How is your Mental Health?';
    case HealthCategoriesNames.SOCIAL_LIFE:
      return 'How is your Social Life?';
    case HealthCategoriesNames.INNER_SELF:
      return 'Are you happy with yourself?';
    case HealthCategoriesNames.PHYSICAL_HEALTH:
      return 'Do you feel healthy?';
    case HealthCategoriesNames.FINANCIALS:
      return 'Do you feel financially stable?';
    case HealthCategoriesNames.LOVE:
      return 'Do you feel in love?';
    default:
      return 'How do you feel?';
  }
};

// This informations should come from the API too
export const InfoBySubCategory = {
  s0_0:
    'Cognitive health encompasses the functions and performance of your brain; it includes all processes related to learning, memory, thinking, and motor function.',
  s0_1:
    "Self-actualization is the process of applying one's creative, social, and intellectual strengths to maximize individual potential to live a meaningful and impactful life.",
  s0_2:
    'Emotional intelligence refers to a set of learnable skills that include identifying emotions (within yourself and others), regulating your emotions and impulses, social skills, empathy, and motivation.',
  s1_0:
    'A well-developed support system is a degree to which social connections are open to and available for emotional support and care.',
  s1_1:
    'Family can be defined as your innermost social circle, often bound by blood relation, co-existence, or pervasive unconditional love over time. It could include lifelong friends, extended family like grandparents or cousins, or your domestic partner.',
  s1_2:
    'Friendship is a voluntary social bond between people who share a degree of trust, mutual interests, affection, emotional support, and companionship.',
  s1_3:
    'Social network includes your family, friends, co-workers, online communities, and acquaintances and provides some sort of social benefit-- love, activity partners, emotional connection, and sense of connectedness to humanity.',
  s2_0:
    'Authenticity is the degree to which your life is an expression of your deepest values, self, and truth.',
  s2_1:
    "Your life's purpose is the degree to which you feel your life is connected to, in service of, and making an impact on something greater than the self.",
  s2_2:
    'Rest and relaxation is the degree to which you balance work and productivity with restorative and self-care activities.',
  s3_0:
    'Healthy Eating encompasses your perceptions of food and the food choices that you make.',
  s3_1:
    'Physical Activity assesses your exercise habits, makes personalized recommendations, and tracks your progress.',
  s3_2: 'Sleep hygiene measures and tracks your sleep quality.',
  s3_3:
    'Nutritional well-being allows you to explore and track your nutritional deficits and helps you to customize your supplementation plan.',
  s3_4:
    'Hormonal balance allows you to track your hormonal status and helps you to find out how to balance your hormones.',
  s4_0:
    'Financial satisfaction with current and future financial situations is the degree to which you feel comfortable and stable in meeting your present and future financial needs and goals.',
  s5_0:
    "Health in love, intimacy, and sexuality includes the exploration and expression of one's sexual identity without fear, guilt, or shame and understanding what healthy relationships, mutual intimacy, and what consent looks like in the context of your life.",
};

export const wheelValuesCategoryTitlesById = {
  c0: 'Mental Health',
  c1: 'Social Life',
  c2: 'Inner Self',
  c3: 'Physical Health',
  c4: 'Financials',
  c5: 'Love,intimacy,andsexuality',
};

export const wheelValuesSubcategoryTitlesById = {
  s0_0: 'Cognitive Health',
  s0_1: 'Self-Actualization',
  s0_2: 'Emotional Intelligence',
  s1_0: 'Well-Developed Support System',
  s1_1: 'Family',
  s1_2: 'Friendship',
  s1_3: 'Social Network',
  s2_0: 'Authenticity',
  s2_1: 'Life’s Purpose',
  s2_2: 'Rest and Relaxation',
  s3_0: 'Healthy Eating',
  s3_1: 'Physical Activity',
  s3_2: 'Sleep Hygiene',
  s3_3: 'Nutritional Well-being',
  s3_4: 'Hormonal Balance',
  s4_0: 'Financials',
  s5_0: 'Love, Intimacy and Sexuality',
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
