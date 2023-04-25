import React, { useState, useEffect } from 'react'
import { Box, Typography, TextField, Grid, Button, Container, FormHelperText, Checkbox, Link, Popper } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from "axios"
import loginIllutration from '../../assets/images/login-illutration.png'
import InvestMoney from '../../assets/images/invest-login.png'
import RaiseMoney from '../../assets/images/raise-login.png';
import ReCAPTCHA from "react-google-recaptcha";
import PhoneInput from "react-phone-input-2";
import { useForm } from "react-hook-form"
import { useSelector, useDispatch } from 'react-redux'
import { getUserType } from "../Actions/Index"
import TermsAndConditions from '../Common/TermsandCondition';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import COMMON from '../Configs/Common';
import ROUTES from '../Configs/Routes';

function Login() {

  const dispatch = useDispatch()
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const [userType,setUserType] = useState(true)
  const [phone, setPhone] = useState('')
  const [phone_error, setPhError] = useState({
    field: "",
    msg: ""
  })
  const navigate = useNavigate()
  const type = useSelector(state => state.commonState.type)

  const onSubmit = (data) => {
    let passData = {
      agreedReceiveUpdates: data.checkbox,
      email: data.email,
      givenName: data.givenName,
      lastName: data.lastName,
      password: data.password,
      phone: phone,
      type: type
    }
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_UAT_URL}/auth/register`,
      data: passData,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...COMMON.SECURITY_HEADERS
      },
    })
      .then(response => {
        if (response.status === 200) {
          localStorage.setItem('regitoken', response.data.idToken)
          navigate(ROUTES.OTP)
        }
      })
      .catch(error => {
        if (error.response.status === 400) {
          toast.error("A user with this email or phone number already exists")
        }
      })
  }

  function handleCaptcha(value) {
    console.log("Captcha value:", value);
  }
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  return (
    <div className='mainauth-div'>
      <Container maxWidth="lg" className='mainauth-container'>
        <div className='flex-div' >
          <div className='img-div'>
            <img src={loginIllutration} alt="login-illutration" className='login-illutration-img' />
          </div>
          <div className='login-div' >
            <div className='div-width'>
              <Box>
                <Typography sx={{ fontSize: "24px", color: "#ffffff" }}>Sign Up on Wadiaa</Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={3} sx={{ paddingTop: "20px" }}>
                    <Grid item xs={12} sx={{ display: { xs: 'block', md: 'flex' }, justuifyContent: 'center' }}>
                      <Button variant="contained" className={type == "INVESTOR" ? "btn-inv-raise btn-inv btn-inv-active" : "btn-inv-raise btn-inv"} sx={{
                        borderRadius: "10px 0 0 10px", display: 'flex', width: { xs: '100%!important', md: '50%' },
                      }}
                        onClick={() => {
                          setUserType(true)
                           dispatch(getUserType("INVESTOR")) }}
                      >
                        <img src={InvestMoney} alt="image " />
                        Invest Money
                      </Button>
                      <Button variant="contained" className={type == "BUSINESS" ? "btn-inv-raise btn-inv btn-inv-active" : "btn-inv-raise btn-inv"} sx={{
                        borderRadius: "0 10px 10px 0", display: 'flex', width: { xs: '100%!important', md: '50%' }, marginTop: { xs: '10px!important', md: '0!important' }
                      }}
                        onClick={() => { 
                          setUserType(false)
                          dispatch(getUserType("BUSINESS")) }}
                      >
                        <img src={RaiseMoney} alt="image" />
                        Raise Funds
                      </Button>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <TextField className='inputclass' fullWidth label="Given Name*" variant="filled" name="firstName" autoComplete='off'
                        {...register("givenName", {
                          required: "First Name is Required",
                          pattern: {
                            value: /^[a-zA-Z]+$/,
                            message: "Only letters are allowed",
                          }

                        })}
                      />
                      <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.givenName ? errors?.givenName?.message : null}</FormHelperText>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <TextField className='inputclass' fullWidth label="Last Name*" variant="filled" name="lastName" autoComplete='off'
                        {...register("lastName", {
                          required: "Last Name is Required",
                          pattern: {
                            value: /^[a-zA-Z]+$/,
                            message: "Only letters are allowed",
                          }
                        })} />
                      <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.lastName ? errors?.lastName?.message : null}</FormHelperText>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField className='inputclass' type="email" fullWidth label="E-mail*" variant="filled" name="email" autoComplete='off'
                        {...register("email", {
                          required: "Email is Required", pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid Email",
                          }
                        })}
                        error={!!errors?.email} />
                      <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.email ? errors?.email?.message : null}</FormHelperText>
                    </Grid>
                    <Grid item xs={12} className="signup-phoneinput">
                      <PhoneInput
                        name="phoneNumber"
                        autoFocus={true}
                        id="filled-basic"
                        variant="filled"
                        placeholder='Phone number'
                        country={"om"}
                        value={phone}
                        onChange={(e) => (COMMON.handleInput(e, COMMON.arrayOfCountries)) ? (setPhone(e), setPhError({ field: "", msg: "" })) : (setPhError({ field: "phoneNumber", msg: "Phone Number is Required" }))}
                      />
                      <FormHelperText sx={{ color: "#ff3e3e" }}>{phone_error?.msg ? phone_error?.msg : null}</FormHelperText>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField className='inputclass' fullWidth label="Password*" variant="filled" name="password" autoComplete='off' type="password"
                        {...register("password", {
                          required: "Password is Required"
                          , pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
                            message: "Password must contain at least one uppercase, one lowercase, one special charector and one number",
                          }
                        })} />
                      <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.password ? errors?.password?.message : null}</FormHelperText>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField className='inputclass' fullWidth label="Confirm password*" variant="filled" name="ComfirmPassword" autoComplete='off' type="password"

                        {...register("ConfirmPassword", {
                          required: "Confirm Password is Required",
                          validate: (value) => value === watch('password') || "The passwords do not match"
                        })}
                      />
                      <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.ConfirmPassword ? errors?.ConfirmPassword?.message : null}</FormHelperText>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sx={{ mt: "10px", color: "#fff" }}>
                  <FormControlLabel control={<Checkbox className="login-checkbox"
                      {...register("terms", {
                                required: "Please accept terms and conditions"
                              })}
                    />} label="Please Click Here to Read & Accept Wadiaa’s" sx={{ color: "#ffffff" }} />
                    <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.checkbox ? errors?.checkbox?.message : null}</FormHelperText>
                    <Box> <Link sx={{ cursor: "pointer", color: "#57C0F1" }}
                      aria-describedby={id} onClick={handleClick}>Terms of Service*</Link></Box>
                    <div >

                      <Popper
                        id={id} open={open} anchorEl={anchorEl}
                        placement="right-end"
                        disablePortal={true}
                        modifiers={[
                          {
                            name: 'preventOverflow',
                            enabled: true,
                            options: {
                              altAxis: false,
                              altBoundary: true,
                              tether: true,
                              rootBoundary: 'document',
                              padding: 8,
                            },
                          },
                          {
                            name: 'arrow',
                            enabled: true,
                            // options: {
                            //   element: arrowRef,
                            // },
                          },
                        ]}
                        sx={{ zIndex: 9 }}
                      >
                        <ClickAwayListener onClickAway={handleClickAway}>
                          <Box sx={{
                            p: 2, bgcolor: 'background.paper', color: "#000", borderRadius: "10px", height: "60vh", overflow: "auto"
                          }}>
                            <Typography sx={{ fontWeight: "900", fontSize: "16px" }}>
                              Please aknowledge the terms below by checking the box at the bottom
                            </Typography>
                            <TermsAndConditions />
                            {/* <FormControlLabel control={<Checkbox
                              className="login-checkbox"
                              {...register("terms", {
                                required: "Please accept terms and conditions"
                              })}
                            />} label="Please accept terms and conditions" sx={{ color: "#000000" }} /> */}
                          </Box>
                        </ClickAwayListener>
                      </Popper>
                      <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.terms ? errors?.terms?.message : null}</FormHelperText>
                    </div>
                  </Grid>

                 
                  {
                    userType?
                    <Grid item xs={12} sx={{ mt: "10px" }}>
                    <FormControlLabel control={<Checkbox className="login-checkbox"
                      {
                      ...register("kyc", {required: "KYC and run AML/ CFT is Required"})
                     
                      }
                    />} label="Please Click Here to Confirm KYC and run AML/ CFT*" sx={{ color: "#ffffff" }} />
                    <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.kyc ? errors?.kcy?.message : null}</FormHelperText>
                  </Grid>:null
                  }
                  <Grid item xs={12} sx={{ mt: "10px" }}>
                    <FormControlLabel control={<Checkbox className="login-checkbox"
                      {
                      ...register("checkbox")
                      }
                    />} label="Please keep me informed on the updates" sx={{ color: "#ffffff" }} />
                    <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.checkbox ? errors?.checkbox?.message : null}</FormHelperText>
                  </Grid>
                  {/* <Grid item xs={12}>
                    <ReCAPTCHA
                      sitekey="6LfZAskiAAAAADfSJK1u8T6kEmCcUQg5Eg9s7Egl"
                      onChange={handleCaptcha}
                      className="captcha"
                    />
                  </Grid> */}
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      fullWidth variant="contained"
                      sx={{
                        fontSize: "24px", background: "#57C0F1", textTransform: "capitalize", borderRadius: "10px", mt: "10px", color: "#fff"
                      }}>Sign Up</Button>
                  </Grid>
                  <Typography sx={{ mt: 3 }} className="typo-already">Already have an account?<span onClick={() => navigate(ROUTES.LOGIN)}> Log in</span>
                  </Typography>
                </form>
              </Box>
            </div>
          </div>
        </div>
      </Container >
    </div >
  )
}

export default Login