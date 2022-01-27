import {} from '_data/APIInterface';
import {} from '_store/actions/userActions';
import {useDispatch, useSelector} from 'react-redux';
import {useCallback} from 'react';

import {} from '_utils/constans/Constants';

export const useUser = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const userStories = useSelector(state => state.user.userStories);
  const userInfo = useSelector(state => state.user.userInfo);

  const actionsUser = {};
  return {
    userInfo,
    userStories,
    user,
    actionsUser,
    isUserLoggedIn: user?.userId || '',
  };
};
