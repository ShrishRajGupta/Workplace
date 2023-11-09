import React from 'react';
import {Profile,FriendsList} from './profile';
import "../css/userdashboard.css";

const Dashboard = () => {
  return (
    <div style={{display: "flex"}}>
      <div className="dashboard">
        <Profile />
      </div>
      <div style={{marginTop:"25px"}}>
      <FriendsList />
      </div>
    
    </div>
  );
};

export default Dashboard;