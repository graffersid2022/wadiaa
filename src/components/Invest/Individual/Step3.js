import React, { useEffect } from "react";
import LeftArrow from "../../../assets/images/left-arrow.png";
import RightArrow from "../../../assets/images/right-arrow.png";
import { useForm } from "react-hook-form";
import axios from "axios";

//import mui components
import {
  Box,
  Grid,
  TextField,
  Container,
  Button,
  FormHelperText,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { investorContent } from "../../Actions/InvestorAction";
import COMMON from "../../Configs/Common";

function Step3({ handleNext, handleBack, activeStep, user3, setUser3 }) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(
    {
      defaultValues: {
        totalAnnualInvestments: user3?.totalAnnualInvestments,
        totalGrossJointAnnualIncome: user3?.totalGrossJointAnnualIncome,
        totalGrossPersonalAnnualIncome: user3?.totalGrossPersonalAnnualIncome,
        totalNetJointAssets: user3?.totalNetJointAssets,
        totalNetPersonalAssets: user3?.totalNetPersonalAssets,
        wealthSource: user3?.wealthSource
      },
    }
  )
  const token = localStorage.getItem("token");
  const onSubmit = (data) => {
    let passData = {
      currency: data.currency,
      totalAnnualInvestments: data.totalAnnualInvestments,
      totalGrossJointAnnualIncome: data.totalGrossJointAnnualIncome,
      totalGrossPersonalAnnualIncome: data.totalGrossPersonalAnnualIncome,
      totalNetJointAssets: data.totalNetJointAssets,
      totalNetPersonalAssets: data.totalNetPersonalAssets,
      wealthSource: data.wealthSource
    }

    axios({
      method: "PATCH",
      url: `${process.env.REACT_APP_UAT_URL}/${process.env.REACT_APP_TYPE_INVESTOR}/income`,
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
          getIncomeData();
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const getIncomeData = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_UAT_URL}/investor/income`,
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

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ margin: '10px' }}>
          <Container maxWidth="lg">
            <Grid container spacing={5}>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="filled-basic"
                  label="Source of wealth*"
                  variant="filled"
                  fullWidth
                  className="step-input"
                  helperText="Provide the Primary Source of Income"
                  {...register("wealthSource", {
                    required: "wealthSource Current is Required",
                  })}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.wealthSource ? errors?.wealthSource?.message : null}</FormHelperText>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="filled-basic"
                  label="Total Joint Assets Value *"
                  variant="filled"
                  fullWidth
                  className="step-input"
                  helperText="Total value of Joint Assets owned"
                  {...register("totalNetJointAssets", {
                    required: "totalNetJointAssets is Required",
                    pattern: {
                      value: /^[0-9]*$/,
                      message: "Please enter a valid number",
                    },
                  })}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.totalNetJointAssets ? errors?.totalNetJointAssets?.message : null}</FormHelperText>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="filled-basic"
                  label="Total Peronal Asset Value*"
                  variant="filled"
                  fullWidth
                  className="step-input"
                  helperText="Total value of Personal Assets"
                  {...register("totalNetPersonalAssets", {
                    required: "totalNetPersonalAssets is Required",
                    pattern: {
                      value: /^[0-9]*$/,
                      message: "Please enter a valid number",
                    },
                  })}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.totalNetPersonalAssets ? errors?.totalNetPersonalAssets?.message : null}</FormHelperText>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="filled-basic"
                  label="Gross  Total in USD (Including Spouse - If Applicable)*"
                  variant="filled"
                  fullWidth
                  className="step-input"
                  helperText="Total wealth owned in USD (Including Spouse - if Applicable)"
                  {...register("totalGrossJointAnnualIncome", {
                    required: "totalGrossJointAnnualIncome is Required",
                    pattern: {
                      value: /^[0-9]*$/,
                      message: "Please enter a valid number",
                    },
                  })}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.totalGrossJointAnnualIncome ? errors?.totalGrossJointAnnualIncome?.message : null}</FormHelperText>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="filled-basic"
                  label="Gross Annual Income in USD*"
                  variant="filled"
                  fullWidth
                  className="step-input"
                  helperText="Total Annual Income in USD ?"
                  {...register("totalGrossPersonalAnnualIncome", {
                    required: "totalGrossPersonalAnnualIncome is Required",
                    pattern: {
                      value: /^[0-9]*$/,
                      message: "Please enter a valid number",
                    },

                  })}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.totalGrossPersonalAnnualIncome ? errors?.totalGrossPersonalAnnualIncome?.message : null}</FormHelperText>
              </Grid>

              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="filled-basic"
                  label="Gross Annual Investments in USD  *"
                  variant="filled"
                  fullWidth
                  className="step-input"
                  helperText="Total Investments made Annually in USD"
                  {...register("totalAnnualInvestments", {
                    required: "totalAnnualInvestments is Required",
                    pattern: {
                      value: /^[0-9]*$/,
                      message: "Please enter a valid number",
                    },
                  })}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.totalAnnualInvestments ? errors?.totalAnnualInvestments?.message : null}</FormHelperText>
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
                    defaultValue={user3?.currency}
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    className="raise-drop-down"
                    {...register("currency", {
                      required: "currency is Required",
                    })}
                  >
                    <MenuItem value="USD" className="color-menu">USD</MenuItem>
                    <MenuItem value="OMR" className="color-menu">
                      OMR
                    </MenuItem>
                    <MenuItem value="AED" className="color-menu">AED</MenuItem>
                    <MenuItem value="QAR" className="color-menu">QAR</MenuItem>
                    <MenuItem value="SAR" className="color-menu">SAR</MenuItem>
                    <MenuItem value="BHD" className="color-menu">BHD</MenuItem>
                    <MenuItem value="KWD" className="color-menu">
                      KWD
                    </MenuItem>
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
