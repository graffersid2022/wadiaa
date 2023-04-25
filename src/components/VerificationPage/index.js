import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Success from "../../assets/images/success.png";
import Fail from "../../assets/images/failurs.png";
import { useLocation, useNavigate } from "react-router";
import ROUTES from "../Configs/Routes";
import { useEffect } from "react";
import axios from "axios";
import COMMON from '../Configs/Common';


function Index() {
  const location = useLocation();
  let naviage = useNavigate()
  console.log(window.location.href)
  let url = window.location.href
  let passData={}
  url = url.split("?")[1].replace("%40","@")
  // url = url.split("&")
  // for(let i=0; i<url.length; i++)
  // {
  //     let arr = url[i].split("=")
  //     passData[arr[0]] = arr[1].replace("%40","@")
  // }
  // console.log(url) 
  localStorage.setItem("varification",JSON.stringify(url))
  useEffect(()=>{
    const token = localStorage.getItem("token");
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_UAT_URL}/auth/password/recovery/validation/?${url}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...COMMON.SECURITY_HEADERS
      },
    }).then(res=>{
      console.log(res.data)
      naviage(ROUTES.RESETPASSWORD)
    }).catch()
    naviage(ROUTES.RESETPASSWORD)
  },[])
  return (
    <Box sx={{ height: "100vh" }} className="request-main">
      <Box sx={{ height: "100%" }} className="request-sec">
        <Box
          sx={{
            height: "100%",
            display: { xs: "block", md: "flex" },
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box className="paysuccess">
            {location.pathname === ROUTES.EMAIL_VARIFICATION_SUCCESS ||
              ROUTES.PASSWORD_RECOVERY_SUCCESS ? (
              <img src={Success} alt="image" className="RequsetIllutration" />
            ) : (
              <img src={Fail} alt="image" className="RequsetIllutration" />
            )}
          </Box>
          <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
            <Typography
              sx={{
                color: "#fff",
                fontWeight: "900",
                fontSize: { xs: "31px", sm: "40px" },
              }}
            >
              {location.pathname === ROUTES.EMAIL_VARIFICATION_SUCCESS
                ? "Your email has been verified"
                : location.pathname === ROUTES.EMAIL_VARIFICATION_UNSUCCESS
                  ? "Your email has not been verified"
                  : location.pathname === ROUTES.PASSWORD_RECOVERY_SUCCESS
                    ? "Your password has been recovered"
                    : location.pathname === ROUTES.PASSWORD_RECOVERY_UNSUCCESS
                      ? "Your password has not been recovered"
                    :location.pathname === ROUTES.LINK_EXPIRED? "Link has been expired"
                      : ""}
            </Typography>
            <Typography
              sx={{ color: "#fff", mt: 3, marginRight: { xs: "0", md: "25%" } }}
            >
              {location.pathname === ROUTES.EMAIL_VARIFICATION_SUCCESS
                ? "Your email was verified successful. Please check our website other investment opportunities"
                : location.pathname === ROUTES.EMAIL_VARIFICATION_UNSUCCESS
                  ? "Your email was not verified successful. Please try again"
                  : location.pathname === ROUTES.PASSWORD_RECOVERY_SUCCESS
                    ? "Your password was recovered successful. Please check our website other investment opportunities"
                    : location.pathname === ROUTES.PASSWORD_RECOVERY_UNSUCCESS
                      ? "Your password was not recovered successful. Please try again"
                      :location.pathname === ROUTES.LINK_EXPIRED? "Link has been expired. Please try again"
                      : ""}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Index;
