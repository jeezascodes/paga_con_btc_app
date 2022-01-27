import {LogBox} from 'react-native';
import {
  errorMessages,
  locallyStoredUserVariables,
  RouteNames,
} from '_utils/constans/Constants';
import {useUser} from './useUser';
import Store from '_utils/helpers/store';
import dateTimeHelper from '_utils/helpers/dateTimeHelper';
import {
  saveCheckListOptions,
  saveMoodDiary,
  updateField,
} from '_data/APIInterface';
import {useDispatch} from 'react-redux';
import {
  setUserCompletedActivities,
  setUserMood,
} from '_store/actions/userActions';

export const useTests = navigation => {
  const {actionsUser, user} = useUser();
  const userTest = global.testUser;
  const userTestCompleted = global.testUserCompleted;
  const numberTest = global.testNumber;
  const passwordTest = global.testPassword;
  const dispatch = useDispatch();

  // List of Actions
  if (global.testmode) {
    LogBox.ignoreAllLogs(true);
  }
  const registerPhone = phone => {
    navigation.navigate(RouteNames.VERIFY_PHONE, {
      phoneNumber: phone,
    });
  };
  const clearMoodChecklistWheel = async () => {
    //Clear values
    actionsUser.saveWheelValues('null');

    const today = dateTimeHelper.ToRequestDateString();
    const dataChecklist = {
      userId: user.userId,
      date: today,
      checklist: null,
    };
    await saveCheckListOptions(dataChecklist).then(() => {
      setUserCompletedActivities(null);
    });

    // Save user mood

    const dataMood = {
      userId: user.userId,
      date: today,
      mood: null,
    };
    await saveMoodDiary(dataMood).then(() => {
      dispatch(setUserMood(null));
    });
  };

  const verifyPhoneTest = async (
    code,
    setErrorMessage,
    setError,
    setLoading,
    number,
  ) => {
    if (code === passwordTest) {
      if (number === numberTest) {
        await Store.set(
          locallyStoredUserVariables.KVELL_USER_ID_KEY,
          userTestCompleted,
        );
      } else {
        const data = [
          {
            Key: 'first_name',
            Value: null,
          },
        ];
        await updateField(data, userTest);
        await Store.set(locallyStoredUserVariables.KVELL_USER_ID_KEY, userTest);
      }
      await actionsUser.validateIfUserAlreadyLoggedIn();
      clearMoodChecklistWheel();
    } else {
      setErrorMessage(errorMessages.INVALID_CODE);
      setLoading(true);
      setError(true);
    }
  };
  const actionsTests = {
    registerPhone,
    verifyPhoneTest,
    clearMoodChecklistWheel,
  };
  return {actionsTests};
};
