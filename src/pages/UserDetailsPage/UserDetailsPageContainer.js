import { saveUserDetails } from 'actions';
import { getAuthFullName, getAuthProfilePictureURL } from 'common/auth';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getFirstAndLastNamesFromFullName from 'util/getFirstAndLastNamesFromFullName';
import UserDetailsPageComponent from './components/UserDetailsPageComponent';
import { UserDetailsPageContextProvider } from './UserDetailsPageContext';

function UserDetailsPageContainer() {
  const dispatch = useDispatch();
  const isSaving = useSelector((state) => state.saveUserDetails.fetching);
  const user = useSelector((state) => state.user.data);

  const onSubmit = useCallback(
    (userDetails) => {
      dispatch(saveUserDetails(userDetails));
    },
    [dispatch]
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
