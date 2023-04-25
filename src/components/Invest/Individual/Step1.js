import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import LeftArrow from "../../../assets/images/left-arrow.png";
import RightArrow from "../../../assets/images/right-arrow.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
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
  helperText
} from "@mui/material";
import COMMON from "../../Configs/Common";
import { useDispatch, useSelector } from "react-redux";
import { investorContent } from "../../Actions/InvestorAction";

function Step1({ handleNext, handleBack, activeStep, user1, setUser1 }) {
  const [phone, setPhone] = useState(user1?.data?.person?.phone);
  const [userPhone, setUserPhone] = useState(user1?.data?.idDocument?.number);
  const [altPhone, setAltPhone] = useState(user1?.data?.contact?.phone);
  const [phone_error, setPhError] = useState({
    field: "",
    msg: ""
  })
  const [user_phone_error, setUserPhError] = useState({
    field: "",
    msg: ""
  })
  const [alt_phone_error, setAltPhError] = useState({
    field: "",
    msg: ""
  })
  const dispatch = useDispatch();
  const state = useSelector((state) => state.InvestorReducer);


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm(
    {
      defaultValues: {
        email: user1?.data?.person?.email,
        name: user1?.data?.contact?.name,
        position: user1?.data?.contact?.position,
        country: user1?.data?.idDocument?.country,
        issuePlace: user1?.data?.idDocument?.issuePlace,
        number: user1?.data?.idDocument?.number,
        nationality: user1?.data?.nationality,
        companyAddress: user1?.data?.occupation?.companyAddress,
        companyName: user1?.data?.occupation?.companyName,
        occupation: user1?.data?.occupation?.occupation,
        birthPlace: user1?.data?.person?.birthPlace,
        email: user1?.data?.contact?.email,
        givenName: user1?.data?.person?.givenName,
        lastName: user1?.data?.person?.lastName,
        taxIdNumber: user1?.data?.taxIdNumber,
        contactName: user1?.data?.contact?.name,
        contactEmail: user1?.data?.contact?.email,

      }
    }
  );

  const token = localStorage.getItem("token");

  const onSubmit = (data) => {
    let passData = {
      type: "INDIVIDUAL",
      data: {
        contact: {
          email: data.contactEmail,
          name: data.contactName,
          phone: altPhone,
          position: data.position
        },
        education: data.education,
        gender: data.gender,
        idDocument: {
          country: data.country,
          expiryDate: data.expiryDate,
          issueDate: data.issueDate,
          issuePlace: data.issuePlace,
          number: data.number,
          type: data.type
        },
        nationality: data.nationality,
        occupation: {
          companyAddress: data.companyAddress,
          companyContactNumber: userPhone,
          companyName: data.companyName,
          employmentType: data.employmentType,
          occupation: data.occupation,
        },
        person: {
          birthDate: data.birthDate,
          birthPlace: data.birthPlace,
          email: data.email,
          givenName: data.givenName,
          lastName: data.lastName,
          phone: phone,
          residenceCountry: data.residenceCountry,
        },
        taxIdNumber: data.taxIdNumber,
      }
    }

    if (!user1.type) {
      axios({
        method: "POST",
        url: `${process.env.REACT_APP_UAT_URL}/${process.env.REACT_APP_TYPE_INVESTOR}`,
        data: passData,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Content-Type-Options": "nosniff",
          "Strict-Transport-Security": "max-age=max-age=63072000;includeSubDomains; preload",
          "X-Frame-Options": "SAMEORIGIN",
          "X-XSS-Protection": 1,
          Authorization: `Bearer ${token}`
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
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ margin: '15px' }}>
          <Container maxWidth="lg">
            <Grid container spacing={5}>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="filled-basic"
                  label="First Name*"
                  variant="filled"
                  fullWidth
                  className="step-input"
                  helperText="Provide the First Name of the Investor"
                  {...register("givenName", {
                    required: "givenName is Required",
                  })}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.givenName ? errors?.givenName?.message : null}</FormHelperText>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="filled-basic"
                  label="Last Name*"
                  variant="filled"
                  fullWidth
                  className="step-input"
                  helperText="Provide the Last Name of the Investor"
                  {...register("lastName", {
                    required: "lastName is Required",
                  })}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.lastName ? errors?.lastName?.message : null}</FormHelperText>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <FormControl variant="filled" fullWidth>
                  <InputLabel
                    id="demo-simple-select-filled-label"
                    className="dropdown-label"
                  >
                    Residence Country*
                  </InputLabel>
                  <Select
                    defaultValue={user1?.data?.person?.residenceCountry}
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    className="raise-drop-down"
                    {...register("residenceCountry", {
                      required: "Registration Country is Required",
                      setValueAs: (value) => value,
                    })}
                  >
                    {Object.keys(COMMON.COUNTRIES).map((key) => (
                      <MenuItem value={key} className="color-menu">{COMMON.COUNTRIES[key]}</MenuItem>
                    ))}
                  </Select>
                  <FormHelperText className="helper-text">
                    Country of Residence of the Investor
                  </FormHelperText>
                  <FormHelperText sx={{ color: "#ff3e3e", m: 0 }}>
                    {errors?.residenceCountry
                      ? errors?.residenceCountry?.message
                      : null}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="filled-basic"
                  label="Email ID*"
                  variant="filled"
                  fullWidth
                  className="step-input"
                  helperText="Email ID of the Investor"
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
              <Grid item xs={12} md={6} lg={4} className="phone-input">
                <PhoneInput
                  name="phoneNumber"
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
                  onChange={(e) => (COMMON.handleInput(e, COMMON.arrayOfCountries)) ? (setPhone(e), setPhError({ field: "", msg: "" })) : (setPhError({ field: "phoneNumber", msg: "Phone Number is Required" }))}

                />
                <helperText className="helper-text">Contact Number of the Investor
                </helperText>
                <FormHelperText sx={{ color: "#ff3e3e" }}>{phone_error?.msg ? phone_error?.msg : null}</FormHelperText>

              </Grid>
              <Grid item xs={12} md={6} lg={4}>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  defaultValue={user1?.data?.person?.birthDate}
                  id="date"
                  label="Birth Date*"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    max: `${COMMON.TODAYDATE}`,
                  }}
                  variant="filled"
                  className="step-input"
                  fullWidth
                  helperText="Helper text"
                  {...register("birthDate", {
                    required: "birthDate is Required",
                  })}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.birthDate ? errors?.birthDate?.message : null}</FormHelperText>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="filled-basic"
                  label="Birth Place"
                  variant="filled"
                  fullWidth
                  className="step-input"
                  helperText="Place of Birth"
                  {...register("birthPlace")}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.birthPlace ? errors?.birthPlace?.message : null}</FormHelperText>
              </Grid>
              <Grid item xs={12} lg={4}></Grid>
              <Grid item xs={12} md={6} lg={4}>
                <FormControl variant="filled" fullWidth>
                  <InputLabel
                    id="demo-simple-select-filled-label"
                    className="dropdown-label"
                  >
                    Civil/Residence  Type*
                  </InputLabel>
                  <Select
                    defaultValue={user1?.data?.idDocument?.type}
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    className="raise-drop-down"
                    {...register("type", {
                      required: "type is Required"
                    })}
                  >
                    <MenuItem value="CARD_ID" className="color-menu">CARD</MenuItem>
                    <MenuItem value="PASSPORT" className="color-menu">
                      PASSPORT
                    </MenuItem>
                  </Select>
                  <FormHelperText className="helper-text">
                    Type of Residency
                  </FormHelperText>
                  <FormHelperText sx={{ color: "#ff3e3e", m: 0 }}>
                    {errors?.type
                      ? errors?.type?.message
                      : null}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="filled-basic"
                  label="Civil / Residence card number*"
                  variant="filled"
                  fullWidth
                  className="step-input"
                  helperText="Civil/Residence Card Number"
                  {...register("number", {
                    required: "number is Required",
                  })}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.number ? errors?.number?.message : null}</FormHelperText>
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
                    defaultValue={user1?.data?.idDocument?.country}
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    className="raise-drop-down"
                    {...register("country", {
                      required: "Country is Required",
                    })}
                  >
                    {Object.keys(COMMON.COUNTRIES).map((key) => (
                      <MenuItem value={key} className="color-menu">{COMMON.COUNTRIES[key]}</MenuItem>
                    ))}
                  </Select>
                  <FormHelperText className="helper-text">
                    Country of Residence
                  </FormHelperText>
                  <FormHelperText sx={{ color: "#ff3e3e", m: 0 }}>
                    {errors?.country
                      ? errors?.country?.message
                      : null}
                  </FormHelperText>
                </FormControl>
              </Grid>
              {
                watch("type") === "PASSPORT" &&
                <Grid item xs={12} md={6} lg={4}>
                  <TextField
                    id="filled-basic"
                    label="ID Issuing State/Governerate*"
                    variant="filled"
                    fullWidth
                    className="step-input"
                    helperText="Place of Issue of your ID"
                    {...register("issuePlace", {
                      required: "issuePlace is Required",
                    })}
                  />
                  <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.issuePlace ? errors?.issuePlace?.message : null}</FormHelperText>
                </Grid>
              }
              {
                watch("type") === "PASSPORT" &&
                <Grid item xs={12} md={6} lg={4}>
                  <TextField
                    defaultValue={user1?.data?.idDocument?.issueDate}
                    id="date"
                    label="Issue Date*"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      max: `${COMMON.TODAYDATE}`,
                    }}
                    variant="filled"
                    className="step-input"
                    fullWidth
                    helperText="Issue Date of the ID"
                    {...register("issueDate", {
                      required: "IssueDate is Required",
                    })}
                  />
                  <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.issueDate ? errors?.issueDate?.message : null}</FormHelperText>
                </Grid>
              }
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  defaultValue={user1?.data?.idDocument?.expiryDate}
                  id="date"
                  label="Expiry date*"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    min: `${COMMON.TODAYDATE}`,
                  }}
                  variant="filled"
                  className="step-input"
                  fullWidth
                  helperText="Expiry Date of the ID"
                  {...register("expiryDate", {
                    required: "expiryDate is Required",
                  })}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.expiryDate ? errors?.expiryDate?.message : null}</FormHelperText>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="filled-basic"
                  label="TAX ID Number"
                  variant="filled"
                  fullWidth
                  className="step-input"
                  helperText="Tax ID number"
                  {...register("taxIdNumber")}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.taxIdNumber ? errors?.taxIdNumber?.message : null}</FormHelperText>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <FormControl variant="filled" fullWidth>
                  <InputLabel
                    id="demo-simple-select-filled-label"
                    className="dropdown-label"
                  >
                    Gender*
                  </InputLabel>
                  <Select
                    defaultValue={user1?.data?.gender}
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    className="raise-drop-down"
                    {...register("gender", {
                      required: "gender is Required"
                    })}
                  >
                    <MenuItem value="MALE" className="color-menu">MALE </MenuItem>
                    <MenuItem value="FEMALE" className="color-menu">
                      FEMALE
                    </MenuItem>
                  </Select>
                  <FormHelperText className="helper-text">
                    Gender
                  </FormHelperText>
                  <FormHelperText sx={{ color: "#ff3e3e", m: 0 }}>
                    {errors?.gender
                      ? errors?.gender?.message
                      : null}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="filled-basic"
                  label="Nationality*"
                  variant="filled"
                  fullWidth
                  className="step-input"
                  helperText="Nationality of the Investor"
                  {...register("nationality", {
                    required: "nationality is Required",
                  })}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.nationality ? errors?.nationality?.message : null}</FormHelperText>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <FormControl variant="filled" fullWidth>
                  <InputLabel
                    id="demo-simple-select-filled-label"
                    className="dropdown-label"
                  >
                    Education level*
                  </InputLabel>
                  <Select
                    defaultValue={user1?.data?.education}
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    className="raise-drop-down"
                    {...register("education",
                      {
                        required: "Education is Required"
                      })}
                  >
                    <MenuItem value="ELEMENTARY" className="color-menu">ELEMENTARY </MenuItem>
                    <MenuItem value="MIDDLE_SCHOOL" className="color-menu">
                      MIDDLE_SCHOOL
                    </MenuItem>
                    <MenuItem value="SECONDARY" className="color-menu">SECONDARY</MenuItem>
                    <MenuItem value="UNIVERSITY" className="color-menu">UNIVERSITY</MenuItem>
                    <MenuItem value="OTHER" className="color-menu">OTHER</MenuItem>
                  </Select>
                  <FormHelperText className="helper-text">
                    Highlest level of Education
                  </FormHelperText>
                  <FormHelperText sx={{ color: "#ff3e3e", m: 0 }}>
                    {errors?.education
                      ? errors?.education?.message
                      : null}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} lg={4}></Grid>
              <Grid item xs={12} lg={4}></Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="filled-basic"
                  label="Company Name"
                  variant="filled"
                  fullWidth
                  className="step-input"
                  helperText="Name of the Company"
                  {...register("companyName")}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.companyName ? errors?.companyName?.message : null}</FormHelperText>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="filled-basic"
                  label="Company Address"
                  variant="filled"
                  fullWidth
                  className="step-input"
                  helperText="Address of the Company"
                  {...register("companyAddress")}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.companyAddress ? errors?.companyAddress?.message : null}</FormHelperText>
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
                  onChange={(e) => (COMMON.handleInput(e, COMMON.arrayOfCountries)) ? (setUserPhone(e), setUserPhError({ field: "", msg: "" })) : (setUserPhError({ field: "phoneNumber", msg: "Phone Number is Required" }))}
                />
                <helperText className="helper-text">Contact Number of the Company</helperText>
                <FormHelperText sx={{ color: "#ff3e3e" }}>{user_phone_error?.msg ? user_phone_error?.msg : null}</FormHelperText>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <FormControl variant="filled" fullWidth>
                  <InputLabel
                    id="demo-simple-select-filled-label"
                    className="dropdown-label"
                  >
                    Employment Type*
                  </InputLabel>
                  <Select
                    defaultValue={user1?.data?.occupation?.employmentType}
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    className="raise-drop-down"
                    {...register("employmentType", {
                      required: "employmentType Country is Required",
                    })}
                  >
                    <MenuItem value="SELF_EMPLOYED" className="color-menu">SELF_EMPLOYED</MenuItem>
                    <MenuItem value="SALARIED" className="color-menu">
                      SALARIED
                    </MenuItem>
                    <MenuItem value="BOTH" className="color-menu">BOTH</MenuItem>
                  </Select>
                  <FormHelperText className="helper-text">
                    Type of Employment
                  </FormHelperText>
                  <FormHelperText sx={{ color: "#ff3e3e", m: 0 }}>
                    {errors?.employmentType
                      ? errors?.employmentType?.message
                      : null}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="filled-basic"
                  label="Occupation*"
                  variant="filled"
                  fullWidth
                  className="step-input"
                  helperText="Occupation Title held in the Company"
                  {...register("occupation", {
                    required: "occupation is Required",
                  })}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.occupation ? errors?.occupation?.message : null}</FormHelperText>
              </Grid>
            </Grid>
            <Box sx={{ mt: 2 }}>Alternate Contact Person</Box>
            <Grid container spacing={5}>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="filled-basic"
                  label="Alternate Contact Name*"
                  variant="filled"
                  fullWidth
                  className="step-input"
                  helperText="Name of the Alternate Contact Person"
                  {...register("contactName", {
                    required: "Name is Required",
                  })}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.contactName ? errors?.contactName?.message : null}</FormHelperText>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="filled-basic"
                  label="Alternate Email ID*"
                  variant="filled"
                  fullWidth
                  className="step-input"
                  helperText="Email ID of the Alternate Contact Person"
                  {...register("contactEmail", {
                    required: "email is Required",
                    pattern: {
                      value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                      message: "invalid Email",
                    }
                  })}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.contactEmail ? errors?.contactEmail?.message : null}</FormHelperText>
              </Grid>
              <Grid item xs={12} md={6} lg={4} className="phone-input">

                <PhoneInput
                  name="phoneNumber"
                  autoFocus={true}
                  id="filled-basic"
                  variant="filled"
                  placeholder='Phone number'
                  country={"om"}
                  value={altPhone}
                  // onChange={
                  //   (phone) => {
                  //     setAltPhone(phone)
                  //   }
                  // }
                  onChange={(e) => (COMMON.handleInput(e, COMMON.arrayOfCountries)) ? (setAltPhone(e), setAltPhError({ field: "", msg: "" })) : (setAltPhError({ field: "phoneNumber", msg: "Phone Number is Required" }))}

                />
                <helperText className="helper-text">Phone number of the Alternate Contact Person</helperText>
                <FormHelperText sx={{ color: "#ff3e3e" }}>{alt_phone_error?.msg ? alt_phone_error?.msg : null}</FormHelperText>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="filled-basic"
                  label="Position/Title*"
                  variant="filled"
                  fullWidth
                  className="step-input"
                  helperText="Designation of the Alternate Contact Person"
                  {...register("position", {
                    required: "position is Required",
                  })}
                />
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.position ? errors?.position?.message : null}</FormHelperText>
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
                borderBottomWidth: '2px solid',
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
  )
}

export default Step1