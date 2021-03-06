import {useDispatch, useSelector} from 'react-redux';
import {setUser, setUserId} from '_store/actions/userActions';
import Store from '_utils/helpers/store';

import {locallyStoredUserVariables} from '_utils/constans/Constants';

export const useUser = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const userStories = useSelector(state => state.user.userStories);
  const userInfo = useSelector(state => state.user.userInfo);

  const logIn = async email => {
    dispatch(setUserId(1));
    await Store.set(locallyStoredUserVariables.USER_STORED_EMAIL, email || '');
    dispatch(setUser({email}));
  };

  const setInvoiceId = async id => {
    await Store.set(locallyStoredUserVariables.INVOICE_ID, id || '');
  };

  const actionsUser = {logIn, setInvoiceId};
  return {
    userInfo,
    userStories,
    user,
    actionsUser,
    isUserLoggedIn: user?.userId || '',
  };
};
