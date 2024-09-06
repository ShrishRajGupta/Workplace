import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
    Token,
} from "@mui/icons-material";

import {Box, Typography, Divider } from "@mui/material";
import userimage from "../components/userimage";
import FlexBetween from "../components/FlexBetween";
import widgetwrapper from "../components/widgetwrapper";

import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import axios from "axios";
import "../css/widget.css";
import { blue } from "@mui/material/colors";
const home = "http://localhost:3001";

const UserWidget = () => {
  const [user, setUser] = useState([]);
  const { palette } = useTheme();
  const navigate = useNavigate();

  // const dark = palette.neutral.dark;
  // const medium = palette.neutral.medium;
  // const main = palette.neutral.main;

    const getUser = async( idOfUser ) => {
        const response = await fetch(`/user/profile/${idOfUser}`, { 
            method: "GET",
            headers: {Authorization: `Bearer ${Token}`},
        });

        const data = await response.json();
        setUser(data.user);
        console.log("NIGGA",data)
        // console.log(data.user.photo)
    };

  useEffect(() => {
    const idOfUser = localStorage.getItem('userId');
    getUser(idOfUser);
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
                }} style={{cursor: "pointer"}}><h3><u>{user.username}</u></h3></span><br />
          <p className="card-text">{user.about ? user.about : "Write something about yourself..."}</p>
        </div>
        
        <div className="card-body">
        <i class="fab fa-linkedin"></i> <a href="" className="card-link">LinkedIn</a>
        <i class="fab fa-github"></i> <a href="" className="card-link">GitHub</a>
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
