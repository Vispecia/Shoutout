import React from 'react';
import Sidebar from './Sidebar';
import ProfileInfo from './ProfileInfo';
import '../css/Profile.css';
import Widgets from './Widgets';

const Profile = ()=>{
    return (
        <div className="profile">
            <Sidebar/>
            <ProfileInfo/>
            <Widgets/>            
        </div>
    );
}

export default Profile