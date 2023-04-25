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


export default function ForgotPassword() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [mailsent,setMailsent] = useState(false)
  
    const onSubmit = (data) => {
        setMailsent(true)
      axios({
        method: "POST",
        url: `${process.env.REACT_APP_UAT_URL}/auth/password/recovery/request`,
        data: data,
        headers: COMMON.HEADERS_LOGIN
      })
        .then((response) => {
          if (response.status === 200) {
            setMailsent(true)
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
              {
                mailsent?
                <Typography sx={{ fontSize: "24px", color: "#ffffff" }}>please check your mail </Typography>:
                <Typography sx={{ fontSize: "24px", color: "#ffffff" }}>Password Recovery on Wadiaa</Typography>
              }
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={3} sx={{ paddingTop: "20px" }}>
                    <Grid item xs={12}>
                     {
                        !mailsent?
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
                      :
                    null
                      }
                      <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.login ? errors?.login?.message : null}</FormHelperText>
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
