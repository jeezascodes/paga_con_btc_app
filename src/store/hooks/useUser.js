import {
  getUserByFirebaseID,
  getGoogleInfo,
  userRegistration,
  updateDiaryEntry,
  getUserProgressByDate,
  saveMoodDiary,
  getUser,
  saveCheckListOptions,
  updateField,
  saveDiaryEntry,
  getDailyQuoteById,
  getDailyQuoteByUser,
  getUserProgressByRangeDate,
  userLogin,
  saveWheelValuesTrack,
} from '_data/APIInterface';
import {
  setUser,
  disableUserQuote,
  setUserBasicData,
  setUserCompletedActivities,
  setUserMood,
  setUserStories,
  setDailyQuote,
  setProgressRange,
  setIsLoading,
} from '_store/actions/userActions';
import {useDispatch, useSelector} from 'react-redux';
import {useCallback} from 'react';
import {GoogleSignin} from '@react-native-community/google-signin';
import Store from '_utils/helpers/store';
import {Platform} from 'react-native';
import Log from '_utils/helpers/errorHandler';
import {serializeToUpdateField} from '_utils/helpers/arrayFunctions';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/auth';
import {
  OsTypes,
  statusCodes,
  locallyStoredUserVariables,
  registrarionProviders,
  LoginTypes,
} from '_utils/constans/Constants';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {firebaseConfig, googleConfig} from '_utils/constans/Configs';
import DateTimeHelper from '_utils/helpers/dateTimeHelper';
import RaygunClient from 'raygun4reactnative';

