import React from 'react';
import { useSelector } from 'react-redux';
import ProfileData from './../../components/ProfileData/profiledata';

const mapState = ({user}) => ({
    currentUser: user.currentUser

})

const Profile = ({children}) => {
    const {currentUser}=useSelector(mapState);

    const configUserProfile = {
        currentUser
    }

    return (
      <section className="profile">
        <ProfileData {...configUserProfile}/>
        <div className="menu">
                {children}
            </div>
      </section>
    );
  };
  
  export default Profile;