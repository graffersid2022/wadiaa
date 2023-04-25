import React, { useEffect } from "react";
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
  const {
    register,
    handleSubmit,
    formState: { errors },
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
    let passData = {
      currency: "USD",
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
      url: `${process.env.REACT_APP_UAT_URL}/${process.env.REACT_APP_TYPE_INVESTOR}/finance`,
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
        }
      })
      .catch((error) => {
        console.log(error)
      })
  };


  const getAddressData = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_UAT_URL}/investor/finance`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...COMMON.SECURITY_HEADERS
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setUser3(response.data)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getAddressData()
  }, [])


  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ margin: '15px' }}>
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
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="filled-basic"
                  label="Current Value (in USD)"
                  variant="filled"
                  fullWidth
                  className="step-input"
                  helperText="Value of Company's Total Assets"
                  {...register("localTurnoverCurrent")}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.localTurnoverCurrent ? errors?.localTurnoverCurrent?.message : null}</FormHelperText>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="filled-basic"
                  label="Projected value (in USD)"
                  variant="filled"
                  fullWidth
                  className="step-input"
                  helperText="Projected Value of the Company"
                  {...register("localTurnoverProjected")}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.localTurnoverProjected ? errors?.localTurnoverProjected?.message : null}</FormHelperText>
              </Grid>
              <Grid item xs={12} lg={4}>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
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
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="filled-basic"
                  label="Total Assets (in USD)*"
                  variant="filled"
                  fullWidth
                  className="step-input"
                  helperText="Total Assets value of the Company"
                  {...register("totalAssets", {
                    required: "Total Assets is Required",
                    pattern: {
                      value: /^[0-9]*$/,
                      message: "Please enter a valid number",
                    },
                  })}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.totalAssets ? errors?.totalAssets?.message : null}</FormHelperText>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="filled-basic"
                  label="Principal source of funds*"
                  variant="filled"
                  fullWidth
                  className="step-input"
                  helperText="Primary Source of Income for the Company ?"
                  {...register("initialFundsSource", {
                    required: "Initial Funds Source is Required",
                  })}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.initialFundsSource ? errors?.initialFundsSource?.message : null}</FormHelperText>
              </Grid>

              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="filled-basic"
                  label="Parent Company name (If Applicable)"
                  variant="filled"
                  fullWidth
                  className="step-input"
                  helperText="Name of the Parent Group Company"
                  {...register("step3name")}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.name ? errors?.name?.message : null}</FormHelperText>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="filled-basic"
                  label="Parent Company Address (If Applicable) "
                  variant="filled"
                  fullWidth
                  className="step-input"
                  helperText="Address of the Parent Group Company"
                  {...register("step3address")}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.address ? errors?.address?.message : null}</FormHelperText>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <FormControl variant="filled" fullWidth>
                  <InputLabel
                    id="demo-simple-select-filled-label"
                    className="dropdown-label"
                  >
                    Currency*
                  </InputLabel>
                  <Select
                    // defaultValue={user5 && user5?.content[0]?.currency}
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    className="raise-drop-down"
                    {...register("currency", {
                      required: "Currency is Required",
                    })}
                    defaultValue={user3?.currency}
                  >
                    {COMMON.CURRENCY.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item} className="color-menu">
                          {item}
                        </MenuItem>
                      )
                    })
                    }
                  </Select>
                  <FormHelperText className="helper-text">
                    Select currency type
                  </FormHelperText>
                  <FormHelperText sx={{ color: "#ff3e3e", m: 0 }}>
                    {errors?.currency ? errors?.currency?.message : null}
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
          </Container>
        </Box>

        <Box sx={{ pt: 2 }} className="step-bottom">
          <Container maxWidth="lg" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box sx={{ color: "#235AAC", borderBottom: "1px solid", cursor: "pointer" }}>
              Back To Dashboard
            </Box>
            <Box className="btnmargin">
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
                Proceed
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
