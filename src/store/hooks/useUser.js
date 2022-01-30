import {} from '_data/APIInterface';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '_store/actions/userActions';

import {} from '_utils/constans/Constants';

export const useUser = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const userStories = useSelector(state => state.user.userStories);
  const userInfo = useSelector(state => state.user.userInfo);

  const logIn = async () => {
    dispatch(setUser(1));
  };

  const actionsUser = {logIn};
  return {
    userInfo,
    userStories,
    user,
    actionsUser,
    isUserLoggedIn: user?.userId || '',
  };
};
