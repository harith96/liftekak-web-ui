import React from 'react';

const UserDetailsPageContext = React.createContext({
  onSubmit: () => {},
  isSaving: false,
  user: {},
});

export const UserDetailsPageContextProvider = UserDetailsPageContext.Provider;

export default UserDetailsPageContext;
