import { saveUserDetails } from 'actions';
import { getAuthFullName, getAuthProfilePictureURL } from 'common/auth';
import _ from 'lodash';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { APP_ROUTES } from 'util/constants';
import getFirstAndLastNamesFromFullName from 'util/getFirstAndLastNamesFromFullName';
import UserDetailsPageComponent from './components/UserDetailsPageComponent';
import { UserDetailsPageContextProvider } from './UserDetailsPageContext';

function UserDetailsPageContainer() {
  const dispatch = useDispatch();
  const history = useHistory();
  const isSaving = useSelector((state) => state.saveUserDetails.fetching);
  const user = useSelector((state) => state.user.data);

  const onSubmit = useCallback(
    (userDetails) => {
      dispatch(
        saveUserDetails(userDetails, _.isEmpty(user?.firstName) ? () => history.push(APP_ROUTES.RIDES_LIST) : null)
      );
    },
    [dispatch, user]
  );

  const authProfilePictureURL = getAuthProfilePictureURL();
  const authFullName = getAuthFullName();

  const { firstName, lastName } = getFirstAndLastNamesFromFullName(authFullName);

  return (
    <UserDetailsPageContextProvider
      value={{
        onSubmit,
        isSaving,
        user: {
          ...user,
          firstName: user?.firstName || firstName || '',
          lastName: user?.lastName || lastName || '',
          userPhoto: user?.userPhoto || authProfilePictureURL,
        },
      }}
    >
      <UserDetailsPageComponent />
    </UserDetailsPageContextProvider>
  );
}

export default UserDetailsPageContainer;
