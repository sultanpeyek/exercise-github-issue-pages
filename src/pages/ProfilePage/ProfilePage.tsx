import React from 'react';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  return (
    <div>
      Profile Page{' '}
      <small>
        <Link to={'/'}>(Back to home)</Link>
      </small>
    </div>
  );
};

export default ProfilePage;
