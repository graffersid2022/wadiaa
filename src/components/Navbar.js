import React, { useEffect, useState } from "react";
import AvatarCom from "../components/Common/Avatar";
import { useNavigate, useLocation } from "react-router";
import {
  AppBar,
  Box,
  IconButton,
  Typography,
  Menu,
  Button,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/images/logo.png";
import BlueLogo from "../assets/images/blue-logo.png";
import { getUserType } from "./Actions/Index";
import { useDispatch,useSelector } from "react-redux";
import ROUTES from "./Configs/Routes";
import COMMON from "./Configs/Common";
import {
  BsLinkedin,
  BsTwitter,
  BsInstagram,
  BsFacebook,
  BsYoutube,
} from "react-icons/bs";

const pages = [
  {
    id: 1,
    name: "Home",
    navigate: "/",
    location: "/",
  },
  {
    id: 2,
    name: "Learn",
    navigate: "/learn",
    location: "/learn",
  },
  {
    id: 3,
    name: "Invest",
    navigate: "/invest-home",
    location: "/invest-home",
  },
  {
    id: 4,
    name: "Raise Funds",
    navigate: "/raisemoney/home",
    location: "/raisemoney/home",
  },
];

function NavBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // document.addEventListener("visibilitychange", () => {
 
  //   const minMinutesToPass = 1;
  //   let currentTime = Date.now();
   
  //   let lastReloadTime = Number(sessionStorage.getItem("reload_time"));
  //   let diff = Math.abs(Math.round(((currentTime - lastReloadTime)/1000)/60));
  //   console.log(diff);
  //   if(diff>=minMinutesToPass){
   
  //       sessionStorage.setItem("reload_time", currentTime)
  //       console.log("reloading",diff);
  //       window.location.reload();
  //   }
  // });
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const type = useSelector(state => state.commonState.type)

  const token = localStorage.getItem("token");

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: COMMON.WhiteColor.includes(location.pathname) || location.pathname.startsWith(ROUTES.INVESTMENT_PAGE)
          ? "#ffffff"
          : COMMON.BlueColor.includes(location.pathname)
            ? "#244778"
            : COMMON.BlackColor.includes(location.pathname)
              ? "#121315"
              : null,
        borderRadius: "0 0 20px 20px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
        position: "fixed",
        width: "100%",
        top: "0",
        zIndex: "99",
      }}
    >
      <Box toolbar sx={{ display: "flex" }}>
        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" }, poadding: "20px" }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            <Box>
              {pages.map((page, index) => (
                <MenuItem key={index}
                  sx={{ padding: "20px" }}
                  onClick={() => { navigate(`${page.navigate}`) }}
                >
                  <Typography textAlign="center" sx={{ fontSize: "18px" }}>{page.name}</Typography>
                </MenuItem>
              ))}
            </Box>
            <Box sx={{ display: "flex", color: "#000", justifyContent: "center" }} className="social-links-responsive">
              <a href={COMMON.SOCIALURL.LinkedIn} target="_blank">
                <BsLinkedin />
              </a>
              <a href={COMMON.SOCIALURL.Instagram} target="_blank">
                <BsInstagram />
              </a>
              <a href={COMMON.SOCIALURL.Twitter} target="_blank">
                <BsTwitter />
              </a>
              <a href={COMMON.SOCIALURL.Facebook} target="_blank">
                <BsFacebook />
              </a>
              <a href={COMMON.SOCIALURL.YouTube} target="_blank">
                <BsYoutube />
              </a>
            </Box>
            <Box sx={{ padding: "10px" }}>
              <Button
                onClick={() => navigate("/signup")}
                variant="contained"
                className="login-btn"
                sx={{ mr: 2 }}
              >
                Sign Up
              </Button>
              <Button
                onClick={() => navigate("/signin")}
                variant="contained"
                className="login-btn"
              >
                Log In
              </Button>
            </Box>
          </Menu>
        </Box>
        <Box
          sx={{
            mr: { xs: 1, md: 1, lg: 2 },
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: "3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          <img src={logo} alt="logo" className="logo-img" />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex", lg: "flex" },
            justifyContent: "space-between",
            padding: { xs: "0 10px", md: "0 10px", xl: "0 80px", lg: "0 50px" },
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            {
              COMMON.WhiteColor.includes(location.pathname) || location.pathname.startsWith(ROUTES.INVESTMENT_PAGE) ?
                <img src={BlueLogo} alt="logo" className="logo-img" /> :
                <img src={logo} alt="logo" className="logo-img" />
            }
          </Box>
          <Box sx={{ display: "flex" }}>
            <Button
              onClick={() => {
                navigate("/");
              }}
              className={
                location.pathname === `/` ? "route-active nav-btn" : "nav-btn"
              }
              sx={{
                my: 2,
                color: COMMON.WhiteColor.includes(location.pathname) || location.pathname.startsWith(ROUTES.INVESTMENT_PAGE)
                  ? "#193D71"
                  : COMMON.BlueColor.includes(location.pathname)
                    ? "#ffffff"
                    : COMMON.BlackColor.includes(location.pathname)
                      ? "#ffffff"
                      : null,
              }}
            >
              <span>Home</span>
            </Button>
            <Button
              target="_blank"
              href={COMMON.URL.Learn}
              className={
                location.pathname === `/learn`
                  ? "route-active nav-btn"
                  : "nav-btn"
              }
              sx={{
                my: 2,
                color: COMMON.WhiteColor.includes(location.pathname) || location.pathname.startsWith(ROUTES.INVESTMENT_PAGE)
                  ? "#193D71"
                  : COMMON.BlueColor.includes(location.pathname)
                    ? "#ffffff"
                    : COMMON.BlackColor.includes(location.pathname)
                      ? "#ffffff"
                      : null,
              }}
            >
              <span>Learn</span>
            </Button>
            <Button
              onClick={() => {
                navigate("/invest-home");
              }}
              className={
                location.pathname.startsWith("/invest")
                  ? "route-active nav-btn"
                  : "nav-btn"
              }
              sx={{
                my: 2,
                color: COMMON.WhiteColor.includes(location.pathname) || location.pathname.startsWith(ROUTES.INVESTMENT_PAGE)
                  ? "#193D71"
                  : COMMON.BlueColor.includes(location.pathname)
                    ? "#ffffff"
                    : COMMON.BlackColor.includes(location.pathname)
                      ? "#ffffff"
                      : null,
              }}
            >
              <span>Invest</span>
            </Button>
            <Button
              onClick={() => {
                dispatch(getUserType("BUSINESS"));
                navigate(ROUTES.RAISE_HOME);
              }}
              sx={{
                my: 2,
                color: COMMON.WhiteColor.includes(location.pathname) || location.pathname.startsWith(ROUTES.INVESTMENT_PAGE)
                  ? "#193D71"
                  : COMMON.BlueColor.includes(location.pathname)
                    ? "#ffffff"
                    : COMMON.BlackColor.includes(location.pathname)
                      ? "#ffffff"
                      : null,
              }}
              className={
                location.pathname.startsWith("/raisemoney")
                  ? "route-active nav-btn"
                  : "nav-btn"
              }
            >
              <span>Raise Funds</span>
            </Button>
          </Box>
          <Box sx={{ display: { md: "none", lg: "flex" } }} className="social-links">
            <a href={COMMON.SOCIALURL.LinkedIn} target="_blank">
              <BsLinkedin />
            </a>
            <a href={COMMON.SOCIALURL.Instagram} target="_blank">
              <BsInstagram />
            </a>
            <a href={COMMON.SOCIALURL.Twitter} target="_blank">
              <BsTwitter />
            </a>
            <a href={COMMON.SOCIALURL.Facebook} target="_blank">
              <BsFacebook />
            </a>
            <a href={COMMON.SOCIALURL.YouTube} target="_blank">
              <BsYoutube />
            </a>
          </Box>
          {token ? (
            <AvatarCom />
          ) : (
            <Box>
              <Button
                onClick={() => navigate("/signup")}
                variant="contained"
                className="login-btn"
                sx={{ mr: { xs: 1, md: 1, lg: 2 } }}
              >
                Sign Up
              </Button>
              <Button
                onClick={() => navigate("/signin")}
                variant="contained"
                className="login-btn"
              >
                Log In
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </AppBar >
  );
}

export default NavBar;

