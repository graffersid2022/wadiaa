import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import LeftArrow from "../../../assets/images/left-arrow.png";
import RightArrow from "../../../assets/images/right-arrow.png";
import { get, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import COMMON from "../../Configs/Common";
import { useSelector } from "react-redux";
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import dayjs from "dayjs";
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


function Step1({ handleNext, handleBack, activeStep, user1, setUser1, getDetails }) {
  const preScreeningData = useSelector((state) => state.commonState.preScreeningContent);



  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm(
    {
      defaultValues: {
        legalName: user1?.name,
        type: user1?.type,
        establishedAt: user1?.establishedAt,
        registrationCountry: user1?.registrationCountry,
        nature: user1?.business?.nature,
        sector: user1?.business?.sector,
        registrationNumber: user1?.registrationNumber,
        expiryDate: user1?.step1ExpiryDate,
        taxIdNumber: user1?.taxIdNumber,
        numberOfEmployees: user1?.business?.numberOfEmployees,
        name: user1?.contact?.person?.name,
        userMail: user1?.contact?.email,
        position: user1?.contact?.person?.position,
        email: user1?.contact?.person?.email,
        ownershipChangedLast5Years: user1?.business?.ownershipChangedLast5Years,
        statusChangedLast5Years: user1?.business?.statusChangedLast5Years,
      },
    }
  );

  const [phone, setPhone] = useState(user1?.contact?.phone);
  const [userPhone, setUserPhone] = useState(user1?.contact?.person?.phone);
  
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
    console.log(phone)
    if(String(userPhone).length<10)
    {
      setUserPhError({ field: "phoneNumber", msg: "Phone Number is Required" })
      return 0
    }
    // if(String(phone).length<10)
    // {
    //   setPhError({ field: "phoneNumber", msg: "Phone Number is Required" })
    //   return 0
    // }
    let passData = {
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
    };
    if (watch("registrationCountry") !== preScreeningData?.companyRegistrationCountry) {
      toast.error("Company registration country does not match with pre-screening country")
    }
    else if (!user1.name) {
      axios({
        method: "POST",
        url: `${process.env.REACT_APP_UAT_URL}/${process.env.REACT_APP_TYPE_BUSINESS}`,
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
        url: `${process.env.REACT_APP_UAT_URL}/${process.env.REACT_APP_TYPE_BUSINESS}`,
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
      url: `${process.env.REACT_APP_UAT_URL}/${process.env.REACT_APP_TYPE_BUSINESS}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...COMMON.SECURITY_HEADERS
      },
    })
      .then((response) => {
        if (response?.status === 200) {
          setUser1(response.data)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <Container maxWidth="lg">
            <Grid container spacing={5}>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="filled-basic"
                  label="Registered Company Name*"
                  variant="filled"
                  fullWidth
                  className="step-input"
                  helperText="Name of the Registered Company"
                  {...register("legalName", {
                    required: "Company Name is Required",
                    maxLength: {
                      value: 70,
                      message: "Name must be less than 70 characters",
                    },
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
                    Registered Entity Type*
                  </InputLabel>
                  <Select
                    defaultValue={user1 && user1?.type}
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    className="raise-drop-down"
                    {...register("type", {
                      required: "Type is Required",
                    })}
                  >
                    {COMMON.COMPANYTYPE.map((item) => {
                      return (
                        <MenuItem value={item} className="color-menu">{item}</MenuItem>
                      );
                    })}
                  </Select>
                  <FormHelperText className="helper-text">
                    Company Registration Type
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
                    Registered Company Sector*
                  </InputLabel>
                  <Select
                    defaultValue={user1 && user1?.business?.sector}
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    className="raise-drop-down"
                    {...register("sector", {
                      required: "Sector is Required",
                    })}
                  >
                    {COMMON.SECTOR.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item} className="color-menu">
                          {item}
                        </MenuItem>
                      );
                    }
                    )}
                  </Select>
                  <FormHelperText className="helper-text">
                    Company Sector Type
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
                    Registration Country
                  </InputLabel>
                  <Select
                    defaultValue={preScreeningData.companyRegistrationCountry ? preScreeningData.companyRegistrationCountry : user1?.registrationCountry}
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    className="raise-drop-down"
                    {...register("registrationCountry")}
                  >
                    {Object.keys(COMMON.COUNTRIES).map((key) => (
                      <MenuItem value={key} className="color-menu">{COMMON.COUNTRIES[key]}</MenuItem>
                    ))}
                  </Select>
                  <FormHelperText className="helper-text">
                  Country in which the Company is Registered
                  </FormHelperText>
                  <FormHelperText sx={{ color: "#ff3e3e", m: 0 }}>
                    {errors?.registrationCountry
                      ? errors?.registrationCountry?.message
                      : null}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
              {/* <LocalizationProvider dateAdapter={AdapterDayjs} className="step-input">
              <DemoContainer components={['DatePicker']} style={{width:'100%'}}>
                <DatePicker 
                 label="Date of Establishment"
                 id="date"
                 maxDate={dayjs()}
                 variant="filled"
                  className="step-input"
                  fullWidth
                value={user1?.establishedAt} 
                renderInput={(params) => <TextField {...params} fullWidth sx={{width: '100%'}}/>}
                 />
              </DemoContainer>
            </LocalizationProvider> */}
                <TextField
                  id="date"
                  label="Date of Establishment"
                  type="date"
                  format="MM/dd/yyyy"
                  defaultValue={user1?.establishedAt}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    max: `${COMMON.TODAYDATE}`,
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
                  helperText="Business Nature of the Registered Company"
                  {...register("nature", {
                    required: "Nature is Required",
                    maxLength: {
                      value: 255,
                      message: "Nature of Business must be less than 255 characters",
                    },
                  })}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.nature ? errors?.nature?.message : null}</FormHelperText>

              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  value={preScreeningData.companyRegistrationNumber}
                  id="filled-basic"
                  label="Company Registration Number*"
                  variant="filled"
                  fullWidth
                  className="step-input"
                  helperText="Registration number of the company"
                  {...register("registrationNumber", {
                    required: "Registration Number is Required",
                    maxLength: {
                      value: 50,
                      message: "Registration Number must be less than 50 characters",
                    },
                  })}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.registrationNumber ? errors?.registrationNumber?.message : null}</FormHelperText>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="date"
                  label="Registration Expiry date"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="filled"
                  className="step-input"
                  fullWidth
                  defaultValue={user1?.expiryDate}
                  inputProps={{
                    min: `${COMMON.TODAYDATE}`,
                  }}
                  helperText="Company registration expiry date"
                  {...register("step1ExpiryDate")}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.expiryDate ? errors?.expiryDate?.message : null}</FormHelperText>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="filled-basic"
                  label="Tax ID Number"
                  variant="filled"
                  fullWidth
                  className="step-input"
                  helperText="TAX ID number of the Registered Company"
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
                    required: "Number of Employees is Required",
                    min: {
                      value: 1,
                      message: "Number of Employees must be atleast 1",
                    },
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
                  placeholder='Phone number*'
                  country={"om"}
                  value={userPhone}
                  // onChange={
                  //   (phone) => {
                  //     setUserPhone(phone)
                  //   }
                  // }
                  onChange={(e) => (COMMON.handleInput(e, COMMON.arrayOfCountries)) ? (setUserPhone(e), setUserPhError({ field: "", msg: "" })) : (setUserPhError({ field: "phoneNumber", msg: "Phone Number is Required" }))}
                  onBlur={()=>String(userPhone).length>10?setUserPhError({ field: "", msg: "" }):setUserPhError({ field: "phoneNumber", msg: "Phone Number is Required" })}
                />
                <helperText className="helper-text">Company landline number with international code</helperText>
                <FormHelperText sx={{ color: "#ff3e3e" }}>{user_phone_error?.msg ? user_phone_error?.msg : null}</FormHelperText>
                {/* <FormHelperText sx={{ color: "#ff3e3e" }}>{user_phone_error.msg!==""?user_phone_error.msg:""}</FormHelperText> */}
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="filled-basic"
                  label="Company Email Address*"
                  variant="filled"
                  fullWidth
                  className="step-input"
                  helperText="Official Email ID of the Registered Company"
                  {...register("userMail", {
                    required: "Email is Required",
                    // email pattern
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
                      defaultChecked={user1?.business?.ownershipChangedLast5Years}
                      {...register("ownershipChangedLast5Years")}

                    />
                  }
                  label="Please select the box if there was a change in ownership in the last 5 years *"
                  sx={{ color: "#ffffff" }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  className="business-checkbox"
                  control={
                    <Checkbox
                      defaultChecked={user1?.business?.statusChangedLast5Years}
                      {...register("statusChangedLast5Years")}
                    />
                  }
                  label="Please select the box if there was a change in legal Entity status in the last 5 years *"
                  sx={{ color: "#ffffff" }}
                />
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
                  label="Alternate Contact Person's Name*"
                  variant="filled"
                  fullWidth
                  className="step-input"
                  helperText="Name of an Alternate Contact Person"
                  {...register("name", {
                    required: "Name is Required",
                    maxLength: {
                      value: 100,
                      message: "Name must be less than 100 characters",
                    },
                  })}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.name ? errors?.name?.message : null}</FormHelperText>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="filled-basic"
                  label="Alternate Contact Person Designation*"
                  variant="filled"
                  fullWidth
                  className="step-input"
                  helperText="Designation of the Alternate Contact Person"
                  {...register("position", {
                    required: "Position is Required",
                    maxLength: {
                      value: 100,
                      message: "Position must be less than 100 characters",
                    },
                  })}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.position ? errors?.position?.message : null}</FormHelperText>
              </Grid>
              <Grid item xs={12} md={6} lg={4} className="phone-input">
                <PhoneInput
                  name="phoneNumber"
                  autoFocus={true}
                  id="filled-basic"
                  variant="filled"
                  placeholder='Phone number*'
                  country={"om"}
                  value={phone}
                  onChange={(e) => (COMMON.handleInput(e, COMMON.arrayOfCountries)) ? (setPhone(e), setPhError({ field: "", msg: "" })) : (setPhError({ field: "phoneNumber", msg: "Phone Number is Required" }))}
                  onBlur={()=>String(phone).length>10?setPhError({ field: "", msg: "" }):setPhError({ field: "phoneNumber", msg: "Phone Number is Required" })}

                />
                <helperText className="helper-text">Phone number of the Alternate Contact Person</helperText>
                <FormHelperText sx={{ color: "#ff3e3e" }}>{phone_error?.msg ? phone_error?.msg : null}</FormHelperText>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="filled-basic"
                  label="Alternate Contact Person's Email ID*"
                  variant="filled"
                  fullWidth
                  className="step-input"
                  helperText="Email ID of the Alternate Contact Person*"
                  {...register("email", {
                    required: "Email is Required",
                    pattern: {
                      value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                      message: "invalid Email",
                    }
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
              <Button
                // onClick={handleNext}
                type="submit"
                sx={{ mr: 1 }}
                className="next-btn"
              >
                Save & Proceed
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
