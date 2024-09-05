import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
    Token,
} from "@mui/icons-material";

import {Box, Typography, Divider, useTheme } from "@mui/material";
import userimage from "../components/userimage";
import FlexBetween from "../components/FlexBetween";
import widgetwrapper from "../components/widgetwrapper";

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import axios from "axios";
import "../css/widget.css";
import { AuthContext } from "../context/AuthContext";
const home = "http://localhost:3001";

const UserWidget = () => {
  const [user, setUser] = useState([]);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const {User} = useContext(AuthContext);

  // const dark = palette.neutral.dark;
  // const medium = palette.neutral.medium;
  // const main = palette.neutral.main;

    const getUser = async() => {
      console.log(User)
        const response = await fetch(`/user/profile/`, { 
            method: "GET",
            headers: {Authorization: `Bearer ${Token}`},
        });

        const data = await response.json();
        setUser(data.user);
    };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(()=>{
    console.log("CHIGGA",user)
  },[user])

  return (
    <div className="widgetdiv" >
      <div className="card">
        <img className="card-img-top"  style={{ }}
          src={`${user.photo}`}
          alt="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg"/>
        <div className="card-body">
          <span onClick={() => {
                  navigate(`/user/profile/${user._id}`);
                }} style={{cursor: "pointer"}}><h3>{user.username}</h3></span>
                <br />
          <i className="card-text">{user?.about}</i>
          <br /><br />
          <b>Education: </b>{(user?.education?.length>0) ? (user?.education[0]?.collegeName) : "N.A."}
        </div>
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
