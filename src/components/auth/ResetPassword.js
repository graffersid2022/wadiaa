import React, { useState, useEffect } from 'react'
import { json, useNavigate } from 'react-router';
import { Box, Typography, TextField, Grid, Button, Container, FormHelperText } from '@mui/material';
import axios from "axios"
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form"
import loginIllutration from '../../assets/images/login-illutration.png'
import { useDispatch } from 'react-redux';
import { getUserType } from "../Actions/Index";
import ROUTES from '../Configs/Routes';
import COMMON from '../Configs/Common';


export default function ResetPassword() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const token = localStorage.getItem("token");
    let verification = JSON.parse(localStorage.getItem("varification"))
    verification = verification?.trim()
    let url = `${process.env.REACT_APP_UAT_URL}/auth/password/recovery/confirmation?${verification}`
    console.log("url",url)
    const onSubmit = (data) => {
      if(data.password!==data.cpassword)
      {
        return 0
      }
      axios({
        method: "POST",
        url:url,
        data: data,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          // Authorization: `Bearer ${token}`,
          ...COMMON.SECURITY_HEADERS
        },
      })
        .then((response) => {
          if (response.status === 200) {
            navigate("/signin")
          }
        })
        .catch((error) => {
          console.log(error)
          if (error.response.status === 400) {
            toast.error(error.response.data.title)
          } else if (error.response.status === 403) {
            toast.error("Your account is locked")
          }
        })
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
              <Typography sx={{ fontSize: "26px", color: "#ffffff" }}>Reset Password</Typography>
              {
               
                <Typography sx={{ fontSize: "18px", color: "#ffffff" }}>Kindly enter the New Password you wish to use</Typography>
              }
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={3} sx={{ paddingTop: "20px" }}>
                    <Grid item xs={12}>
                     
                       
                         <TextField className='inputclass' type="password" fullWidth id="filled-basic" label="New Password" variant="filled" name="login" autoComplete='off'
                        {...register("password", {
                          required: "password is Required"
                          ,
                         
                        })}
                        error={!!errors?.email}
                      />
                       
                    </Grid>
                    <Grid item xs={12}>
                    <TextField className='inputclass' type="password" fullWidth id="filled-basic" label="Reconfirm New Password" variant="filled" name="login" autoComplete='off'
                        {...register("cpassword", {
                          required: "Confirm Password is Required"
                          ,
                          
                        })}
                        error={!!errors?.email}
                      />
                      
                      
                      <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.login ? errors?.login?.message : null}</FormHelperText>
                      <FormHelperText sx={{color: "#ffffff"}} >
                       Password should contain
                       <ul>
                          <li>minimum 8 charector long</li>
                          <li>alphabet with uppercase and lowercase</li>
                          <li>special charector</li>
                          <li>number</li>
                       </ul>
                        </FormHelperText>
                    </Grid>
               
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      fullWidth variant="contained" sx={{
                        fontSize: "24px", background: "#57C0F1", textTransform: "capitalize", borderRadius: "10px", mt: { xs: "10%", sm: "70%" }
                      }}>Next</Button>
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

