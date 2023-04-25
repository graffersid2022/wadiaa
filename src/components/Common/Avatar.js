import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Typography,
  MenuItem,
  Menu,
  Fade,
  Divider,
} from "@mui/material";
import Bell from "../../assets/images/bell.png";
import NotificationBell from "../../assets/images/notification-bell.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ROUTES from "../Configs/Routes";
import COMMON from "../Configs/Common";
import ModalBox from "./ModalBox";

function Index() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currencyModal,setCurrencyModal]= useState(false)
  const open = anchorEl;
  const navigate = useNavigate();
  const location = useLocation();
  const notification = useSelector(
    (state) => state.commonState.notificationMessage
  );
  const investorType = useSelector((state) => state.InvestorReducer.type);
  const [showElement, setShowElement] = useState(false);
  const user = JSON.parse(localStorage.getItem("data"));
  let type = JSON.parse(localStorage.getItem("data"))
  useEffect(() => {
    if (notification) {
      setShowElement(true);
    }
  }, [notification]);
  
  // const type = useSelector(state => state.commonState.type)

  useEffect(()=>{
    // console.log("type",type)
  },[type])

  useEffect(() => {
    setTimeout(function () {
      setShowElement(false);
    }, 5000);
  }, [notification]);

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: "#f3f3f3",
        color: "#193D71",
        fontSize: "12px",
        textTransform: "uppercase",
        width: "25px",
        height: "25px",
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate(ROUTES.HOME);
    handleClose();
  };

  const handleInvestor = () => {
    if (investorType === "INDIVIDUAL") {
      navigate(ROUTES.INVEST.INDIVIDUAL);
    } else if (investorType === "LEGAL") {
      navigate(ROUTES.INVEST.BUSINESS);
    } else {
      navigate(ROUTES.RAISEMONEY.PRE_SCREENING);
    }
    handleClose();
  }

  const handlePassChange =()=>{
    navigate(ROUTES.UPDATEPASSWORD)
    handleClose()
  }

  return (
    <React.Fragment>
    <ModalBox value= {currencyModal} setCurrencyModal={setCurrencyModal}/>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #f3f3f3",
            padding: "8px",
            borderRadius: "10px",
            color: "#193D71",
            cursor: "pointer",
          }}
          onClick={handleClick}
        >
          <Avatar {...stringAvatar(`${user?.givenName} ${user?.lastName}`)} />
          <Typography
            sx={{
              margin: "0 15px",
              color:
                COMMON.WhiteColor.includes(location.pathname) || location.pathname.startsWith(ROUTES.INVESTMENT_PAGE) ? "#193D71" :
                  COMMON.BlueColor.includes(location.pathname) ? "#57c0f1" : "#fff",
              textTransform: "capitalize",
            }}
          >
            {user?.givenName} {user?.lastName}
          </Typography>
        </Box>
        <Box
          sx={{ position: "reletive" }}
          onClick={() => {
            navigate(ROUTES.NOTIFICATION);
          }}
        >
          <img src={Bell} className="bell-img" />
          <Box
            sx={{
              background: "#fff",
              position: "absolute",
              right: "105px",
              width: "382px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "20px 0 20px 20px",
              mt: 1,
            }}
          >
            {showElement && (
              <Box
                sx={{ padding: "20px", display: "flex" }}
                className="notofication-top"
                onClick={() => {
                  navigate(ROUTES.NOTIFICATION);
                }}
              >
                <Box sx={{}}>
                  <img
                    src={NotificationBell}
                    alt="image"
                    className="notification-bell"
                  />
                </Box>
                <Box sx={{ color: "#000" }}>
                  {/* <Box sx={{ fontWeight: "700", fontSize: "16px" }}>
                      Please complete your investment
                    </Box> */}
                  <Box sx={{ fontSize: "12px" }}>
                    {/* Your investment in edutec is pending please complete the process now by  clicking here! */}
                    {notification}
                  </Box>
                  <Box sx={{ textAlign: "right", fontSize: "10px" }}>
                    07:09 PM, Now
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <Box sx={{ padding: "10px" }}>
          <MenuItem
            onClick={() => {
              {
                user.type === "INVESTOR"
                  ? navigate(ROUTES.DASHBOARD)
                  : navigate(ROUTES.RAISEDASHBOARD);
              }
              handleClose();
            }}
            className="avatar-menu"
          >
            My Dashboard
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate(ROUTES.PROFILE_PAGE);
              handleClose();
            }}
          >
            My Profile
          </MenuItem>
          {type.type==="BUSINESS"?<MenuItem onClick={handleInvestor}>Register Profile</MenuItem>
          :null}
          <MenuItem onClick={handleLogout}>Log-out</MenuItem>
          <Divider sx={{ my: 0.5 }} />
          <MenuItem onClick={handleClose} disabled>
            Settings
          </MenuItem>
          <MenuItem onClick={handleClose}>Language Settings</MenuItem>
          <MenuItem onClick={
            ()=>{
              setCurrencyModal(true)
              handleClose()
            }
          }>Currency Settings</MenuItem>
          <MenuItem onClick={
            ()=>{
              navigate(ROUTES.MOBILE_VERIFY);
              handleClose()
            }
          }>Mobile Verification</MenuItem>
          <MenuItem
            onClick={() => {
              navigate(ROUTES.NOTIFICATION);
              handleClose();
            }}
          >
            Notification
          </MenuItem>
          <MenuItem onClick={handlePassChange}>Change Password</MenuItem>
        </Box>
      </Menu>
    </React.Fragment>
  );
}

export default Index;
