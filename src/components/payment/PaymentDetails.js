import React, { useEffect } from "react";
import {
  Container,
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import Routes from "../Configs/Routes";
import { useNavigate } from "react-router";
import axios from "axios";
import COMMON from "../Configs/Common";
import { toast } from "react-toastify";

function PaymentDetails() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const investID = localStorage.getItem("inID");
  const [campaignData, setCampaignData] = React.useState([]);
  const [investData, setInvestData] = React.useState([]);
  const [cancle, setCancle] = React.useState(false)
  const [CancelReason, setCancelReason] = React.useState("")


  console.log(CancelReason)

  const getDetails = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_UAT_URL}/investments/${investID}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...COMMON.SECURITY_HEADERS,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setInvestData(response.data);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });

    axios({
      method: "GET",
      url: `${process.env.REACT_APP_UAT_URL}/investments/${investID}/campaign`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...COMMON.SECURITY_HEADERS,
      },
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setCampaignData(response.data);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

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
      children: `${name.split(" ")[0][0]}${name.split(" ")[0][1]}`,
    };
  }

  const handleCancelPayment = () => {

    let data = {
      reason: CancelReason
    }

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_UAT_URL}/investments/${investID}/cancel`,
      data: data,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...COMMON.SECURITY_HEADERS,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Your Payment Cancelled Successfully")
          navigate(Routes.DASHBOARD)
        }
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response.status === 400) {
          toast.error("Please Enter Reason")
        }
      });
  }

  return (
    <Box sx={{ pt: 20, background: "#fff" }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: { xs: "block", sm: "flex" },
            justifyContent: "space-between",
            margin: "10px",
          }}
        >
          <Typography
            sx={{
              fontWeight: "700",
              fontSize: "24px",
            }}
          >
            Payment Details
          </Typography>
          <Button
            variant="outlined"
            onClick={() => navigate(Routes.PAYHISTORY)}
            sx={{
              border: "1px solid #57C0F1",
              borderRadius: "10px",
              color: "#57C0F1",
              padding: { xs: "8px 14px", sm: "15px 40px" },
              marginTop: { xs: "10px", sm: "0" },
            }}
          >
            Payment History
          </Button>
        </Box>
        <Box
          sx={{ background: "#193D71", borderRadius: "20px", margin: "10px" }}
        >
          <Box
            sx={{
              mt: 3,
              color: "#fff",
              padding: "30px",
              borderRadius: "20px",
              borderBottom: " 1px solid rgba(255, 255, 255, 0.23)",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar {...stringAvatar(`${campaignData?.business?.name}`)} />
                <Box sx={{ pl: 1, textTransform: "capitalize" }}>
                  {campaignData?.business?.name}
                </Box>
              </Box>
              <Box
                sx={{
                  border: "1px solid #FFFFFF",
                  borderRadius: "40px",
                  padding: "5px 20px",
                }}
              >
                Business
              </Box>
            </Box>
            <Divider
              variant="middle"
              sx={{ background: "rgba(255, 255, 255, 0.2)", mt: 2, mb: 2 }}
            />
            <Box>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6} lg={3}>
                  <Box>
                    <Typography sx={{ fontSize: { xs: "20px", sm: "24px" } }}>
                      Investment
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: "700",
                        fontSize: { xs: "22px", sm: "26px" },
                        color: "#57C0F1",
                      }}
                    >
                      {investData?.requestedAmount} USD
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                  <Box>
                    <Typography sx={{ fontSize: { xs: "20px", sm: "24px" } }}>
                      Status{" "}
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: "700",
                        fontSize: { xs: "22px", sm: "26px" },
                        color: "#57C0F1",
                      }}
                    >
                      {investData.status}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                  <Box>
                    <Typography sx={{ fontSize: { xs: "20px", sm: "24px" } }}>
                      Invested date
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: "700",
                        fontSize: { xs: "22px", sm: "26px" },
                        color: "#57C0F1",
                      }}
                    >
                      {investData.createDate}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                  <Box>
                    <Typography sx={{ fontSize: { xs: "20px", sm: "24px" } }}>
                      Campaign Name
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: "700",
                        fontSize: { xs: "22px", sm: "26px" },
                        color: "#57C0F1",
                        textTransform: "capitalize",
                      }}
                    >
                      {campaignData?.business?.name}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box
            sx={{
              background: "#193D71",
              borderRadius: "20px",
              padding: "30px",
              color: "#fff",
            }}
          >
            <Box
              sx={{
                display: { xs: "block", md: "flex" },
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ fontSize: { xs: "20px", sm: "24px" }, mr: 2 }}>
                To complete your payment we will be redirecting you to payment
                gateway, please click proceed to continue.
              </Typography>
              <Button
                variant="contained"
                sx={{
                  background: "#57C0F1",
                  marginTop: { xs: "10px", md: "0" },
                  color: "#fff",
                }}
                onClick={() => {
                  navigate(Routes.PAYINITIATE);
                }}
                disabled={investData.status === "CANCELLED"}
              >
                Proceed Payment
              </Button>
              <Button
                variant="contained"
                sx={{
                  ml: 1,
                  background: "#57C0F1",
                  marginTop: { xs: "10px", md: "0" },
                }}
                onClick={() => {
                  setCancle(!cancle)
                }}
                disabled={investData.status === "CANCELLED"}
              >
                Cancel Payment
              </Button>
            </Box>
            {
              cancle &&
              <Box sx={{ mt: 3 }}>
                <Grid item xs={12}>
                  <TextField
                    sx={{ color: "#fff" }}
                    id="filled-textarea"
                    label="Reason for cancelling the payment"
                    multiline
                    variant="filled"
                    fullWidth
                    helperText="Please write your reason for cancelling the payment"
                    className="multiples-input cancelInput"
                    onChange={(e) => setCancelReason(e.target.value)}
                  />
                </Grid>
                <Button
                  variant="contained"
                  sx={{
                    ml: 1,
                    background: "red",
                    marginTop: { xs: "10px", md: "10px" },
                  }}
                  onClick={handleCancelPayment}
                >
                  Cancel Payment
                </Button>
              </Box>
            }
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default PaymentDetails;
