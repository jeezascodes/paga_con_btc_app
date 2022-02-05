import {ACTIONS} from '../actions/userActions';

const initialState = {
  userId: '',
  isLoading: true,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_USER_ID: {
      return {...state, userId: action.data};
    }
    case ACTIONS.SET_USER_BASIC_DATA: {
      return {...state, ...action.data};
    }
    default:
      return state;
  }
};
