import { saveUserDetails } from 'actions';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

  return (
    <UserDetailsPageContextProvider value={{ onSubmit, isSaving, user }}>
      <UserDetailsPageComponent />
    </UserDetailsPageContextProvider>
  );
}

export default UserDetailsPageContainer;
