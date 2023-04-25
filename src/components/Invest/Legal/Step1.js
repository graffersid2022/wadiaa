import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import LeftArrow from "../../../assets/images/left-arrow.png";
import RightArrow from "../../../assets/images/right-arrow.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import COMMON from "../../Configs/Common";


//import mui components
import {
  Box,
  Grid,
  TextField,
  Button,
  Container,
  FormHelperText,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormControlLabel,
  Checkbox,
} from "@mui/material";


function Step1({ handleNext, handleBack, activeStep, user1, setUser1 }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      legalName: user1?.data?.name,
      type: user1?.data?.type,
      registrationCountry: user1?.data?.registrationCountry,
      establishedAt: user1?.data?.establishedAt,
      nature: user1?.data?.business?.nature,
      registrationNumber: user1?.data?.registrationNumber,
      step1ExpiryDate: user1?.data?.expiryDate,
      taxIdNumber: user1?.data?.taxIdNumber,
      numberOfEmployees: user1?.data?.business?.numberOfEmployees,
      name: user1?.data?.contact?.person?.name,
      email: user1?.data?.contact?.person?.email,
      phone: user1?.data?.contact?.person?.phone,
      position: user1?.data?.contact?.person?.position,
      userPhone: user1?.data?.contact?.Phone,
      userMail: user1?.data?.contact?.email
    },
  });

  const [phone, setPhone] = useState(user1.data?.contact?.phone);
  const [userPhone, setUserPhone] = useState(user1.data?.contact?.person?.phone);

  const [phone_error, setPhError] = useState({
    field: "",
    msg: "",
  })
  const [user_phone_error, setUserPhError] = useState({
    field: "",
    msg: ""
  })
  const token = localStorage.getItem("token");

  const onSubmit = (data) => {

    console.log(data)

    let passData = {
      type: "LEGAL",
      data: {
        business: {
          nature: data.nature,
          numberOfEmployees: data.numberOfEmployees,
          ownershipChangedLast5Years: data.ownershipChangedLast5Years,
          sector: data.sector,
          statusChangedLast5Years: data.statusChangedLast5Years,
        },
        contact: {
          email: data.userMail,
          person: {
            email: data.email,
            name: data.name,
            phone: phone,
            position: data.position,
          },
          phone: userPhone,
        },
        establishedAt: data.establishedAt,
        expiryDate: data.step1ExpiryDate,
        name: data.legalName,
        registrationCountry: data.registrationCountry,
        registrationNumber: data.registrationNumber,
        taxIdNumber: data.taxIdNumber,
        type: data.type,
        typeOther: data.type === "OTHER" ? "string" : null,
      }
    };

    if (!user1.type) {
      axios({
        method: "POST",
        url: `${process.env.REACT_APP_UAT_URL}/${process.env.REACT_APP_TYPE_INVESTOR}`,
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
            handleNext()
          }
        })
        .catch((error) => {
          console.log(error)
          if (error.response.status === 409) {
            toast.error("A business already exists")
          }
        })
    } else {
      axios({
        method: "PATCH",
        url: `${process.env.REACT_APP_UAT_URL}/${process.env.REACT_APP_TYPE_INVESTOR}`,
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
            getUser();
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }


  };

  const getUser = () => {
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
          setUser1(response.data)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }



  return (
    <Box >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ margin: '15px' }}>
          <Container maxWidth="lg">
            <Grid container spacing={5}>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="filled-basic"
                  label="Full Company Name *"
                  variant="filled"
                  fullWidth
                  className="step-input"
                  helperText="Name of the Company as per Legal Documents"
                  {...register("legalName", {
                    required: "Company Name is Required",
                  })}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.legalName ? errors?.legalName?.message : null}</FormHelperText>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <FormControl variant="filled" fullWidth>
                  <InputLabel
                    id="demo-simple-select-filled-label"
                    className="dropdown-label"
                  >
                    Company Entity Type*
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    className="raise-drop-down"
                    {...register("type", {
                      required: "Type is Required",
                    })}
                    defaultValue={user1.data?.type}
                  >
                    <MenuItem value="SOLE_TRADER" className="color-menu">SOLE_TRADER</MenuItem>
                    <MenuItem value="BRANCH_OF_FOREIGN_COMPANY" className="color-menu">
                      BRANCH_OF_FOREIGN_COMPANY
                    </MenuItem>
                    <MenuItem value="SAOC" className="color-menu">SAOC</MenuItem>
                    <MenuItem value="LLC" className="color-menu">LLC</MenuItem>
                    <MenuItem value="HOLDING_COMPANY" className="color-menu">HOLDING_COMPANY</MenuItem>
                    <MenuItem value="CPV" className="color-menu">CPV</MenuItem>
                    <MenuItem value="GENERAL_PARTNERSHIP" className="color-menu">
                      GENERAL_PARTNERSHIP
                    </MenuItem>
                    <MenuItem value="LIMITED_PARTNERSHIP" className="color-menu">
                      LIMITED_PARTNERSHIP
                    </MenuItem>
                    <MenuItem value="GOVERNMENT_OR_STATE" className="color-menu">
                      GOVERNMENT_OR_STATE
                    </MenuItem>
                    <MenuItem value="OTHER" className="color-menu">OTHER</MenuItem>
                  </Select>
                  <FormHelperText className="helper-text">
                    Legal type of the Company
                  </FormHelperText>
                  <FormHelperText sx={{ color: "#ff3e3e", m: 0 }}>
                    {errors?.type ? errors?.type?.message : null}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <FormControl variant="filled" fullWidth>
                  <InputLabel
                    id="demo-simple-select-filled-label"
                    className="dropdown-label"
                  >
                    Sector*
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    className="raise-drop-down"
                    {...register("sector", {
                      required: "Sector is Required",
                    })}
                    defaultValue={user1.data?.business.sector}
                  >
                    {COMMON.SECTOR.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      );
                    }
                    )}
                  </Select>
                  <FormHelperText className="helper-text">
                    Sector of the Company
                  </FormHelperText>
                  <FormHelperText sx={{ color: "#ff3e3e", m: 0 }}>
                    {errors?.sector ? errors?.sector?.message : null}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <FormControl variant="filled" fullWidth>
                  <InputLabel
                    id="demo-simple-select-filled-label"
                    className="dropdown-label"
                  >
                    Registration Country*
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    className="raise-drop-down"
                    {...register("registrationCountry", {
                      required: "Registration Country is Required",
                    })}
                    defaultValue={user1.data?.registrationCountry}
                  >
                    {Object.keys(COMMON.COUNTRIES).map((key) => (
                      <MenuItem value={key}>{COMMON.COUNTRIES[key]}</MenuItem>
                    ))}
                  </Select>
                  <FormHelperText className="helper-text">
                    Country where the Company is Registered
                  </FormHelperText>
                  <FormHelperText sx={{ color: "#ff3e3e", m: 0 }}>
                    {errors?.registrationCountry
                      ? errors?.registrationCountry?.message
                      : null}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="date"
                  label="Date of Establishment"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    max: `${COMMON.TODAYDATE}`
                  }}
                  variant="filled"
                  className="step-input"
                  fullWidth
                  helperText="Date of Establishment of the Registered Company"
                  {...register("establishedAt")}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.establishedAt ? errors?.establishedAt?.message : null}</FormHelperText>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="filled-basic"
                  label="Nature of Business*"
                  variant="filled"
                  fullWidth
                  className="step-input"
                  helperText="Primary Nature of Business of the Registered Company"
                  {...register("nature", {
                    required: "Nature Of Business is Required",
                  })}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.nature ? errors?.nature?.message : null}</FormHelperText>

              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="filled-basic"
                  label="Commercial Registration Number*"
                  variant="filled"
                  fullWidth
                  className="step-input"
                  helperText="Company Commercial Registration Number"
                  {...register("registrationNumber", {
                    required: "Registration Number is Required",
                  })}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.registrationNumber ? errors?.registrationNumber?.message : null}</FormHelperText>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="date"
                  label="Commercial Registration Expiry Date"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    min: `${COMMON.TODAYDATE}`
                  }}
                  variant="filled"
                  className="step-input"
                  fullWidth
                  helperText="Company Commercail Registration Expiry date"
                  {...register("step1ExpiryDate")}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.step1ExpiryDate ? errors?.step1ExpiryDate?.message : null}</FormHelperText>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="filled-basic"
                  label="TAX ID Number"
                  variant="filled"
                  fullWidth
                  className="step-input"
                  helperText="Company's Tax ID number"
                  {...register("taxIdNumber")}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.taxIdNumber ? errors?.taxIdNumber?.message : null}</FormHelperText>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="filled-basic"
                  label="Number of Employees*"
                  variant="filled"
                  fullWidth
                  className="step-input"
                  helperText="Total number of Employees in the Company"
                  {...register("numberOfEmployees", {
                    required: "Number Of Employees is Required",
                  })}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.numberOfEmployees ? errors?.numberOfEmployees?.message : null}</FormHelperText>
              </Grid>
              <Grid item xs={12} md={6} lg={4} className="phone-input">
                <PhoneInput
                  name="phoneNumber"
                  autoFocus={true}
                  id="filled-basic"
                  variant="filled"
                  placeholder='Phone number'
                  country={"om"}
                  value={userPhone}
                  // onChange={
                  //   (phone) => {
                  //     setUserPhone(phone)
                  //   }
                  // }
                  onChange={(e, type = "user") => (e) ? (setUserPhone(e), setUserPhError({ field: "", msg: "" })) : setUserPhError({ field: "phoneNumber", msg: "Phone Number is Required" })}
                />
                <helperText className="helper-text">Official Contact number of the Company</helperText>
                <FormHelperText sx={{ color: "#ff3e3e" }}>{user_phone_error?.msg ? user_phone_error?.msg : null}</FormHelperText>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="filled-basic"
                  label="Official Email ID *"
                  variant="filled"
                  fullWidth
                  className="step-input"
                  helperText="Official Email ID of the Registered Company"
                  {...register("userMail", {
                    required: "Email is Required",
                    pattern: {
                      value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                      message: "invalid Email",
                    }
                  })}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.userMail ? errors?.userMail?.message : null}</FormHelperText>
              </Grid>
            </Grid>
            <Grid container spacing={0}>
              <Grid item xs={12} sx={{ mt: "10px" }}>
                <FormControlLabel
                  className="business-checkbox"
                  control={
                    <Checkbox
                      {...register("ownershipChangedLast5Years")}
                      defaultChecked={user1.ownershipChangedLast5Years}
                    />
                  }
                  label="Was there a Change of Ownership in the last 5 years ?"
                  sx={{ color: "#ffffff" }}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.ownershipChangedLast5Years ? errors?.ownershipChangedLast5Years?.message : null}</FormHelperText>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  className="business-checkbox"
                  control={
                    <Checkbox
                      {...register("statusChangedLast5Years")}
                      defaultChecked={user1.statusChangedLast5Years}
                    />
                  }
                  label="Was there a Change of Legal Entity Status in the last 5 years ?"
                  sx={{ color: "#ffffff" }}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.statusChangedLast5Years ? errors?.statusChangedLast5Years?.message : null}</FormHelperText>
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
              Alternate Contact Person
            </Box>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="filled-basic"
                  label="Alternate Contact Name *"
                  variant="filled"
                  fullWidth
                  className="step-input"
                  helperText="Name of an Alternate Contact Person "
                  {...register("name", {
                    required: "Name is Required",
                  })}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.name ? errors?.name?.message : null}</FormHelperText>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="filled-basic"
                  label="Position*"
                  variant="filled"
                  fullWidth
                  className="step-input"
                  helperText="Designation of the Alternate Contact Person"
                  {...register("position", {
                    required: "Position is Required",
                  })}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.position ? errors?.position?.message : null}</FormHelperText>
              </Grid>
              <Grid item xs={12} md={6} lg={4} className="phone-input">
                <PhoneInput
                  name="phoneNumber*"
                  autoFocus={true}
                  id="filled-basic"
                  variant="filled"
                  placeholder='Phone number'
                  country={"om"}
                  value={phone}
                  // onChange={
                  //   (phone) => {
                  //     setPhone(phone)
                  //   }
                  // }
                  onChange={(e) => (e) ? (setPhone(e), setPhError({ field: "", msg: "" })) : setPhError({ field: "phoneNumber", msg: "Phone Number is Required" })}

                />
                <helperText className="helper-text">Phone number of the Alternate Contact Person</helperText>
                <FormHelperText sx={{ color: "#ff3e3e" }}>{phone_error?.msg ? phone_error?.msg : null}</FormHelperText>

              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="filled-basic"
                  label="Alternate Email ID*"
                  variant="filled"
                  fullWidth
                  className="step-input"
                  helperText="Email ID of the Alternate Contact Person "
                  {...register("email", {
                    required: "Email is Required",
                  })}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.email ? errors?.email?.message : null}</FormHelperText>
              </Grid>
            </Grid>
          </Container>
        </Box>
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
            <Box className="btnmargin">
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
              <Button
                // onClick={handleNext}
                type="submit"
                sx={{ mr: 1 }}
                className="next-btn"
              >
                Proceed
                <img
                  src={RightArrow}
                  alt="rightarrow"
                  className="arrow-image"
                />
              </Button>
            </Box>
          </Container>
        </Box>
      </form>
    </Box>
  );
}

export default Step1;
