import React from "react";
import {
  Box,
  Grid,
  TextField,
  FormHelperText,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  Container,
  Button,
} from "@mui/material";
import LeftArrow from "../../../assets/images/left-arrow.png";
import RightArrow from "../../../assets/images/right-arrow.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import COMMON from "../../Configs/Common";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from 'react-redux'

function Step1({ handleNext, handleBack, activeStep, campaign, setCampaign, getDetails }) {
  let exchange = JSON.parse(localStorage.getItem("exchange"))
  const campaignID = useSelector(state => state.CampaignReducer.campaignId)
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();

  const token = localStorage.getItem("token");
  const onSubmit = (data) => {

    let passData = {
      amount: data.amount,
      daysDuration: data.daysDuration,
      type: data.type
    }

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_UAT_URL}/${process.env.REACT_APP_TYPE_CAMPAIGN}`,
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
          handleNext();
          getDetails()
        }
      })
      .catch((error) => {
        console.log(error)
        if (error.response.status === 400) {
          toast.error(error.response.data.violations[0].message)
        }
      })
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container maxWidth="lg">
          <Box
            sx={{
              color: "#151515",
              fontWeight: "600",
              fontSize: "18px",
              width: "100%",
            }}
          >
            Raising money details
          </Box>
          <Grid container spacing={5}>
            <Grid item xs={12} lg={4}>
              <TextField
                id="filled-basic"
                label="Target Amount, USD*"
                variant="filled"
                fullWidth
                value={campaign?.requestedAmount}
                InputLabelProps={
                  campaign?.requestedAmount ? { shrink: true } : {}
                }
                className="step-input"
                helperText="How much would you like to raise? Please enter amount in USD"
                {...register("amount", {
                  required: "Amount is Required",
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "Only number is allowed",
                  },
                })}
              />
              <FormHelperText sx={{ color: "#ff3e3e" }}>
                {errors?.amount ? errors?.amount?.message : null}
              </FormHelperText>
              <FormHelperText> {watch().amount && exchange.exchangeRate ?parseFloat(Number(watch().amount)*Number(exchange.exchangeRate.usdToOmr)).toFixed(2)+" OMR":null} </FormHelperText>
            </Grid>
          </Grid>
          <Box
            sx={{
              color: "#151515",
              fontWeight: "600",
              fontSize: "18px",
              pt: "40px",
              width: "100%",
            }}
          >
            Campaign details
          </Box>
          <Grid container spacing={5}>
            <Grid item xs={12} md={6} lg={4}>
              <FormControl variant="filled" fullWidth>
                <InputLabel
                  id="demo-simple-select-filled-label"
                  className="dropdown-label"
                  shrink={campaign?.type && true}
                >
                  Campaign Type*
                </InputLabel>
                <Select
                  value={campaign?.type}
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  className="raise-drop-down"
                  {...register("type", {
                    required: "Campaign Type is Required",
                  })}
                >
                  <MenuItem value="CROWDFUNDING" className="color-menu">Equity Crowdfunding</MenuItem>
                </Select>
                <FormHelperText className="helper-text">
                  Please select the type of campaign from drop-down
                </FormHelperText>
              </FormControl>
              <FormHelperText sx={{ color: "#ff3e3e" }}>
                {errors?.type ? errors?.type?.message : null}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                id="filled-basic"
                label="Campaign Duration, Days*"
                variant="filled"
                fullWidth
                className="step-input"
                InputLabelProps={
                  campaign?.requestedDaysDuration ? { shrink: true } : {}
                }
                value={campaign?.requestedDaysDuration}
                helperText="Auto-Calculated based on start and end date"
                {...register("daysDuration", {
                  required: "Days/Duration is Required",
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "Only number is allowed",
                  },
                })}
              />
              <FormHelperText sx={{ color: "#ff3e3e" }}>
                {errors?.daysDuration ? errors?.daysDuration?.message : null}
              </FormHelperText>
            </Grid>
          </Grid>
        </Container>


        <Box sx={{ pt: 2 }} className="step-bottom">
          <Container
            maxWidth="lg"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                color: "#235AAC",
                borderBottom: "1px solid",
                cursor: "pointer",
              }}
            >
              Back To Dashboard
            </Box>
            <Box>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
                className="back-btn"
              >
                <img src={LeftArrow} alt="leftArrow" className="arrow-image" />
                Previous
              </Button>
              <Button type="submit" sx={{ mr: 1 }} className="next-btn">
                Proceed
                <img src={RightArrow} alt="rightarrow" className="arrow-image" />
              </Button>
            </Box>
          </Container>
        </Box>
      </form>
    </Box>
  );
}

export default Step1;
