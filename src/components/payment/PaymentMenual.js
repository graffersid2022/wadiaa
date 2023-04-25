import React from "react";
import { Box, Typography, Grid, Button, TextField, FormHelperText } from "@mui/material";
import { Container } from "@mui/system";
import RightArrow from "../../assets/images/right-arrow.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import COMMON from "../Configs/Common";
import { toast } from "react-toastify";



const PaymentMenual = () => {
  const token = localStorage.getItem("token");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    let passData = {
      externalId: data.cardNumber,
      investmentId: Number(localStorage.getItem("inID"))
    }

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_UAT_URL}/transaction`,
      data: passData,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...COMMON.SECURITY_HEADERS
      },
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success('Your address has been updated successfully')
          console.log(response)
        }
      })
      .catch((error) => {
        console.log(error)

      })
  }



  return (
    <Box sx={{ background: "#fff" }}>
      <Container maxWidth="lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ mt: { xs: 13, md: 20 } }}>
            <Box
              sx={{
                fontSize: { xs: "22px", sm: "24px" },
                fontWeight: "700",
                margin: { xs: "10px", sm: "0" },
              }}
            >
              Initiate Payment for Investment
            </Box>
            <Box
              sx={{
                background: "#F5F5F5",
                borderRadius: "10px",
                padding: "30px",
                marginTop: "25px!important",
                margin: { xs: "10px", sm: "0" },
              }}
            >
              <Typography sx={{ fontSize: { xs: "22px", sm: "24px" } }}>
                Payable Amount{" "}
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "22px", sm: "24px" },
                  fontWeight: "700",
                  mt: 2,
                }}
              >
                OMR 1,000,000
              </Typography>
            </Box>
            <Box
              sx={{
                background: "rgba(255, 255, 255, 0.05)",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                borderRadius: "30px",
                marginTop: "30px!important",
                margin: "10px",
                padding: { xs: "20px", sm: "30px" },
              }}
            >
              <Typography
                sx={{
                  fontWeight: "700",
                  fontSize: "24px",
                }}
              >
                Bank transfer
              </Typography>
              <Typography sx={{ color: "#193D71", mt: 2 }}>
                Please provide the transaction reference number
              </Typography>
              <Grid container sx={{ mt: 1 }} spacing={3}>
                <Grid item xs={12} md={6} lg={4}>
                  <TextField
                    id="filled-basic"
                    label="Transaction Reference Number"
                    variant="filled"
                    fullWidth
                    className="step-input"
                    helperText="Please enter the card number to proceed"
                    {...register("cardNumber", {
                      required: "Please enter Transaction Reference Number",
                    })}
                  />
                  <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.cardNumber ? errors?.cardNumber?.message : null}</FormHelperText>
                </Grid>
              </Grid>
              <Button
                variant="contained"
                sx={{
                  background: "#57C0F1",
                  borderRadius: "8px",
                  mt: 3,
                  padding: "13px 24px",
                  marginBottam: "20px!important",
                }}
                type="submit"
              >
                Confirm transaction
                <img src={RightArrow} alt="image" className="arrow-image" />
              </Button>
            </Box>
          </Box>
        </form>
      </Container>
      <Box sx={{ pt: 1 }} className="step-bottom">
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: "15px",
            marginTop: "20px!important",
            alignItems: "center",
            paddingLeft: "60px!important",
          }}
        >
          <Box
            sx={{
              color: "#235AAC",
              borderBottom: "1px solid",
              borderBottomWidth: "2px solid",
              cursor: "pointer",
            }}
          >
            Back To Dashboard
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
export default PaymentMenual;
