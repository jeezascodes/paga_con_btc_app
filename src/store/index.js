import {createStore, combineReducers} from 'redux';
import {userReducer} from './reducers/userReducer';
import {wizardReducer} from './reducers/wizardReducer';

export const store = createStore(
  combineReducers({
    user: userReducer,
    wizard: wizardReducer,
  }),
);
