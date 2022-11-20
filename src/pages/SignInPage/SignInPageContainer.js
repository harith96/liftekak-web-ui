import { sendPasswordResetEmail, showNotification, signIn, signUp } from 'actions';
import { listenForAuthStateChanged, signOut } from 'common/auth';
import { NotificationType, SignInProvider } from 'enums';
import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { APP_ROUTES } from 'util/constants';

import * as i18n from '_i18n';
import SignInPageComponent from './components/SignInPageComponent';
import { SignInPageContextProvider } from './SignInPageContext';

function SignInPageContainer() {
  const dispatch = useDispatch();
  const history = useHistory();
  const isSigningIn = useSelector((state) => state.signIn.fetching);
  const isSigningUp = useSelector((state) => state.signUp.fetching);

  useEffect(() => {
    let unsubscribe;
    listenForAuthStateChanged((user) => {
      if (user.emailVerified) history.push(APP_ROUTES.RIDES_LIST);
      else {
        dispatch(
          showNotification(
            i18n.t('liftEkak.user.success.message'),
            i18n.t('liftEkak.user.emailVerification.success.description'),
            NotificationType.SUCCESS
          )
        );

        signOut();
      }
    })
      .then((unsubFunction) => {
        unsubscribe = unsubFunction;
      })
      .catch((error) => console.error(error));

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [history, dispatch]);

  const onSignInWithEmailCustom = useCallback(
    ({ email, password, rememberMe }) =>
      dispatch(signIn(SignInProvider.EMAIL_PASSWORD, { email, password, rememberMe })),
    [dispatch]
  );

  const onSignUpWithEmailCustom = useCallback(({ email, password }) => dispatch(signUp(email, password)), [dispatch]);

  const onSignInWithGoogle = useCallback(() => dispatch(signIn(SignInProvider.GOOGLE)), [dispatch]);
  const onForgotPassword = useCallback((email) => dispatch(sendPasswordResetEmail(email)), [dispatch]);

  return (
    <SignInPageContextProvider
      value={{
        onSignInWithEmailCustom,
        onForgotPassword,
        onSignInWithGoogle,
        isSigningIn,
        isSigningUp,
        onSignUpWithEmailCustom,
      }}
    >
      <SignInPageComponent />
    </SignInPageContextProvider>
  );
}

export default SignInPageContainer;
