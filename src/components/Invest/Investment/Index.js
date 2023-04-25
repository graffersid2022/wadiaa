import React, { useEffect } from "react";
import { useNavigate } from 'react-router'
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  Button, InputAdornment
} from "@mui/material";
import RightArrow from "../../../assets/images/right-arrow.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Routes from "../../Configs/Routes"
import COMMON from "../../Configs/Common";

function Index() {
  const [InvestorType, setInvestorType] = React.useState("")
  const token = localStorage.getItem("token");
  const navigate = useNavigate()
  const params = useParams()

  const sendOtp = () => {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_UAT_URL}/account/otp/investment`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...COMMON.SECURITY_HEADERS
      },
    })
      .then((response) => {
        console.log(response)
        if (response.status === 200) {
          toast.success('OTP sent successfully')
        }
      })
      .catch((error) => {
        console.log(error)
        toast.error('Something went wrong')
      })
  }


  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm();

  const onSubmit = (data) => {

    let passData = {
      agreedTermsConditions: data.agreedTermsConditions,
      campaignId: params.id,
      otp: data.otp,
      requestedAmount: data.requestedAmount,
      review: {
        anonymous: data.anonymous,
        content: data.content,
      }
    }


    axios({
      method: "POST",
      url: `${process.env.REACT_APP_UAT_URL}/investments`,
      data: passData,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...COMMON.SECURITY_HEADERS
      },
    })
      .then((response) => {
        console.log(response)
        if (response.status === 200) {
          toast.success('Investment request sent successfully')
          navigate(Routes.DASHBOARD)
        }
      })
      .catch((error) => {
        console.log(error.response)
        if (error.response.status === 400) {
          toast.error(error.response.data.title)
        }
      })
  }


  const getInvestorData = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_UAT_URL}/investor`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...COMMON.SECURITY_HEADERS
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setInvestorType(response.data.type)
          console.log("response", response.data.type)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }


  useEffect(() => {
    getInvestorData()
  }, [])

  return (
    <Box sx={{ background: "#fff" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ pt: { xs: 13, sm: 18, md: 25 }, margin: "10px" }}>
          <Container maxWidth="lg">
            <Typography
              sx={{
                fontWeight: "700",
                fontSize: "28px",
              }}
            >
              Investment details
            </Typography>
            <Box sx={{ display: "flex", mt: 5 }} >
              <Button
                sx={{
                  border: "0.5px solid #D7D8D8",
                  padding: { xs: "10px 19px", sm: "10px 25px" },
                  borderRadius: "10px",
                  mr: 2,
                  color: "#000",
                  fontSize: "16px"
                }}
                value="1250"
                onClick={() => {
                  setValue("requestedAmount", "500")
                }}
              >
                $ 500
              </Button>
              <Button
                sx={{
                  border: "0.5px solid #D7D8D8",
                  padding: { xs: "10px 19px", sm: "10px 25px" },
                  borderRadius: "10px",

                  mr: 2,
                  color: "#000",
                  fontSize: "16px"
                }}
                onClick={() => {
                  setValue("requestedAmount", "3000")
                }}
              >
                $ 3000
              </Button>
              <Button
                sx={{
                  border: "0.5px solid #D7D8D8",
                  padding: { xs: "10px 19px", sm: "10px 25px" },
                  borderRadius: "10px",
                  mr: 2,
                  color: "#000",
                  fontSize: "16px"
                }}
                onClick={() => {
                  setValue("requestedAmount", "7200")
                }}
              >
                $ 7200
              </Button>
            </Box>
            <Grid container spacing={5} sx={{ mt: 3 }}>
              <Grid item lg={4} md={6} xs={12}>
                <TextField
                  id="filled-basic"
                  label="Investment amount"
                  variant="filled"
                  fullWidth
                  className="step-input"
                  helperText="Description about the label got mentioned over the left side"
                  InputLabelProps={
                    watch("requestedAmount") ? { shrink: true } : {}
                  }
                  {...register("requestedAmount", {
                    required: "Please enter the amount",
                  })}
                  InputProps={
                    watch("requestedAmount") ? { startAdornment: <InputAdornment position="start">$</InputAdornment>, } : {}
                  }
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.requestedAmount ? errors?.requestedAmount?.message : null}</FormHelperText>
              </Grid>
              <Grid item lg={4} md={6} xs={12}>
                <TextField
                  id="filled-basic"
                  label="OTP"
                  variant="filled"
                  fullWidth
                  className="step-input"
                  helperText="Description about the label got mentioned over the left side  "
                  {...register("otp", {
                    required: "Please enter the otp"
                  })}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.otp ? errors?.otp?.message : null}</FormHelperText>

              </Grid>
              <Grid item lg={4} md={6} xs={12}>
                <Button
                  variant="contained"
                  sx={{
                    padding: "13px 24px",
                    fontSize: "18px",
                    background: "#57C0F1",
                    borderRadius: "10px",
                  }}
                  onClick={sendOtp}
                >
                  Send Otp
                </Button>
              </Grid>
            </Grid>
            {watch("requestedAmount") > 7200 && (
              <Grid container spacing={3} sx={{ mt: "3px" }}>
                <Grid item lg={10} xs={12}>
                  <Box sx={{ background: "#F5F5F5", padding: "8px", borderRadius: "10px", display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                    <Typography sx={{ fontSize: "12px" }}>Investment is limited to USD 7200 (OMR 3000) per campaign for non-accredited investors.<br />
                      If you wish to invest higher amounts, you need to complete the accreditation as an Angel or Sophisticated investor.</Typography>
                    <Button variant="contained" sx={{ background: "#57C0F1", padding: "14px 34px", borderRadius: "10px" }}
                      onClick={() => { InvestorType === "INDIVIDUAL" ? navigate(Routes.INVESTMENT.INDIVIDUAl_ACCREDITATION) : navigate(Routes.INVESTMENT.LEGAL_ACCREDITATION) }}>Get Accredited</Button>
                  </Box>
                </Grid>
              </Grid>
            )}
            <Grid container spacing={1} sx={{ mt: 3 }}>
              <Grid item lg={12} xs={12}>
                <TextField
                  id="filled-basic"
                  label="Reason  to Invest"
                  variant="filled"
                  fullWidth
                  className="step-input"
                  helperText="Description about the label got mentioned over the left side"
                  {...register("content", {
                    required: "Please enter the reason to invest"
                  })}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.content ? errors?.content?.message : null}</FormHelperText>
                <FormControlLabel
                  control={<Checkbox className="invest-checkbox"  {...register("anonymous", {
                    required: "Please select the checkbox"
                  })} />}
                  label="Post anonymously"
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.anonymous ? errors?.anonymous?.message : null}</FormHelperText>
                <FormControlLabel
                  control={<Checkbox className="invest-checkbox"  {...register("agreedTermsConditions", {
                    required: "Please select the checkbox"
                  })} />}
                  label="I agree to the terms and conditions"
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.agreedTermsConditions ? errors?.agreedTermsConditions?.message : null}</FormHelperText>
              </Grid>
              <Grid item xs={12}>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              sx={{
                padding: "13px 24px",
                fontSize: "18px",
                background: "#57C0F1",
                mt: 5,
                borderRadius: "10px",
                mb: 5,
              }}
              type="submit"
              disabled={!watch("otp")}
            >
              Invest now
              <img src={RightArrow} alt="image" className="arrow-image" />
            </Button>
          </Container>
        </Box>
      </form>
    </Box >
  );
}

export default Index;

