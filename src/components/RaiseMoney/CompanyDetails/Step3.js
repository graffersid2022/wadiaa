import React from "react";
import LeftArrow from "../../../assets/images/left-arrow.png";
import RightArrow from "../../../assets/images/right-arrow.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import COMMON from "../../Configs/Common";

//import mui components
import {
  Box,
  Grid,
  TextField,
  Container,
  Button,
  FormHelperText,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";

function Step3({ handleNext, handleBack, activeStep, user3, setUser3 }) {
  let exchange = JSON.parse(localStorage.getItem("exchange"))

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm(
    {
      defaultValues: {
        step3address: user3?.group?.address,
        step3name: user3?.group?.name,
        initialFundsSource: user3?.initialFundsSource,
        localTurnoverCurrent: user3?.localTurnoverCurrent,
        localTurnoverProjected: user3?.localTurnoverProjected,
        totalAnnualRevenue: user3?.totalAnnualRevenue,
        totalAssets: user3?.totalAssets
      },
    }
  )
  const token = localStorage.getItem("token");

  const onSubmit = (data) => {
    console.log(data);

    let passData = {
      currency: data.currency,
      group: {
        address: data.step3address,
        name: data.step3name
      },
      initialFundsSource: data.initialFundsSource,
      localTurnoverCurrent: data.localTurnoverCurrent,
      localTurnoverProjected: data.localTurnoverProjected,
      totalAnnualRevenue: data.totalAnnualRevenue,
      totalAssets: data.totalAssets
    }
    axios({
      method: "PATCH",
      url: `${process.env.REACT_APP_UAT_URL}/${process.env.REACT_APP_TYPE_BUSINESS}/finance`,
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
          handleNext();
          getFinancialData();
        }
      })
      .catch((error) => {
        console.log(error)
      })
  };

  const getFinancialData = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_UAT_URL}/${process.env.REACT_APP_TYPE_BUSINESS}/finance`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...COMMON.SECURITY_HEADERS
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setUser3({ ...user3, ...response.data })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }


  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container maxWidth="lg">
          <Box
            sx={{
              color: "#151515",
              fontWeight: "700",
              fontSize: "16px",
              width: "100%",
              mt: 4
            }}
          >
            Local Sales Turnover (in USD)
          </Box>
          <Grid container spacing={5}>
            <Grid item xs={12} lg={4}>
              <TextField
                id="filled-basic"
                label="Current Value of Sales (in USD)"
                variant="filled"
                fullWidth
                className="step-input"
                helperText="Please provide the current total sales value of the company"
                {...register("localTurnoverCurrent",
                  {
                    pattern: {
                      value: /^[0-9]*$/,
                      message: "Please enter a valid number",
                    },
                  })
                }
              />
              <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.localTurnoverCurrent ? errors?.localTurnoverCurrent?.message : null}</FormHelperText>
            </Grid>
            <Grid item xs={12} lg={4}>
              <TextField
                id="filled-basic"
                label="Projected Value of Sales (in USD)"
                variant="filled"
                fullWidth
                className="step-input"
                helperText="Please provide the Value of Projected sales of the company"
                {...register("localTurnoverProjected",
                  {
                    pattern: {
                      value: /^[0-9]*$/,
                      message: "Please enter a valid number",
                    },
                  })
                }
              />
              <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.localTurnoverProjected ? errors?.localTurnoverProjected?.message : null}</FormHelperText>
            </Grid>
            <Grid item xs={12} lg={4}>
            </Grid>
            <Grid item xs={12} lg={4}>
              <TextField
                id="filled-basic"
                label="Annual Revenue (in USD)*"
                variant="filled"
                fullWidth
                className="step-input"
                helperText="Total Annual Revenue of the Company"
                {...register("totalAnnualRevenue", {
                  required: "Total Annual Revenue is Required",
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "Please enter a valid number",
                  },
                })}
              />
              <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.totalAnnualRevenue ? errors?.totalAnnualRevenue?.message : null}</FormHelperText>
              <FormHelperText> {watch().totalAnnualRevenue?parseFloat(Number(watch().totalAnnualRevenue)*Number(exchange.exchangeRate.usdToOmr)).toFixed(2)+" OMR":null} </FormHelperText>
            </Grid>
            <Grid item xs={12} lg={4}>
              <TextField
                id="filled-basic"
                label="Total Assets (in USD)*"
                variant="filled"
                fullWidth
                className="step-input"
                helperText="Please provide the value of total assets of the company"
                {...register("totalAssets", {
                  required: "Total Assets is Required",
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "Please enter a valid number",
                  },
                })}
              />
              <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.totalAssets ? errors?.totalAssets?.message : null}</FormHelperText>
              <FormHelperText> {watch().totalAssets?parseFloat(Number(watch().totalAssets)*Number(exchange.exchangeRate.usdToOmr)).toFixed(2)+" OMR":null} </FormHelperText>
            </Grid>
            <Grid item xs={12} lg={4}>
              <TextField
                id="filled-basic"
                label="Principal source of funds*"
                variant="filled"
                fullWidth
                className="step-input"
                helperText="Please provide the Principal source of funds of the company"
                {...register("initialFundsSource", {
                  required: "Principal source of funds is Required",
                })}
              />
              <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.initialFundsSource ? errors?.initialFundsSource?.message : null}</FormHelperText>
            </Grid>

            <Grid item xs={12} lg={4}>
              <TextField
                id="filled-basic"
                label="Parent Company name (If Applicable)"
                variant="filled"
                fullWidth
                className="step-input"
                helperText="Name of the Parent Group Company"
                {...register("step3name")}
              />
              <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.step3name ? errors?.step3name?.message : null}</FormHelperText>
            </Grid>
            <Grid item xs={12} lg={4}>
              <TextField
                id="filled-basic"
                label="Parent Company Address (If Applicable)"
                variant="filled"
                fullWidth
                className="step-input"
                helperText="Address of the Parent Group Company"
                {...register("step3address")}
              />
              <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.step3address ? errors?.step3address?.message : null}</FormHelperText>
            </Grid>
            <Grid item xs={12} lg={4}>
              <FormControl variant="filled" fullWidth>
                <InputLabel
                  id="demo-simple-select-filled-label"
                  className="dropdown-label"
                >
                  Currency*
                </InputLabel>
                <Select
                  defaultValue={user3?.currency}
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  className="raise-drop-down"
                  {...register("currency", {
                    required: "Currency is Required",
                  })}
                >
                  {COMMON.CURRENCY.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item} className="color-menu">
                        {item}
                      </MenuItem>
                    )
                  })}
                </Select>
                <FormHelperText className="helper-text">
                  Type of Currency
                </FormHelperText>
                <FormHelperText sx={{ color: "#ff3e3e", m: 0 }}>
                  {errors?.currency ? errors?.currency?.message : null}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
        </Container>

        <Box sx={{ pt: 2 }} className="step-bottom">
          <Container maxWidth="lg" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box sx={{ color: "#235AAC", borderBottom: "1px solid", cursor: "pointer" }}>
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
                <img src={LeftArrow} alt="leftArrow" className='arrow-image' />
                Previous
              </Button>
              <Button
                type="submit"
                // onClick={handleNext}
                sx={{ mr: 1 }} className="next-btn">
                Save & Proceed
                <img src={RightArrow} alt="rightarrow" className='arrow-image' />
              </Button>
            </Box>

          </Container>
        </Box>
      </form >
    </Box>
  );
}

export default Step3;
