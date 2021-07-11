import React from 'react';
import './userprofile.scss';
import userIMG from './../../assets/user.png';

const UserProfile = props => {
  const { currentUser } = props;
  const { displayName } = currentUser;

  return (
    <div className="userProfile">
      <ul>
        <li>
          <div className="img">
            <img src={userIMG} />
          </div>
        </li>
        <li>
          <span className="displayName">
            {displayName && displayName}
          </span>
        </li>
      </ul>
    </div>
  );
}

export default UserProfile;