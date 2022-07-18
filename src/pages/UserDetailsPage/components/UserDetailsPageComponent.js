import React, { useContext } from 'react';
import UserDetailsForm from './UserDetailsForm';
import './styles/index.scss';
import UserDetailsPageContext from '../UserDetailsPageContext';

function UserDetailsPageComponent() {
  const { user } = useContext(UserDetailsPageContext);

  return (
    <div className="page-container">
      <h1>User Details</h1>
      {!user && <p>Enter user details to complete registration.</p>}
      <UserDetailsForm />
    </div>
  );
}

export default UserDetailsPageComponent;
