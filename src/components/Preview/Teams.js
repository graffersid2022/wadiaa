import React from 'react'
import { Box, Container } from "@mui/material";
import { useSelector } from "react-redux";
import { useLocation } from 'react-router';
import ROUTES from '../Configs/Routes';


function Teams() {
  const campaignData = useSelector(state => state.CampaignReducer.data)

  return (
    <Box>
      <Container maxWidth="lg">
        <Box sx={{
          fontWeight: "700",
          fontSize: { xs: '26px', sm: "36px" },
          color: "#193D71",
          mt: 5,
          mb: 2
        }}>Terms and Conditions</Box>
        <Box className='video'>
          <iframe src={campaignData?.TERMS_AND_CONDITION?.attachmentUrl} className='responsive-iframe' />
        </Box>
      </Container>
    </Box>
  )
}

export default Teams  