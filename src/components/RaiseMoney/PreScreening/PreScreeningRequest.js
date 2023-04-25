import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import RequsetIllutration from "../../../assets/images/requset-illutration.png"
import RightArrow from "../../../assets/images/right-arrow.png"
import { useNavigate } from "react-router-dom";
import ROUTES from '../../Configs/Routes';

function PreScreeningRequest() {
  const navigate = useNavigate();
  return (
    <Box sx={{ height: "100vh" }} className="request-main">
      <Box sx={{ height: "100%", margin: '10px' }} className='request-sec'>
        <Box sx={{
          height: "100%", display: { xs: 'block', md: "flex" }, alignItems: "center", justifyContent: "center", textAlign: { xs: 'center', md: 'left' }
        }}>
          <Box>
            <img src={RequsetIllutration} alt="image" className="RequsetIllutration" />
          </Box>
          <Box>
            <Typography sx={{ color: "#fff", fontWeight: "900", fontSize: { xs: "24px", sm: "28px", md: "40px" } }}>
              We got your Pre-screening details
            </Typography>
            <Typography sx={{ color: "#fff", fontWeight: "700", fontSize: { xs: "20px", md: "32px" }, mt: 3 }}>
              Your application is under review by our team
            </Typography>
            <Typography sx={{ color: "#fff", mt: 3, marginRight: { xs: '0', md: "25%" }, textAlign: { xs: 'center', md: 'left' } }}>
              Meanwhile, you can go ahead and have look at some investment option which is easier to identify
            </Typography>
            <Button variant='contained' sx={{ background: "#57C0F1", padding: "13px 24px", mt: 2, borderRadius: "8px" }} onClick={() => { navigate(ROUTES.HOME) }}>Back to Dashboard<img src={RightArrow} alt="image" className='arrow-image' /></Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default PreScreeningRequest
