import {ACTIONS} from '../actions/userActions';
import cloneDeep from 'lodash/cloneDeep';

const initialState = {
  userId: '',
  userName: '',
  userAvatar: '',
  userChecklistOptions: null,
  userCompletedActivities: null,
  userMood: null,
  showQuote: true,
  wheelValues: [],
  userStories: [],
  userInfo: {},
  userProgressRange: [],
  dailyQuote: {
    quotes: '',
    author: '',
  },
  isLoading: true,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_USER_ID: {
      return {...state, userId: action.data};
    }
    case ACTIONS.SET_USER_BASIC_DATA: {
      let newData = cloneDeep(action.data);
      return {...state, ...newData};
    }
    case ACTIONS.DISABLE_SHOW_QUOTE: {
      return {...state, showQuote: false};
    }
    case ACTIONS.SET_USER_MOOD: {
      return {...state, userMood: action.data};
    }
    case ACTIONS.SET_USER_COMPLETED_ACTIVITIES: {
      return {...state, userCompletedActivities: action.data};
    }
    case ACTIONS.SET_USER_STORIES: {
      return {...state, userStories: [...action.data]};
    }
    case ACTIONS.SET_DAILY_QUOTE: {
      return {...state, dailyQuote: action.data};
    }
    case ACTIONS.SET_PROGRESS_RANGE: {
      return {...state, userProgressRange: action.data};
    }
    case ACTIONS.SET_IS_LOADING: {
      return {...state, isLoading: action.data};
    }
    default:
      return state;
  }
};
