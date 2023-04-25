import React from "react";

//import mui components
import {
  Box,
  Grid,
  TextField,
  Button,
  Container,
  FormHelperText,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import LeftArrow from "../../../assets/images/left-arrow.png";
import RightArrow from "../../../assets/images/right-arrow.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import COMMON from "../../Configs/Common";
import { toast } from "react-toastify";

function Step5({ handleNext, handleBack, activeStep, user5, setUser5 }) {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm(
    {
      defaultValues: {
        bankName: user5?.bankName,
        currency: user5?.currency,
        number: user5?.number,
        openedAt: user5?.openedAt,
        status: user5?.status,
        bankAddress: user5?.bankAddress,
        bankBic: user5?.bankBic
      },
    }
  )

  const token = localStorage.getItem("token");

  const onSubmit = (data) => {
    let passData = {
      bankAccounts: [
        {
          bankName: data.bankName,
          currency: data.currency,
          dividend: true,
          master: true,
          number: data.number,
          openedAt: data.openedAt,
          status: data.status && "ACTIVE",
          bankAddress: data.bankAddress,
          bankBic: data.bankBic
        }
      ]
    }


    axios({
      method: "PATCH",
      url: `${process.env.REACT_APP_UAT_URL}/${process.env.REACT_APP_TYPE_BUSINESS}/bank/accounts`,
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
          getBankData();
        }
      })
      .catch((error) => {
        console.log(error)
        if (error.response.status === 400) {
          toast.error(error.response.data.violations[1].message)
        }
      })
  };

  const getBankData = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_UAT_URL}/${process.env.REACT_APP_TYPE_BUSINESS}/bank/accounts`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...COMMON.SECURITY_HEADERS
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setUser5({ ...user5, ...response.data.content[0] })
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
          <Grid container spacing={5}>
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                id="filled-basic"
                label="Bank Account Number*"
                variant="filled"
                fullWidth
                className="step-input"
                helperText="Company's Bank Account Number"
                {...register("number", {
                  required: "A/C Number is Required",
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
                helperText="Date when the Company Account was Opened"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  max: `${COMMON.TODAYDATE}`,
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
                helperText="Provide the name of the bank"
                {...register("bankName", {
                  required: "Bank Name is Required",
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
                helperText="Address of Bank"
                {...register("bankAddress", {
                  required: "Bank Address is Required",
                })}
              />
              <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.bankAddress ? errors?.bankAddress?.message : null}</FormHelperText>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                id="filled-basic"
                label="Bank Routing Code*"
                variant="filled"
                fullWidth
                className="step-input"
                helperText="Routing (IFSC) Code of the Bank"
                {...register("bankBic", {
                  required: "Bank Routing Code is Required",
                })}
              />
              <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.bankBic ? errors?.bankBic?.message : null}</FormHelperText>
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
                  defaultValue={user5?.currency}
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  className="raise-drop-down"
                  {...register("currency", {
                    required: "Currency is Required",
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
                  Currency Type
                </FormHelperText>
                <FormHelperText sx={{ color: "#ff3e3e", m: 0 }}>
                  {errors?.currency ? errors?.currency?.message : null}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                className="business-checkbox"
                control={
                  <Checkbox
                    defaultChecked={user5?.status === "ACTIVE" ? true : false}
                    {...register("status", {
                      required: "Your account must be active",
                    })}
                  />
                }
                label="Please check the box, if the account is currently in use (or) in active status ?"
                sx={{ color: "#000000", fontSize: { xs: '12px', sm: "18px" } }}
              />
              <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.status ? errors?.status?.message : null}</FormHelperText>
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
                sx={{ mr: 1 }} className="next-btn">
                Save & Proceed
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
