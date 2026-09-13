import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import { AppBar, Box, Toolbar, IconButton, Typography, InputBase, Badge, Menu, MenuItem } from "@mui/material";
import {
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  AccountCircle,
  Mail as MailIcon,
  Notifications as NotificationsIcon,
  MoreVert as MoreIcon,
  Home as HomeIcon,
  PictureAsPdf as PictureAsPdfIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { searchUsers } from "../../api/users";
import logger from "../../utils/logger";
import "./Navbar.css";

const SEARCH_DEBOUNCE_MS = 300;

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

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const SearchResultsList = ({ results, onSelect }) => (
  <div className="searchBar">
    <div className="dropdown-content">
      {results.map((result) => (
        <div key={result._id} className="search-result" onClick={() => onSelect(result)}>
          <h5 style={{ color: "black" }}>{result.username}</h5>
        </div>
      ))}
    </div>
  </div>
);

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const pendingRequests = user?.friendRequests?.length ?? 0;

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMobileMenuOpen = (event) => setMobileMoreAnchorEl(event.currentTarget);

  const goToProfile = () => {
    handleMenuClose();
    if (user) navigate(`/user/profile/${user._id}`);
  };
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  // Search: debounced request per keystroke, results cleared on selection.
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const debounceRef = useRef();

  useEffect(() => {
    clearTimeout(debounceRef.current);
    const term = input.trim();
    if (!term) {
      setResults([]);
      return undefined;
    }
    let cancelled = false;
    debounceRef.current = setTimeout(() => {
      searchUsers(term)
        .then((users) => !cancelled && setResults(users))
        .catch((error) => logger.error("Search failed:", error));
    }, SEARCH_DEBOUNCE_MS);
    return () => {
      cancelled = true;
      clearTimeout(debounceRef.current);
    };
  }, [input]);

  const selectResult = (result) => {
    setInput("");
    setResults([]);
    navigate(`/user/profile/${result._id}`);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={goToProfile}>Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => { handleMobileMenuClose(); navigate("/user/messenger"); }}>
        <IconButton size="large" aria-label="messages" color="inherit">
          <MailIcon />
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem onClick={() => { handleMobileMenuClose(); navigate("/home"); }}>
        <IconButton size="large" aria-label={`${pendingRequests} pending connection requests`} color="inherit">
          <Badge badgeContent={pendingRequests} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton size="large" aria-label="account of current user" aria-controls={menuId} aria-haspopup="true" color="inherit">
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ display: { xs: "none", sm: "block" } }}>
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
                onChange={(e) => setInput(e.target.value)}
              />
            </Search>
            {results.length > 0 && <SearchResultsList results={results} onSelect={selectResult} />}
          </div>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton size="large" color="inherit" title="Home" aria-label="home" onClick={() => navigate("/home")}>
              <HomeIcon />
            </IconButton>
            <IconButton size="large" color="inherit" title="Resume Builder" aria-label="resume builder" onClick={() => navigate("/resume")}>
              <PictureAsPdfIcon />
            </IconButton>
            <IconButton size="large" color="inherit" title="Messages" aria-label="messages" onClick={() => navigate("/user/messenger")}>
              <MailIcon />
            </IconButton>
            <IconButton
              size="large"
              color="inherit"
              title="Notifications"
              aria-label={`${pendingRequests} pending connection requests`}
              onClick={() => navigate("/home")}
            >
              <Badge badgeContent={pendingRequests} color="error">
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
          <IconButton size="large" color="inherit" title="Logout" aria-label="logout" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
