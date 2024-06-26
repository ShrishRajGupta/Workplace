import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import {AppBar,Box,Toolbar,IconButton,Typography,InputBase,Badge,Menu,MenuItem,} 
from "@mui/material";
import {Logout as LogoutIcon, Menu as MenuIcon,Search as SearchIcon,AccountCircle,Mail as MailIcon,Notifications as NotificationsIcon,MoreVert as MoreIcon,Home as HomeIcon,PictureAsPdf as PictureAsPdfIcon,} 
from "@mui/icons-material";

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/navbar.css";
import LogoutFunc from "./logout"
import "../css/SearchResult.css";
import "../css/SearchResultsList.css";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({ padding: theme.spacing(0, 2), height: "100%", position: "absolute", pointerEvents: "none", display: "flex", alignItems: "center", justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const [input, setInput] = useState("");
  const [results,setResults] = useState([]);
  const fetchData = async (value) => {
    try {
      if(value !== ""){
        const response = await axios.get(`/search/${value}`, null, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          params: {
            jobTitle: value,
          },
        });
        
        if (response.status === 200) {
          console.log(response.data);
          setResults(response.data.user);
        } 
    } else {
      console.log(results);
      setResults([]);
    }
    
  }catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
   const SearchResultsList = ({results})=> {
    
    return (
    <div className="searchBar">
    <div className="dropdown-content"> 
        {
        results?.map((result) => {
          const handleClick = async (e)=>{
                navigate(`/user/profile/${result._id}`);
                setInput("");
                setResults([]);
           }
          return (
            <div className="search-result" onClick={handleClick}><h5 style={{color:"black"}}>{result.username}</h5></div>
          )
        }
    )}
    </div>
    </div>
  )};


  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            WorkPlace
          </Typography>
          <div className="my-nav">
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={input}
                onChange={(e) => handleChange(e.target.value)}

              />
            </Search>
            {
              <SearchResultsList results={results} />
            }
          
          </div>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <p className="home" onClick={() => [navigate("/home")]}>
              <HomeIcon />
            </p>

            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              {/* Resume Bulider  */}
              <p className="home" title="Resume Bulider" onClick={() => [navigate("/resume")]}>
                <PictureAsPdfIcon />
              </p>
              

              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 10 new notifications"
              color="inherit"
            >
              <Badge badgeContent={5} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" aria-label="show more" aria-controls={mobileMenuId} aria-haspopup="true" onClick={handleMobileMenuOpen} color="inherit">
              <MoreIcon />
            </IconButton>
          </Box>

          {/* logout button */}
          <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              onClick={() => LogoutFunc()}
            >
              <button title="Logout" className="home">
                <LogoutIcon/>
              </button>              

              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>

          
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
