import {
  defaultChecklistOptions,
  KvellWheelCategories,
} from '_utils/constans/Constants';
import formatHelper from '_utils/helpers/formatHelper';

export const ACTIONS = {
  SET_USER_ID: 'SET_USER_ID',
  SET_USER_BASIC_DATA: 'SET_USER_BASIC_DATA',
  DISABLE_SHOW_QUOTE: 'DISABLE_SHOW_QUOTE',
  SET_USER_COMPLETED_ACTIVITIES: 'SET_USER_COMPLETED_ACTIVITIES',
  SET_USER_MOOD: 'SET_USER_MOOD',
  SET_DAILY_QUOTE: 'SET_DAILY_QUOTE',
  SET_USER_STORIES: 'SET_USER_STORIES',
  SET_PROGRESS_RANGE: 'SET_PROGRESS_RANGE',
  SET_IS_LOADING: 'SET_IS_LOADING',
};

const KvellChecklistOptions = [
  '6-9 Hours of Sleep',
  'Expression of Gratitude Upon Waking Up',
  'AM Journal Entry - Feelings',
  '30+ Minutes of Exercise',
  'Healthy Diet Choices',
  '64+oz of Water Consumption',
  'Vitamins/Supplements',
  'Meditation',
  'Affirmations - "I Am" Statements',
  'Read or Listen to a Motivational Source Related to Your Journey',
];

export const setUser = data => {
  return {type: ACTIONS.SET_USER_ID, data};
};

export const setUserBasicData = data => {
  let newData = {};
  if (data.userChecklistOptions) {
    let options = data.userChecklistOptions;

    newData = {...newData, userChecklistOptions: options};
  } else {
    let options = KvellChecklistOptions.map(item => {
      return {
        title: item,
        is_checked: false,
        show_on_list: true,
        done: false,
      };
    });
    newData = {...newData, userChecklistOptions: options};
  }

  if (Object.keys(data).includes('wheelValues')) {
    let generateInfo = false;
    if (data.wheelValues !== null && data.wheelValues?.length > 0) {
      // Since the API doesn't validate the objects before insertion
      // and there are users with a string that matches the format used
      // in the previous app, we have to validate if the object is really
      // valid before storing it in redux
      const whellExampleKeys = Object.keys(data.wheelValues[0]);
      const expectedKeys = ['id', 'properties', 'title'];
      const keys = whellExampleKeys.filter(el => expectedKeys.includes(el));
      generateInfo = keys.length !== expectedKeys.length;
    } else {
      generateInfo = true;
    }

    if (generateInfo) {
      let newWhell = KvellWheelCategories.map((wheelP, wheelIndex) => {
        let property = {
          title: wheelP.title,
          id: wheelIndex,
          properties: [],
        };
        property.properties = wheelP.properties.map((subP, subIndex) => {
          return {
            id: subIndex,
            title: subP,
            value: 0,
          };
        });
        return property;
      });

      newData = {...newData, wheelValues: newWhell};
    }
  }
  data.isLoading = false;
  return {
    type: ACTIONS.SET_USER_BASIC_DATA,
    data: {...data, ...newData},
  };
};

export const disableUserQuote = () => {
  return {type: ACTIONS.DISABLE_SHOW_QUOTE};
};

export const setUserCompletedActivities = data => {
  return {type: ACTIONS.SET_USER_COMPLETED_ACTIVITIES, data};
};

export const setUserMood = data => {
  return {type: ACTIONS.SET_USER_MOOD, data};
};
export const setDailyQuote = data => {
  return {type: ACTIONS.SET_DAILY_QUOTE, data};
};

export const setUserStories = data => {
  return {type: ACTIONS.SET_USER_STORIES, data};
};
export const setProgressRange = data => {
  return {type: ACTIONS.SET_PROGRESS_RANGE, data};
};
export const setIsLoading = data => {
  return {type: ACTIONS.SET_IS_LOADING, data};
};
