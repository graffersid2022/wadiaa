import React, { useEffect } from "react";

//import mui components
import {
  Box,
  Grid,
  TextField,
  Button,
  Container,
  FormHelperText,
  FormControlLabel,
  Checkbox,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import LeftArrow from "../../../assets/images/left-arrow.png";
import RightArrow from "../../../assets/images/right-arrow.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import COMMON from "../../Configs/Common";
import {  useSelector } from "react-redux";
import { investorContent } from "../../Actions/InvestorAction";
import { toast } from "react-toastify";


function Step5({ handleNext, handleBack, activeStep, user4, setUser4 }) {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      bankName: user4?.bankName,
      currency: user4?.currency,
      dividend: user4?.dividend,
      master: user4?.master,
      number: user4?.number,
      openedAt: user4?.openedAt,
      status: user4?.status,
      bankAddress: user4?.bankAddress,
      bankBic: user4?.bankBic
    },
  })

  const token = localStorage.getItem("token");

  const onSubmit = (data) => {
    console.log(data);
    let passData = {
      bankAccounts: [
        {
          bankName: data.bankName,
          currency: data.currency,
          dividend: data.dividend,
          master: data.master,
          number: data.number,
          openedAt: data.openedAt,
          status: data.status ? "ACTIVE" : "",
          bankAddress: data.bankAddress,
          bankBic: data.bankBic
        }
      ]
    }

    axios({
      method: "PATCH",
      url: `${process.env.REACT_APP_UAT_URL}/${process.env.REACT_APP_TYPE_INVESTOR}/bank/accounts`,
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
          getBankData();
        }
      })
      .catch((error) => {
        console.log(error)
        if (error.response.status === 400) {
          toast.error(error.response.data.violations[0].message)
        }
      })
  };

  const getBankData = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_UAT_URL}/investor/bank/accounts`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...COMMON.SECURITY_HEADERS

      },
    })
      .then((response) => {
        if (response.status === 200) {
          setUser4(response.data.content[0])
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
                  label="Bank Account Number*"
                  variant="filled"
                  fullWidth
                  className="step-input"
                  helperText="Investor's Bank Account Number"
                  {...register("number", {
                    required: "Number is Required",
                  })}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.number ? errors?.number?.message : null}</FormHelperText>

              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="filled-basic"
                  label="Account Opening Date"
                  variant="filled"
                  fullWidth
                  className="step-input"
                  helperText="Date when the Bank Account was Opened"
                  inputProps={{
                    max: `${COMMON.TODAYDATE}`,
                  }}
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("openedAt")}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.openedAt ? errors?.openedAt?.message : null}</FormHelperText>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="filled-basic"
                  label="Bank Name*"
                  variant="filled"
                  fullWidth
                  className="step-input"
                  helperText="Name of the Bank "
                  {...register("bankName", {
                    required: "BankName is Required",
                  })}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.bankName ? errors?.bankName?.message : null}</FormHelperText>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="filled-basic"
                  label="Bank Address*"
                  variant="filled"
                  fullWidth
                  className="step-input"
                  helperText="Address of the Bank"
                  {...register("bankAddress", {
                    required: "BankAddress is Required",
                  })}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.bankName ? errors?.bankName?.message : null}</FormHelperText>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="filled-basic"
                  label="Bank BIC code*"
                  variant="filled"
                  fullWidth
                  className="step-input"
                  helperText="Provide the Bank's Swift/IFSC/IBAN code"
                  {...register("bankBic", {
                    required: "BankBic is Required",
                  })}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.bankName ? errors?.bankName?.message : null}</FormHelperText>
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
                    defaultValue={user4?.currency}
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    className="raise-drop-down"
                    {...register("currency", {
                      required: "Currency is Required",
                    })}
                  >
                    <MenuItem value="USD" className="color-menu" >USD</MenuItem>
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
                    Account currency
                  </FormHelperText>
                  <FormHelperText sx={{ color: "#ff3e3e", m: 0 }}>
                    {errors?.currency ? errors?.currency?.message : null}
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel control={<Checkbox className="business-checkbox"
                defaultChecked={user4?.status === "ACTIVE" ? true : false}
                {
                ...register("status", {
                  required: "Status is Required",
                })
                }
              />} label="Account Status is active* ?" sx={{ color: "#000", fontSize: { xs: '12px', sm: "18px" } }} />
              <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.status ? errors?.status?.message : null}</FormHelperText>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                className="business-checkbox"
                control={
                  <Checkbox
                    defaultChecked={user4?.master}
                    {...register("master", {
                      required: "Master Account is Required",
                    })}
                  />
                }
                label="Master Account details* ?"
                sx={{ color: "#000000", fontSize: { xs: '12px', sm: "18px" } }}
              />
              <FormHelperText sx={{ color: "#ff3e3e", m: 0 }}>
                {errors?.master ? errors?.master?.message : null}
              </FormHelperText>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                className="business-checkbox"
                control={
                  <Checkbox
                    defaultChecked={user4?.dividend}
                    {...register("dividend")}
                  />
                }
                label="Divident Account details (If Applicable)"
                sx={{ color: "#000000", fontSize: { xs: '12px', sm: "18px" } }}
              />
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
                sx={{ mr: 1 }} className="next-btn">
                Proceed
                <img src={RightArrow} alt="rightarrow" className='arrow-image' />
              </Button>
            </Box>
          </Container>
        </Box>
      </form>
    </Box>
  );
}

export default Step5;
