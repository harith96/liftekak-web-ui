import parseTemplates from 'json-templates';

const loginFailedTemplate = parseTemplates('{{method}} Login Failed! Code: {{errorCode}} Message: {{errorMessage}}');
const signUpFailedTemplate = parseTemplates('Sign Up Failed! Code: {{errorCode}} Message: {{errorMessage}}');
const saveUserFailedTemplate = parseTemplates(
  'Save User {{uid}} Failed! Code: {{errorCode}} Message: {{errorMessage}}'
);
const userSuccessfullyLoggedIn = parseTemplates('{{Method}} Login Successful! User: {{name}} ID: {{userId}}');

export { loginFailedTemplate, signUpFailedTemplate, saveUserFailedTemplate, userSuccessfullyLoggedIn };
