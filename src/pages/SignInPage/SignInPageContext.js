import React from 'react';

const SignInPageContext = React.createContext({
  signInFormRef: '',
  onSignInWithEmailCustom: () => {},
  onSignUpWithEmailCustom: () => {},
  onSignInWithGoogle: () => {},
  onForgotPassword: () => {},
  isSigningIn: false,
});

export const SignInPageContextProvider = SignInPageContext.Provider;

export default SignInPageContext;
