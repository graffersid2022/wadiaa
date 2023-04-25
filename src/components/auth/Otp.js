import React, { useState, useRef } from 'react'
import { Box, Typography, Grid, Button, Container } from '@mui/material';
import loginIllutration from '../../assets/images/login-illutration.png'
import { useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import ROUTES from '../Configs/Routes';
import COMMON from '../Configs/Common';
let currentOtpIndex = 0

function Otp() {

  const navigate = useNavigate()
  const [seconds, setSeconds] = useState(60)
  const [otp, setOtp] = useState(new Array(6).fill(""))
  const [activeOtpIndex, setActiveOtpIndex] = useState(0)
  const inputRef = useRef(null)
  let newOtp = otp.join('')
  const token = localStorage.getItem('regitoken')

  const handleChange = (e,) => {
    const { value } = e.target;
    const newOtp = [...otp];
    newOtp[currentOtpIndex] = value.substring(value.length - 1);
    setOtp(newOtp);
    if (!value) {
      setActiveOtpIndex(currentOtpIndex - 1);
    } else {
      setActiveOtpIndex(currentOtpIndex + 1);
    }
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex])

  const handleOnKeyDown = (e, index) => {
    currentOtpIndex = index;
    if (e.key === "Backspace") {
      setActiveOtpIndex(currentOtpIndex - 1);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let passedData = {
      otp: newOtp,
    };

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_UAT_URL}/account/otp/registration/validate`,
      data: passedData,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
        ...COMMON.SECURITY_HEADERS
      },
    })
      .then((response) => {
        if (response.status === 200) {
          navigate(ROUTES.LOGIN)
          toast.success("Check your email for activated your account")
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          toast.error("Invalid OTP")
        }
      })
  }

  const handleResendOtp = () => {
    setOtp(new Array(6).fill(""))
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_UAT_URL}/account/otp/registration`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...COMMON.SECURITY_HEADERS
      },
    })
      .then(
        (response) => {
          if (response.status === 200) {
            setSeconds(60)
          }
        }
      )
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    for (let i = seconds; i >= 0; i--) {
      setTimeout(() => {
        setSeconds(i)
      }, 1000 * (seconds - i))
    }
  }, [seconds]);

  return (
    <div className='mainauth-div'>
      <Container maxWidth="lg" className='mainauth-container'>
        <div className='flex-div'>
          <div className='img-div'>
            <img src={loginIllutration} alt="login-illutration" className='login-illutration-img' />
          </div>
          <div className='login-div'>
            <div className='div-width' >
              <Box className='otpbox'>
                <Typography sx={{ fontSize: "24px", color: "#ffffff" }}>Please enter OTP for <br /> mobile verification</Typography>
                <form onSubmit={handleSubmit}>

                  <div className="userInput">
                    {otp.map((_, index) => {
                      return (
                        <div key={index}>
                          <input
                            ref={index === activeOtpIndex ? inputRef : null}
                            type="text"
                            onChange={handleChange}
                            value={otp[index]}
                            onKeyDown={(e) => handleOnKeyDown(e, index)}
                            required
                          />
                        </div>
                      )
                    })}
                  </div>
                  <Box sx={{ marginBottom: { xs: "10%", sm: "85%" }, marginTop: { xs: '10%', sm: '0' } }}>
                    <Typography sx={{ color: "#fff" }}>OTP not received?<span className='sec-otp' onClick={handleResendOtp}> Resend in {seconds} seconds</span></Typography>
                  </Box>
                  <Grid item xs={12}>
                    <Button fullWidth type="submit" variant="contained"
                      className="btn-verify"
                      disabled={
                        otp[0] === "" ||
                        otp[1] === "" ||
                        otp[2] === "" ||
                        otp[3] === "" ||
                        otp[4] === "" ||
                        otp[5] === ""

                      }
                      sx={{
                        background: "#57c0f1"
                      }}
                    >Verify</Button>
                  </Grid>
                </form>
              </Box>
            </div>
          </div>
        </div>
      </Container >
    </div>
  )
}

export default Otp