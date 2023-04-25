import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Grid,
  Button,
  Divider,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import COMMON from "../Configs/Common";
import { getUserProfile } from "../../APIs/Profile_api";


function ProfileInvestor() {
  const [profileDetails, setPrfileDetails] = useState({});
  const token = localStorage.getItem("token");

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: "#fff3",
        color: "#fff",
        fontSize: "16px",
        textTransform: "uppercase",
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[0][1]}`,
    };
  }

  const getInvestorProfileDetails = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_UAT_URL}/account`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...COMMON.SECURITY_HEADERS
      },
    })
      .then((response) => {
        setPrfileDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const getInvestorProfileDetails = async () => {
  //   const data = await getUserProfile();
  //   console.log("data", data);
  // };

  useEffect(() => {
    getInvestorProfileDetails();
  }, []);


  return (
    <Box
      sx={{
        background: "#ffffff",
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mt: 20 }}>
          <Typography sx={{ fontWeight: "700", fontSize: "24px", margin: '10px' }}>My profile</Typography>
        </Box>
        {/* <Box sx={{ background: "#193D71", borderRadius: "20px", margin: '10px' }}>
          <Box sx={{
            mt: 3, color: "#fff", padding: { xs: '10px', sm: "30px" }, borderRadius: "20px", borderBottom: " 1px solid rgba(255, 255, 255, 0.23)",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)"
          }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar {...stringAvatar('EDUTEC pvt. ltd.')} />
                <Box sx={{ pl: 1 }}>
                  EDUTEC pvt. ltd.
                </Box>
              </Box>
              <Box sx={{
                border: "1px solid #FFFFFF",
                borderRadius: "40px",
                padding: "5px 20px",
              }}>
                Business
              </Box>
            </Box>
            <Divider variant="middle" sx={{ background: "rgba(255, 255, 255, 0.2)", mt: 2, mb: 2 }} />
            <Box sx={{ textAlign: 'center' }}>
              <Grid container spacing={5} >
                <Grid item xs={12} md={6} lg={3}>
                  <Box>
                    <Typography sx={{ fontSize: "24px" }}>Investment</Typography>
                    <Typography sx={{
                      fontWeight: "700",
                      fontSize: "32px",
                      color: "#57C0F1"
                    }}>10,000 USD</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                  <Box>
                    <Typography sx={{ fontSize: "24px" }}>Status </Typography>
                    <Typography sx={{
                      fontWeight: "700",
                      fontSize: "32px",
                      color: "#57C0F1"
                    }}>Reserved</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                  <Box>
                    <Typography sx={{ fontSize: "24px" }}>Invested date</Typography>
                    <Typography sx={{
                      fontWeight: "700",
                      fontSize: "32px",
                      color: "#57C0F1"
                    }}>12/11/2022</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                  <Box>
                    <Typography sx={{ fontSize: "24px" }}>Campaign Name</Typography>
                    <Typography sx={{
                      fontWeight: "700",
                      fontSize: "32px",
                      color: "#57C0F1"
                    }}>EDUTEC pvt.ltd.</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box> */}
        <Box sx={{
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "20px",
          mt: 5,
          padding: { xs: "12px", sm: "30px", },
          margin: '10px'
        }}>
          <Box sx={{
            fontWeight: "700",
            fontSize: "24px"
          }}>
            Basic details
          </Box>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{
                  fontWeight: 700,
                  color: "#B8B9BA"
                }}>
                  First Name
                </Box>
                <Box sx={{ fontWeight: 700, textTransform: "capitalize" }}>
                  {profileDetails.givenName}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{
                  fontWeight: 700,
                  color: "#B8B9BA"
                }}>
                  Last Name
                </Box>
                <Box sx={{ fontWeight: 700, textTransform: "capitalize" }}>
                  {profileDetails.lastName}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{
                  fontWeight: 700,
                  color: "#B8B9BA"
                }}>
                  E-mail
                </Box>
                <Box sx={{ fontWeight: 700 }}>
                  {profileDetails.email}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{
                  fontWeight: 700,
                  color: "#B8B9BA"
                }}>
                  Phone
                </Box>
                <Box sx={{ fontWeight: 700 }}>
                  {profileDetails.phone?"+":""}{profileDetails.phone}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container >
    </Box >
  );
}

export default ProfileInvestor;
