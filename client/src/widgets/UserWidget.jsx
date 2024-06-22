
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import axios from "axios";
import "../css/widget.css";
const home = "http://localhost:3001";

const UserWidget = () => {
  const [user, setUser] = useState([]);
  const { palette } = useTheme();
  const navigate = useNavigate();

  // const dark = palette.neutral.dark;
  // const medium = palette.neutral.medium;
  // const main = palette.neutral.main;

  const getUser = async () => {
    try {
      let response = await axios.get("/user/profile");
      if (response.status === 200) {
        console.log(response.data.user);
        setUser(response.data.user);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="widgetdiv" >
      <div className="card">
        <img className="card-img-top"  style={{ }}
          src={`${user.photo}`}
          alt="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg"/>
        <div className="card-body">
          <span onClick={() => {
                  navigate(`/user/profile/${user._id}`);
                }} style={{cursor: "pointer"}}><h5>{user.username}</h5></span>
          <p className="card-text">Software Engineer with 5 years of experience in full-stack development.</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Location: San Francisco</li>
          <li className="list-group-item">Education: MIT</li>
          <li className="list-group-item">Interests: Hiking, Reading, Traveling</li>
        </ul>
        <div className="card-body">
          <a href="#" className="card-link">LinkedIn</a>
          <a href="#" className="card-link">GitHub</a>
        </div>
      </div>
    

      {/* <userimage />
              <p
                onClick={() => {
                  navigate(`/user/profile/${user._id}`);
                }}
              >
                {user.username}
              </p> */}
    </div>
  );
};

export default UserWidget;
