import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';
import { Box, Typography, TextField, Grid, Button, Container, FormHelperText } from '@mui/material';
import axios from "axios"
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form"
import loginIllutration from '../../assets/images/login-illutration.png'
import { useDispatch } from 'react-redux';
import { getUserType } from "../Actions/Index";
import ROUTES from '../Configs/Routes';
import COMMON from '../Configs/Common';

function SignIn() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data) => {
    localStorage.removeItem("regitoken");
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_UAT_URL}/auth/login`,
      data: data,
      headers: COMMON.HEADERS_LOGIN
    })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem('token', response.data.idToken)
          localStorage.setItem('refToken', response.data.refreshToken)
          getUser()
        }
      })
      .catch((error) => {
        console.log(error)
        if (error.response.status === 401) {
          toast.error("Invalid Credentials")
        } else if (error.response.status === 403) {
          toast.error("Your account is locked")
        }
      })
  }

  const getUser = () => {
    const token = localStorage?.getItem("token");
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_UAT_URL}/account`,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
        ...COMMON.SECURITY_HEADERS
      },
    })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem('data', JSON.stringify(response.data))
          if (response.data?.type === "INVESTOR") {
            navigate(ROUTES.INVEST.INVEST)
            window.location.reload()
          } else if (response.data?.type === "BUSINESS") {
            navigate(ROUTES.RAISE_HOME)
            window.location.reload()
            dispatch(getUserType(response.data?.type))
          }
        }
      })
      .catch((error) => {
        console.log(error)
      })

      getExchangeRate()
  }
///portal/api/account/settings/exchange-rate
  const getExchangeRate = ()=>{
    const token = localStorage?.getItem("token");
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_UAT_URL}/account/settings/exchange-rate`,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
        ...COMMON.SECURITY_HEADERS
      },
    }).then(res=>{
      localStorage.setItem("exchange",JSON.stringify(res.data))
      console.log(res.data)
    }).catch()
  }

  return (
    <div className='mainauth-div'>
      <Container maxWidth="lg" className='mainauth-container'>
        <div className='flex-div'>
          <div className='img-div'>
            <img src={loginIllutration} alt="login-illutration" className='login-illutration-img' />
          </div>
          <div className='login-div'>
            <div className='div-width'>
              <Box>
                <Typography sx={{ fontSize: "24px", color: "#ffffff" }}>Sign In on Wadiaa</Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={3} sx={{ paddingTop: "20px" }}>
                    <Grid item xs={12}>
                      <TextField className='inputclass' type="text" fullWidth id="filled-basic" label="Mail ID" variant="filled" name="login" autoComplete='off'
                        {...register("login", {
                          required: "Email is Required"
                          ,
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid Email",
                          }
                        })}
                        error={!!errors?.email}
                      />
                      <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.login ? errors?.login?.message : null}</FormHelperText>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField className='inputclass' fullWidth id="filled-basic" label="Password" variant="filled" name="password" type="password" autoComplete='off'
                        {...register("password", {
                          required: "Password is Required"
                        })}
                      />
                      <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.password ? errors?.password?.message : null}</FormHelperText>
                    </Grid>
                  </Grid>
                  <Typography sx={{ mt: 1 }} className="typo-already">Don’t have an account? <span onClick={() => navigate(ROUTES.SIGN_UP)}> Sign up</span></Typography>
                  <Typography sx={{ mt: 1 }} className="typo-already"><span onClick={() => navigate(ROUTES.FORGORPASSWORD)}> forgot password?</span></Typography>

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      fullWidth variant="contained" sx={{
                        fontSize: "24px", background: "#57C0F1", textTransform: "capitalize", borderRadius: "10px", mt: { xs: "10%", sm: "70%" }
                      }}>Sign In</Button>
                  </Grid>
                </form>
              </Box >
            </div>
          </div>
        </div>
      </Container >
    </div >
  )
}

export default SignIn