const {
  ToUtcDate,
  ToRequestDateString,
  FirstDayMonth,
  ToWeekDay,
} = DateTimeHelper;
export const useUser = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const userStories = useSelector(state => state.user.userStories);
  const userInfo = useSelector(state => state.user.userInfo);
  const userProgressRange = useSelector(state => state.user.userProgressRange);
  // List of Actions
  // validate userId against API, receive userID info and dispatch any
  // necessary information, otherwise delete that id from store
  const signInWithPhoneNumber = phoneNumber => {
    return new Promise((resolve, reject) => {
      auth()
        .signInWithPhoneNumber(phoneNumber, true)
        .then(confirmation => {
          resolve(confirmation);
        })
        .catch(error => {
          Log.Error('Error', error);
          reject(error);
        });
    });
  };
  const registerRaygun = info => {
    const userRaygun = {
      identifier: info?.email,
      isAnonymous: false,
      email: info?.email,
      firstName: info?.first_name,
      fullName: info?.last_name,
      uuid: info?.id,
    };
    RaygunClient.setUser(userRaygun);
  };

  const GetUserProgressByDate = date => {
    getUserProgressByDate(user.userId, date)
      .then(info => {
        if (info === statusCodes.CONTENT_EMPTY) {
          dispatch(setUserMood(null));
          dispatch(setUserCompletedActivities(null));
        } else {
          dispatch(setUserMood(info.mood));
          dispatch(setUserCompletedActivities(info.checklistData));
        }
      })
      .catch(error => {
        Log.Error('Error', error);
      });
  };
  const GetUserProgressByRangeDate = async date => {
    const data = {
      begin_date: FirstDayMonth(date),
      end_date: ToRequestDateString(date),
      id: user.userId,
    };
    try {
      const info = await getUserProgressByRangeDate(data);
      if (info === statusCodes.CONTENT_EMPTY) {
        dispatch(setProgressRange([]));
      } else {
        dispatch(setProgressRange(info));
        return info;
      }
    } catch (error) {
      Log.Error('Error', error);
    }
  };

  const GetUserProgressByGenericRangeDate = async date => {
    const data = {
      begin_date: date.begin_date,
      end_date: date.end_date,
      id: user.userId,
    };
    try {
      const info = await getUserProgressByRangeDate(data);
      if (info === statusCodes.CONTENT_EMPTY) {
        dispatch(setProgressRange([]));
      } else {
        dispatch(setProgressRange(info));
        return info;
      }
    } catch (error) {
      Log.Error('Error', error);
    }
  };

  const SetUserInformation = async data => {
    const apiUser = data;
    const userData = {};
    if (apiUser.first_name !== '') {
      userData.userName = apiUser.first_name;
    }

    userData.userInfo = {
      ...apiUser,
    };
    userData.userChecklistOptions = apiUser.dailyChecklistOptions;
    userData.wheelValues = apiUser.wheelValues;
    dispatch(setUser(apiUser.id));
    dispatch(setUserBasicData(userData));
    registerRaygun(apiUser);
  };

  const getUserStories = useCallback(async date => {
    let userStories = await getUserProgressByDate(user.userId, date);
    if (userStories.diaryData) {
      userStories = userStories.diaryData.map(story => {
        return {
          ...story,
          date: DateTimeHelper.ToLocalDate(story.created_date_utc),
          title: story.title || 'Free hand',
        };
      });
      dispatch(setUserStories(userStories));
    } else {
      dispatch(setUserStories([]));
    }
  }, []);

  const saveUserStory = useCallback(async (newStory, date) => {
    let data = {
      ...newStory,
      date: DateTimeHelper.ToRequestDateString(date),
      userId: user.userId,
    };
    saveDiaryEntry(data);
  }, []);

  const updateUserStory = useCallback(async newStory => {
    let data = {
      userId: user.userId,
      id: newStory.id,
      date: DateTimeHelper.ToRequestDateString(),
      title: newStory.title,
      entryText: newStory.entryText,
      song: newStory.song ? newStory.song : null,
    };
    updateDiaryEntry(data);
  }, []);

  // Configure Google, And whatever is necessary to apple and phone in future
  const initializeFirebaseConfig = () => {
    if (Platform.OS === OsTypes.ANDROID) {
      firebase.initializeApp(firebaseConfig);
    }
    GoogleSignin.configure(googleConfig);
  };

  const validateIfUserAlreadyLoggedIn = async () => {
    const kvellId = await Store.get(
      locallyStoredUserVariables.KVELL_USER_ID_KEY,
    );
    const firebaseId = await Store.get(locallyStoredUserVariables.USER_ID);

    if (kvellId !== null) {
      let userData = {};
      try {
        userData = await getUser(kvellId);
      } catch (error) {
        Log.Error(error);
      }

      await SetUserInformation(userData);

      return;
    } else if (firebaseId !== null) {
      const idUser = await Store.get(locallyStoredUserVariables.USER_ID);
      let userData = {};
      try {
        userData = await getUserByFirebaseID(idUser);
      } catch (error) {
        Log.Error(error);
      }
      await SetUserInformation(userData);
      return;
    } else {
      dispatch(setIsLoading(false));
    }
  };

  const InitializeUser = async () => {
    try {
      await validateIfUserAlreadyLoggedIn();
      initializeFirebaseConfig();
    } catch (error) {
      Log.Error(JSON.stringify(error));
      dispatch(setIsLoading(false));
    }
  };

  const RegisterUserGoogle = useCallback(async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const tokens = await GoogleSignin.getTokens();
      const extraInfo = await getGoogleInfo(tokens.accessToken);

      let phoneNumber = Math.random().toString();
      if (extraInfo.phoneNumbers) {
        const realPhone = extraInfo.phoneNumbers.find(
          el => el.metadata.primary && el.formattedType === 'Mobile',
        );
        phoneNumber = realPhone ? realPhone.canonicalForm : phoneNumber;
      }

      let email = userInfo.user.email;
      if (extraInfo.emailAddresses) {
        const realEmail = extraInfo.emailAddresses.find(
          el => el.metadata.primary,
        );
        email = realEmail ? realEmail.value.toLowerCase() : email;
      }

      let name = userInfo.user.first_name;
      let last_name = userInfo.user.last_name;
      if (extraInfo.names) {
        const realName = extraInfo.names.find(el => el.metadata.primary);
        name = realName ? realName.displayName : name;
      }

      let data = {
        firebase_user_id: userInfo.user.firebase_user_id,
        firebase_phone: phoneNumber,
        device_type: Platform.OS,
      };
      const response = await userRegistration(data);
      if (
        'response' in response &&
        (response.response === 'success' ||
          response.response === 'already_exists')
      ) {
        await Store.set(
          locallyStoredUserVariables.USER_ID,
          data.firebase_user_id || '',
        );
        dispatch(setUser(data.firebase_user_id));
      } else {
        Log.Error(JSON.stringify(response), response?.status);
      }
      // this request generates email confirmation (unnecesary since this is an email provided by google)
      // we can store the name of the user on the API too, but i don't know if its
      // necesary since we have a form for this in other part of the interface
    } catch (error) {
      Log.Error(error);
    }
  }, [dispatch]);

  const continueWithLogin = async data => {
    dispatch(setIsLoading(true));
    const loginData = {
      provider: data.provider,
      firebase_user_id: data.firebase_user_id,
      token: data.id_token,
    };

    const saveUserData = async () => {
      Store.set(
        locallyStoredUserVariables.USER_ID,
        data.firebase_user_id || '',
      );
    };

    try {
      const login = await userLogin(loginData);
      if (login.user_is_found) {
        await Store.set(
          locallyStoredUserVariables.ACCESS_TOKEN,
          login.access_token,
        );
        await Store.set(
          locallyStoredUserVariables.REFRESH_TOKEN,
          login.refresh_token,
        );
        await Store.set(
          locallyStoredUserVariables.KVELL_USER_ID_KEY,
          login.user.id.toString() || '',
        );
        SetUserInformation(login.user);
        await saveUserData();
      } else {
        const registrationData = {
          provider: data.provider,
          firebase_user_id: data.firebase_user_id,
          device_type: OsTypes.IOS,
        };
        if (data.firebase_phone) {
          registrationData.firebase_phone = data.firebase_phone;
        }
        try {
          const response = await userRegistration(registrationData);
          await saveUserData();
          await Store.set(
            locallyStoredUserVariables.KVELL_USER_ID_KEY,
            response.user.id.toString() || '',
          );
          await Store.set(
            locallyStoredUserVariables.ACCESS_TOKEN,
            response.access_token,
          );
          await validateIfUserAlreadyLoggedIn();
        } catch (error) {
          Log.Error(error.message, error.details, error.code);
        }
      }
    } catch (err) {
      Log.Error(err, err.stacktrace, err.statuscode);
    }
    dispatch(setIsLoading(false));
  };

  const RegisterUserPhone = useCallback(
    async phoneNumber => {
      let data = {};
      firebase.auth().onAuthStateChanged(async user => {
        if (user) {
          data.firebase_user_id = user.uid;
          data.firebase_phone = phoneNumber;
          data.device_type = Platform.OS;
          const idTokenResult = await firebase
            .auth()
            .currentUser.getIdTokenResult();
          data.id_token = idTokenResult.token;
          data.provider = registrarionProviders.FIREBASE;
          SetTypeLogin(LoginTypes.PHONE);

          await continueWithLogin(data);
        }
      });
    },
    [dispatch],
  );

  const LogoutUser = useCallback(async () => {
    try {
      await auth().signOut();
      await Store.remove(locallyStoredUserVariables.USER_ID);
      await Store.remove(locallyStoredUserVariables.ACCESS_TOKEN);
      await Store.remove(locallyStoredUserVariables.REFRESH_TOKEN);
      await Store.remove(locallyStoredUserVariables.USER_COMPLETED_ACTIVITIES);
      await Store.remove(locallyStoredUserVariables.KVELL_USER_ID_KEY);
      dispatch(setUser(''));
    } catch (error) {
      Log.Info('Message', JSON.stringify(error));
    }
  }, [dispatch]);

  const DisableQuote = useCallback(() => {
    try {
      dispatch(disableUserQuote());
    } catch (error) {
      Log('Message', JSON.stringify(error));
    }
  }, [dispatch]);

  const saveUserProgress = async (completedTasks = [], userMood = null) => {
    const today = DateTimeHelper.ToRequestDateString();
    // Save checkList data
    const checklistData = completedTasks
      .filter(item => item.showOnList)
      .map(item => {
        return {
          title: item.label,
          is_checked: item.done,
        };
      });
    const dataChecklist = {
      userId: user.userId,
      date: today,
      checklist: checklistData,
    };

    await saveCheckListOptions(dataChecklist).then(() => {
      dispatch(setUserCompletedActivities(checklistData));
    });

    //Save daily check list options
    const dailyOptions = completedTasks.map(item => {
      return {
        title: item.label,
        show_on_list: item.showOnList,
      };
    });
    const data = [
      {
        Key: 'DailyChecklistOptions',
        Value: serializeToUpdateField(dailyOptions),
      },
    ];
    updateField(data, user.userId);
    // Save user mood
    if (userMood !== null && userMood !== '') {
      const dataMood = {
        userId: user.userId,
        date: today,
        mood: userMood,
      };
      await saveMoodDiary(dataMood)
        .then(() => {
          dispatch(setUserMood(userMood));
        })
        .catch(error => {
          Log.Info(error);
        });
    }
  };
  const updateGenericField = async (Key, Value) => {
    const data = [
      {
        Key,
        Value,
      },
    ];
    await updateField(data, user.userId);
  };

  const saveUserOptions = async activities => {
    try {
      const dailyOptions = activities.map(item => {
        return {
          title: item.label,
          show_on_list: item?.showOnList,
        };
      });
      const data = [
        {
          Key: 'DailyChecklistOptions',
          Value: serializeToUpdateField(dailyOptions),
        },
      ];
      await updateField(data, user.userId);
      await validateIfUserAlreadyLoggedIn();

      // Update data in Daily check list options pending
    } catch (error) {
      Log.Info(error);
    }
  };

  const saveWheelValues = async wheelData => {
    try {
      dispatch(
        setUserBasicData({
          wheelValues: wheelData,
          userChecklistOptions: user.userChecklistOptions,
        }),
      );
      const data = [
        {
          Key: 'WheelValues',
          Value: serializeToUpdateField(wheelData),
        },
      ];

      await updateField(data, user.userId);
      await saveWheelValuesTrack({wheelValues: wheelData});
    } catch (error) {
      Log.Error('Message', error);
    }
  };
  const signInWithApple = async () => {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    dispatch(setIsLoading(true));
    const {identityToken, nonce} = appleAuthRequestResponse;

    let userCredential;
    let idTokenResult;
    if (identityToken) {
      const appleCredential = firebase.auth.AppleAuthProvider.credential(
        identityToken,
        nonce,
      );
      userCredential = await firebase
        .auth()
        .signInWithCredential(appleCredential);
      idTokenResult = await firebase.auth().currentUser.getIdTokenResult();
    }
    // error handling should be added here in case of no identityToken but we'll define that in the next bakcend meeting

    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );

    let data = {
      firebase_user_id: userCredential?.user?.uid,
      device_type: Platform.OS,
      id_token: idTokenResult.token,
      provider: registrarionProviders.FIREBASE,
    };
    if (credentialState === appleAuth.State.AUTHORIZED) {
      SetTypeLogin(LoginTypes.APPLE);
      await continueWithLogin(data);
    }
  };

  const GetUserDailyQuote = () => {
    try {
      const dateInfo = user?.userInfo?.daily_quote_updated_date_utc;
      const idDailyQuote = user?.userInfo?.daily_quote_id;
      const sameDate = ToUtcDate() === ToRequestDateString(dateInfo);

      if (sameDate && idDailyQuote) {
        getDailyQuoteById(idDailyQuote).then(res => {
          dispatch(setDailyQuote(res));
        });
      } else {
        getDailyQuoteByUser(user.userId).then(res => {
          dispatch(setDailyQuote(res));
        });
      }
    } catch (error) {
      Log.Info(error);
    }
  };

  //Set type login
  const SetTypeLogin = async type => {
    await Store.set(locallyStoredUserVariables.TYPE_LOGIN, type);
  };

  const actionsUser = {
    GetUserDailyQuote,
    SetUserInformation,
    InitializeUser,
    RegisterUserGoogle,
    RegisterUserPhone,
    LogoutUser,
    DisableQuote,
    saveUserProgress,
    saveUserOptions,
    signInWithPhoneNumber,
    saveWheelValues,
    getUserStories,
    saveUserStory,
    updateUserStory,
    signInWithApple,
    GetUserProgressByDate,
    GetUserProgressByRangeDate,
    GetUserProgressByGenericRangeDate,
    validateIfUserAlreadyLoggedIn,
    updateGenericField,
  };
  return {
    userInfo,
    userProgressRange,
    userStories,
    user,
    actionsUser,
    isUserLoggedIn: user?.userId || '',
  };
};
