import React, { useState, useEffect } from "react";
import StapHeader from "../../StepHeader";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Divider,
  FormHelperText,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  CircularProgress,
  Checkbox,
  FormControlLabel,
  Chip,
} from "@mui/material";
import RightArrow from "../../../assets/images/right-arrow.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import COMMON from "../../Configs/Common";
import { useDispatch } from "react-redux";
import { getStatusOfPrescreening, getContentOfPrescreening } from "../../../components/Actions/Index";
import TermsandCondition from "../../Common/TermsandCondition";
import ROUTES from "../../Configs/Routes";

function Index() {
  const [user, setUser] = useState([]);
  const [phone, setPhone] = useState("");
  const [phone_error, setPhError] = useState({
    field: "",
    msg: "",
  })
  const [loading, setLoading] = useState(false)
  const [country, setCountry] = useState("")
  const [attachment, setAttachment] = useState([])
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const onSubmit = (data) => {
    if(String(phone).length<10)
    {
      setPhError({ field: "phoneNumber", msg: "Phone Number is Required" })
      return 0
    }
    setLoading(true)
    let id;
    let passData = {
      data: {
        companyName: data.companyName,
        companyRegistrationCountry: data.companyRegistrationCountry,
        companyRegistrationNumber: data.companyRegistrationNumber,
        contact: {
          email: data.email,
          name: data.name,
          phone: phone,
          position: data.position,
        },
      },
      quiz: {
        campaignType: "CROWDFUNDING",
        generateRevenue: true,
        launchedProduct: true,
        moneyFundraised: true,
        moneyRaised: 0,
        moneyWantsRaise: 0,
        monthlyRunway: 0,
        numberOfEmployees: 1,
        summary: "string",
        traction: "string",
      },
    };

    axios({
      method: "post",
      url: `${process.env.REACT_APP_UAT_URL}/pre/screening`,
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
          id = response.data.preScreeningId;
          localStorage.setItem("preData", response.data);
        }
      })
      .catch((error) => {
        if (error.response.status === 409) {
          setLoading(false)
          toast.error("You have already done pre screening");
        }
        else{
          toast.error("something went wrong, please try again");
        }
      });

    setTimeout(() => {
      [1, 2].map((
        item,
      ) => {
        let file = {
          file: data[`file${item}`][0],
        };

        id &&
          axios({
            method: "POST",
            url: `${process.env.REACT_APP_UAT_URL}/pre/screening/${id}/attachment`,
            data: file,
            headers: {
              "Content-Type": "multipart/form-data",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
              ...COMMON.SECURITY_HEADERS
            },
          })
            .then((response) => {
              if (response.status === 200) {
                setLoading(false)
                navigate(ROUTES.RAISEMONEY.REQUEST)
              }
            })
            .catch((response) => {
              setLoading(false)
              if (response.data.status === 403) {
                setLoading(false)
                toast.error("Your account id not verified Please check your email");
              }
              setLoading(false)
            });
      })
    }, 2000);
    setLoading(false)
  };

  const getData = () => {
    var id;
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_UAT_URL}/pre/screening`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...COMMON.SECURITY_HEADERS

      },
    })
      .then((response) => {
        if (response.status === 200) {
          id = response?.data?.content[0]?.id;
          setCountry(response.data.content[0]?.companyRegistrationCountry)
          !id ? dispatch(getStatusOfPrescreening("RECEIVED")) : axios({
            method: "GET",
            url: `${process.env.REACT_APP_UAT_URL}/pre/screening/${id}`,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
              ...COMMON.SECURITY_HEADERS
            },
          })
            .then((res) => {
              if (res.status === 200) {
                console.log("userData",res.data)
                setUser(res.data);
                setPhone(res.data.contact.phone);
                dispatch(getStatusOfPrescreening(res.data.status))
                dispatch(getContentOfPrescreening(res.data))
                getAttachment(id)
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });


    // setTimeout(() => {
    //   !id ? dispatch(getStatusOfPrescreening("RECEIVED")) : axios({
    //     method: "GET",
    //     url: `${process.env.REACT_APP_UAT_URL}/pre/screening/${id}`,
    //     headers: {
    //       "Content-Type": "application/json",
    //       Accept: "application/json",
    //       Authorization: `Bearer ${token}`,
    //       ...COMMON.SECURITY_HEADERS
    //     },
    //   })
    //     .then((res) => {
    //       if (res.status === 200) {
    //         setUser(res.data);
    //         setPhone(res.data.contact.phone);
    //         dispatch(getStatusOfPrescreening(res.data.status))
    //         dispatch(getContentOfPrescreening(res.data))
    //         getAttachment(id)
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });


    // }, 500)
  }

  const getAttachment = (id) => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_UAT_URL}/pre/screening/${id}/attachment`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...COMMON.SECURITY_HEADERS
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setAttachment(res.data.content)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getData();
  }, [])
  console.log(Object.keys(user).length)

  
  return (

    <Box sx={{ background: "#ffffff", paddingBottom: "100px" }} className="raise-money-bg">

      <form onSubmit={handleSubmit(onSubmit)}>
        <Container maxWidth="lg">
          <Box sx={{ paddingTop: "125px" }}>
            <StapHeader />
          </Box>
        </Container>
        <Divider sx={{ my: 5 }} />
        <Box sx={{ margin: '10px' }}>
          <Container maxWidth="lg">
            <Box sx={{ paddingBottom: "100px" }}>
              <Box
                sx={{ fontSize: { xs: "24px", sm: "32px" }, fontWeight: "900", marginRight: { xs: "0", sm: "50px" } }}
              >
                Pre screening for raise Funds
              </Box>
              <Box
                sx={{
                  color: "#000000",
                  fontWeight: "700",
                  fontSize: "16px",
                  width: "100%",
                  mt: "35px",
                }}
              >
                About Company
              </Box>
              <Grid container spacing={5}>
                <Grid item xs={12} md={6} lg={4}>
                  <TextField
                    id="filled-basic"
                    label="Registered Comapny Name*"
                    variant="filled"
                    fullWidth
                    className="step-input"
                    helperText="Provide the name of the company that is registered"
                    InputLabelProps={
                      user.companyName ? { shrink: true } : {}
                    }
                    value={user?.companyName}
                    {...register("companyName", {
                      required: "Company name is Required",
                      maxLength: {
                        value: 50,
                        message: "Company name should be less than 50 characters",
                      },
                    })}
                  />
                  <FormHelperText sx={{ color: "#ff3e3e" }}>
                    {errors?.companyName ? errors?.companyName?.message : null}
                  </FormHelperText>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <FormControl variant="filled" fullWidth>
                    <InputLabel
                      id="demo-simple-select-filled-label"
                      className="dropdown-label"
                      shrink={user.companyRegistrationCountry && true}
                    >
                      Company Registration Country*
                    </InputLabel>
                    <Select
                      defaultValue={user.companyRegistrationCountry}
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      className="raise-drop-down"
                      {...register("companyRegistrationCountry", {
                        required: "Country is Required",
                      })}
                    >
                      {Object.keys(COMMON.COUNTRIES).map((key, i) => (
                        <MenuItem value={key} key={i}>
                          {COMMON.COUNTRIES[key]}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText className="helper-text">
                      Please select a country
                    </FormHelperText>
                    <FormHelperText sx={{ color: "#ff3e3e", m: 0 }}>
                      {errors?.companyRegistrationCountry
                        ? errors?.companyRegistrationCountry?.message
                        : null}
                    </FormHelperText>
                  </FormControl>

                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <TextField
                    id="filled-basic"
                    label="Registration Number*"
                    variant="filled"
                    fullWidth
                    className="step-input"
                    helperText="Provide the registration number of the company"
                    value={user?.companyRegistrationNumber}
                    InputLabelProps={
                      user.companyRegistrationNumber ? { shrink: true } : {}
                    }
                    {...register("companyRegistrationNumber", {
                      required: "Company Registration Number is Required",
                      maxLength: {
                        value: 50,
                        message: "Company Registration Number should be less than 50 characters",
                      },
                    })}
                  />
                  <FormHelperText sx={{ color: "#ff3e3e" }}>
                    {errors?.companyRegistrationNumber
                      ? errors?.companyRegistrationNumber?.message
                      : null}
                  </FormHelperText>
                </Grid>
              </Grid>
              <Box
                sx={{
                  color: "#000000",
                  fontWeight: "700",
                  fontSize: "16px",
                  width: "100%",
                  mt: "35px",
                }}
              >
                Authorized Contact Person
              </Box>
              <Grid container spacing={5}>
                <Grid item xs={12} md={6} lg={4}>
                  <TextField
                    id="filled-basic"
                    label="Contact Person Name*"
                    variant="filled"
                    fullWidth
                    className="step-input"
                    helperText="Authorized Contact Person Name"
                    value={user?.contact?.name}
                    InputLabelProps={user?.contact?.name ? { shrink: true } : {}}
                    {...register("name", {
                      required: "Name is Required",
                      maxLength: {
                        value: 50,
                        message: "Name should be less than 50 characters",
                      },
                    })}
                  />
                  <FormHelperText sx={{ color: "#ff3e3e" }}>
                    {errors?.name ? errors?.name?.message : null}
                  </FormHelperText>
                </Grid>
                <Grid item xs={12} md={6} lg={4} sx={{ mr: 1 }}>
                  <TextField
                    id="filled-basic"
                    label="Designation*"
                    variant="filled"
                    fullWidth
                    className="step-input"
                    helperText="Designation of Contact Person"
                    value={user?.contact?.position}
                    InputLabelProps={user?.contact?.position ? { shrink: true } : {}}
                    {...register("position", {
                      required: "Position is Required",
                    })}
                  />
                  <FormHelperText sx={{ color: "#ff3e3e" }}>
                    {errors?.position ? errors?.position?.message : null}
                  </FormHelperText>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <TextField
                    id="filled-basic"
                    label="Work Email ID*"
                    variant="filled"
                    fullWidth
                    className="step-input"
                    helperText="Work Email ID"
                    value={user?.contact?.email}
                    InputLabelProps={user?.contact?.email ? { shrink: true } : {}}
                    {...register("email", {
                      required: "Email is Required",
                      pattern: {
                        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                        message: "Invalid Email",
                      },
                    })}
                  />
                  <FormHelperText sx={{ color: "#ff3e3e" }}>
                    {errors?.email ? errors?.email?.message : null}
                  </FormHelperText>
                </Grid>
                <Grid item xs={12} md={6} lg={4} className="phone-input">
                  <PhoneInput
                    name="phone"
                    required="true"
                    autoFocus="true"
                    id="filled-basic"
                    label="Filled*"
                    placeholder="Phone number*"
                    country={"om"}
                    disabled={user?.contact?.phone ? true : false}
                    value={phone}
                    copyNumbersOnly={false}
                    onChange={(e) => (COMMON.handleInput(e, COMMON.arrayOfCountries)) ? (setPhone(e), setPhError({ field: "", msg: "" })) : (setPhError({ field: "phoneNumber", msg: "Phone Number is Required" }))}
                    onBlur={()=>String(phone).length>10?setPhError({ field: "", msg: "" }):setPhError({ field: "phoneNumber", msg: "Phone Number is Required" })}
                  />
                  <FormHelperText className="helper-text">
                    Work Phone number
                  </FormHelperText>
                  <FormHelperText sx={{ color: "#ff3e3e" }}>{phone_error?.msg ? phone_error?.msg : null}</FormHelperText>
                </Grid>
              </Grid>
              <Box
                sx={{
                  color: "#000000",
                  fontWeight: "700",
                  fontSize: "16px",
                  width: "100%",
                  mt: "35px",
                }}
              >
                Upload Documents
              </Box>
              <Grid container spacing={5}>
                <Grid item xs={12} md={6} lg={4}>
                  <TextField
                    id="filled-basic"
                    InputLabelProps={
                      watch("file1")? { shrink: true } : { shrink: false }
                    }
                    type="file"
                    label="Company Registration Document*"
                    variant="filled"
                    accept="image/*"
                    fullWidth
                    className={
                      watch("file1") ? "step-input black-color" : "step-input transparent-color"
                    }
                    helperText="Upload Comapny Registration Document (PDF,DOCX)"
                    {...register("file1", {
                      required: "Company registration Document is Required",
                      validate: ()=>watch("file1") [0]?.type ? watch("file1")[0]?.type==="application/pdf" || watch("file1")[0]?.type==="application/vnd.openxmlformats-officedocument.wordprocessingml.document":null
                    })}
                  /><br />
                  <FormHelperText sx={{ color: "#ff3e3e" }}>
                    {errors?.file1 ? errors?.file1?.message : null}
                    {watch("file1") && watch("file1") [0]?.type ? watch("file1")[0]?.type!=="application/pdf" && watch("file1")[0]?.type!=="application/vnd.openxmlformats-officedocument.wordprocessingml.document"?"Please upload valid document":"":""}
                  </FormHelperText>
                  {
                    attachment[0]?.name &&
                    <Chip label={attachment[0]?.name}
                      sx={{ mb: 1, mr: 2 }} />
                  }
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <TextField
                    id="filled-basic"
                    InputLabelProps={
                      watch("file2") ? { shrink: true } : { shrink: false }
                    }
                    type="file"
                    label="Campaign Pitch Deck*"
                    variant="filled"
                    fullWidth
                    className={
                      watch("file2") ? "step-input black-color" : "step-input transparent-color"
                    }
                    helperText="Upload Pitch Deck (PDF,DOCX,PPT)"
                    {...register("file2", {
                      required: "Campaign Pitch Deck is Required",
                      validate: ()=>watch("file2") [0]?.type ? watch("file2")[0]?.type==="application/pdf" || watch("file2")[0]?.type==="application/vnd.openxmlformats-officedocument.wordprocessingml.document":null
                    })}
                  />
                  <FormHelperText sx={{ color: "#ff3e3e" }}>
                    {errors?.file2 ? errors?.file2?.message : null}
                    {watch("file2") && watch("file2") [0]?.type ? watch("file2")[0]?.type!=="application/pdf" && watch("file2")[0]?.type!=="application/vnd.openxmlformats-officedocument.wordprocessingml.document"?"Please upload valid document":"":""}
                  </FormHelperText>
                  {
                    attachment[1]?.name &&
                    <Chip label={attachment[1]?.name}
                      sx={{ mb: 1, mr: 2 }} />
                  }
                </Grid>
              </Grid>
            </Box>
            <TermsandCondition />
            <Typography component={'span'} sx={{ fontWeight: "700", pb: 15 }}>
              <FormControlLabel label="I accept terms and conditions"
                labelPlacement="start"
                control={<Checkbox className="login-checkbox"
                  {
                  ...register("terms", {
                    required: "Please accept the terms and conditions",
                  })
                  }
                />} sx={{ color: "#000000", ml: 0 }} />

              <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.terms ? errors?.terms?.message : null}</FormHelperText>
            </Typography>
          </Container>
        </Box>
        <Box className="step-bottom">
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
              onClick={() => navigate(ROUTES.HOME)}
            >
              Back To Dashboard
            </Box>
            <Box>
              <Button sx={{ mr: 1, fontSize: "16px" }}
                disabled={Object.keys(user).length === 0 ? false : true}
                className="next-btn" type="submit">
                Submit
                {
                  loading ? <CircularProgress color="inherit" sx={{ ml: 3 }} /> :
                    <img
                      src={RightArrow}
                      alt="rightarrow"
                      className="arrow-image"
                    />
                }
              </Button>
            </Box>
          </Container>
        </Box>
      </form >
    </Box >
  );
}

export default Index;
