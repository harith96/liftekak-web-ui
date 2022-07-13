let authenticator = null;

const cognitoDefaultUserRole = process.env.REACT_APP_COGNITO_DEFAULT_USER_ROLE;

export const setAuth = (auth) => {
  authenticator = auth;
};

export const getAuth = () => {
  return authenticator;
};

export const getIdToken = async () => {
  const currentUser = authenticator && (await authenticator.currentAuthenticatedUser());
  return currentUser.signInUserSession.idToken;
};

export const getCurrentUserRole = async () => {
  const token = await getIdToken();
  const groups = token && token.payload['cognito:groups'];
  if (groups && !(groups.length === 1 && groups[0] === cognitoDefaultUserRole)) {
    return groups.filter((role) => role !== cognitoDefaultUserRole)[0];
  }
  return null;
};
