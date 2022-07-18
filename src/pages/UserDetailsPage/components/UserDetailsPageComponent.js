import React from 'react';
import UserDetailsForm from './UserDetailsForm';
import './styles/index.scss';

function UserDetailsPageComponent() {
  return (
    <div className="page-container">
      <h1>User Details</h1>
      <UserDetailsForm />
    </div>
  );
}

export default UserDetailsPageComponent;
