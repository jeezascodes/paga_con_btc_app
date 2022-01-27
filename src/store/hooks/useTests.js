import {LogBox} from 'react-native';
import {useUser} from './useUser';
import {useDispatch} from 'react-redux';

export const useTests = navigation => {
  const {actionsUser, user} = useUser();
  const userTest = global.testUser;
  const dispatch = useDispatch();

  // List of Actions
  if (global.testmode) {
    LogBox.ignoreAllLogs(true);
  }
  const registerPhone = () => {};
  const clearMoodChecklistWheel = async () => {};
  const verifyPhoneTest = async () => {};

  const actionsTests = {
    registerPhone,
    verifyPhoneTest,
    clearMoodChecklistWheel,
  };
  return {actionsTests};
};
