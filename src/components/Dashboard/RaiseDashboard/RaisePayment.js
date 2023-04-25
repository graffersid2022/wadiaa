import React, { useEffect, useState } from "react";
import {
  Container,
  Avatar,
  Box,
  Button,
  Divider,
  Typography,
  Grid,
} from "@mui/material";
import { useNavigate } from 'react-router'
import axios from "axios";
import COMMON from "../../Configs/Common"
import ROUTES from "../../Configs/Routes"
import moment from "moment";


function PaymentDetails() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const investID = localStorage.getItem("inID");
  const [TransactionData, setTransactionData] = useState([]);

  const getDetails = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_UAT_URL}/transaction`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...COMMON.SECURITY_HEADERS
      },
    })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data)
          setTransactionData(response.data)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getDetails();
  }, []);

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

  return (
    <Box sx={{ pt: 20, background: "#fff" }}>
      <Container maxWidth="lg">
        <Box sx={{ display: { xs: 'block', sm: "flex" }, justifyContent: "space-between", margin: '10px' }}>
          <Typography sx={{
            fontWeight: "700",
            fontSize: "24px"
          }}>Payment Details</Typography>
          <Button variant="outlined"
            onClick={() => navigate(ROUTES.PAYHISTORY)}
            sx={{
              border: "1px solid #57C0F1",
              borderRadius: "10px",
              color: "#57C0F1",
              padding: { xs: "8px 14px", sm: "15px 40px" },
              marginTop: { xs: '10px', sm: '0' }
            }}>Payment History</Button>
        </Box>
        <Box sx={{ background: "#193D71", borderRadius: "20px", margin: '10px' }}>
          <Box sx={{
            mt: 3, color: "#fff", padding: "30px", borderRadius: "20px", borderBottom: " 1px solid rgba(255, 255, 255, 0.23)",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)"
          }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar {...stringAvatar(`sadfds`)} />
                <Box sx={{ pl: 1, textTransform: "capitalize" }}>
                  sdf
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
            <Box>
              <Grid container spacing={5} >
                <Grid item xs={12} sm={6} lg={3}>
                  <Box>
                    <Typography sx={{ fontSize: { xs: '20px', sm: "24px" } }}>Payable Amount</Typography>
                    <Typography sx={{
                      fontWeight: "700",
                      fontSize: { xs: '22px', sm: "26px" },
                      color: "#57C0F1"
                    }}>{TransactionData[TransactionData.length - 1]?.amount} USD</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                  <Box>
                    <Typography sx={{ fontSize: { xs: '20px', sm: "24px" } }}>Transaction Type</Typography>
                    <Typography sx={{
                      fontWeight: "700",
                      fontSize: { xs: '22px', sm: "26px" },
                      color: "#57C0F1",
                      textTransform: "capitalize"
                    }}>{TransactionData[TransactionData.length - 1]?.transactionType}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                  <Box>
                    <Typography sx={{ fontSize: { xs: '20px', sm: "24px" } }}>Created Date</Typography>
                    <Typography sx={{
                      fontWeight: "700",
                      fontSize: { xs: '22px', sm: "26px" },
                      color: "#57C0F1"
                    }}>
                      {moment(TransactionData[TransactionData.length - 1]?.startDate).format("DD-MM-YYYY")}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                  <Box>
                    <Typography sx={{ fontSize: { xs: '20px', sm: "24px" } }}>Status </Typography>
                    <Typography sx={{
                      fontWeight: "700",
                      fontSize: { xs: '22px', sm: "26px" },
                      color: "#57C0F1"
                    }}>{TransactionData[TransactionData.length - 1]?.transactionStatus}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box sx={{ background: "#193D71", borderRadius: "20px", padding: "30px", color: "#fff" }}>
            <Box sx={{ display: { xs: 'block', md: "flex" }, justifyContent: "space-between" }}>
              <Typography sx={{ fontSize: { xs: '20px', sm: "24px" }, mr: 2 }}>To complete your payment we will be redirecting you to payment gateway, please click proceed to continue.</Typography>
              <Button variant="contained" sx={
                { background: "#57C0F1", marginTop: { xs: '10px', md: "0" } }} onClick={() => { navigate(ROUTES.PAYINITIATE) }}>Proceed payment</Button>
            </Box>
          </Box>
        </Box>
      </Container >
    </Box >
  );
};

export default PaymentDetails;

