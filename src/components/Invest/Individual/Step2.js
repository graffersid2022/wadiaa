import React, { useEffect } from "react";
import LeftArrow from "../../../assets/images/left-arrow.png";
import RightArrow from "../../../assets/images/right-arrow.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Box,
  Grid,
  TextField,
  Container,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  helperText,
  FormHelperText,
} from "@mui/material";
import { toast } from "react-toastify";
import COMMON from "../../Configs/Common";
import { useDispatch, useSelector } from "react-redux";
import { investorContent } from "../../Actions/InvestorAction";

function Step2({ handleNext, handleBack, activeStep, user2, setUser2 }) {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(
    {
      defaultValues: {
        apartment: user2?.current?.apartment,
        building: user2?.current?.building,
        city: user2?.current?.city,
        poBox: user2?.current?.poBox,
        postalCode: user2?.current?.postalCode,
        state: user2?.current?.state,
        street: user2?.current?.street,
        line1: user2?.permanent?.line1,
        line2: user2?.permanent?.line2,
        postalCode: user2?.permanent?.postalCode
      },
    }
  )
  const token = localStorage.getItem("token");

  const onSubmit = (data) => {
    let passData = {
      current: {
        apartment: data.apartment,
        building: data.building,
        city: data.city,
        country: data.step2Country,
        poBox: data.poBox,
        postalCode: data.postalCode,
        state: data.state,
        street: data.street
      },
      permanent: {
        country: data.step2Country2,
        line1: data.line1,
        line2: data.line2,
        postalCode: data.postalCode
      }
    }

    axios({
      method: "PATCH",
      url: `${process.env.REACT_APP_UAT_URL}/${process.env.REACT_APP_TYPE_INVESTOR}/address`,
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
          getAddressData();
        }
      })
      .catch((error) => {
        console.log(error)

      })
  };

  const getAddressData = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_UAT_URL}/investor/address`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...COMMON.SECURITY_HEADERS

      },
    })
      .then((response) => {
        if (response.status === 200) {
          setUser2(response.data)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }



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
              }}
            >
              Company Current Address
            </Box>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="filled-basic"
                  label="House/Flat number"
                  variant="filled"
                  fullWidth
                  className="step-input"
                  helperText="Provide the Flat number (or) Building number"
                  {...register("apartment")}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="filled-textarea"
                  label="House/Building name *"
                  multiline
                  variant="filled"
                  fullWidth
                  helperText="Name of the Building"
                  className="multiples-input"
                  {...register("building", {
                    required: "building is Required",
                  })}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.building ? errors?.building?.message : null}</FormHelperText>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="filled-basic"
                  label="Street Name*"
                  variant="filled"
                  fullWidth
                  className="step-input"
                  helperText="Name of the street"
                  {...register("street", {
                    required: "street is Required",
                  })}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.street ? errors?.street?.message : null}</FormHelperText>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="filled-basic"
                  label="P.O. Box"
                  variant="filled"
                  fullWidth
                  className="step-input"
                  helperText="P.O Box number of the Investor"
                  {...register("poBox")}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="filled-basic"
                  label="Postal/​Zip Code"
                  variant="filled"
                  fullWidth
                  className="step-input"
                  helperText="Postal Code of the Investor"
                  {...register("postalCode")}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="filled-basic"
                  label="City*"
                  variant="filled"
                  fullWidth
                  className="step-input"
                  helperText="Name of the City where the Investor is located"
                  {...register("city", {
                    required: "city is Required",
                  })}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.city ? errors?.city?.message : null}</FormHelperText>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="filled-basic"
                  label="State/​Governorate"
                  variant="filled"
                  fullWidth
                  className="step-input"
                  helperText="Name of the State where the Investor is located"
                  {...register("state")}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <FormControl variant="filled" fullWidth>
                  <InputLabel
                    id="demo-simple-select-filled-label"
                    className="dropdown-label"
                  >
                    Country*
                  </InputLabel>
                  <Select
                    defaultValue={user2?.current?.country}
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    className="raise-drop-down"
                    {...register("step2Country", {
                      required: "Country is Required",
                    })}
                  >
                    {Object.keys(COMMON.COUNTRIES).map((key) => (
                      <MenuItem value={key} className="color-menu">{COMMON.COUNTRIES[key]}</MenuItem>
                    ))}
                  </Select>
                  <FormHelperText className="helper-text">
                    Name of Country where the Investor is located
                  </FormHelperText>
                  <FormHelperText sx={{ color: "#ff3e3e", m: 0 }}>
                    {errors?.step2Country
                      ? errors?.step2Country?.message
                      : null}
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            <Box
              sx={{
                color: "#151515",
                fontWeight: "700",
                fontSize: "16px",
                width: "100%",
                mt: 4
              }}
            >
              Company Permanent Address
            </Box>
            <Grid container spacing={4}>
              <Grid item xs={12} lg={12}>
                <TextField
                  id="filled-textarea"
                  label="Company Address line 1 *"
                  multiline
                  variant="filled"
                  fullWidth
                  helperText="Address for the Company"
                  className="multiples-input"
                  {...register("line1", {
                    required: "Address line1 is Required",
                  })}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.line1 ? errors?.line1?.message : null}</FormHelperText>
              </Grid>
              <Grid item xs={12} lg={12}>
                <TextField
                  id="filled-textarea"
                  label="Company Address line 2 *"
                  multiline
                  variant="filled"
                  fullWidth
                  helperText="Address for the Company"
                  className="multiples-input"
                  {...register("line2", {
                    required: "Address line2 is Required",
                  })}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.line2 ? errors?.line2?.message : null}</FormHelperText>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="filled-basic"
                  label="Company Postal Code*"
                  variant="filled"
                  fullWidth
                  className="step-input"
                  helperText="Postal Code of the Company"
                  {...register("postalCode", {
                    required: "postalCode is Required",
                  })}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.postalCode ? errors?.postalCode?.message : null}</FormHelperText>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <FormControl variant="filled" fullWidth>
                  <InputLabel
                    id="demo-simple-select-filled-label"
                    className="dropdown-label"
                  >
                    Company Registered Country*
                  </InputLabel>
                  <Select
                    defaultValue={user2?.permanent?.country}
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    className="raise-drop-down"
                    {...register("step2Country2", {
                      required: "Country is Required",
                    })}
                  >
                    {Object.keys(COMMON.COUNTRIES).map((key) => (
                      <MenuItem value={key} className="color-menu">{COMMON.COUNTRIES[key]}</MenuItem>
                    ))}
                  </Select>
                  <FormHelperText className="helper-text">
                    Country where the Company is Registered
                  </FormHelperText>
                  <FormHelperText sx={{ color: "#ff3e3e", m: 0 }}>
                    {errors?.step2Country2
                      ? errors?.step2Country2?.message
                      : null}
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

export default Step2;
