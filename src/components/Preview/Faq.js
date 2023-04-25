import React from 'react'
import { Box, Container } from "@mui/material";
import { useSelector } from "react-redux";

function Faq() {

  const campaignData = useSelector(state => state.CampaignReducer.data)

  return (
    <Box>
      <Container maxWidth="lg">
        <Box sx={{
          fontWeight: "700",
          fontSize: "36px",
          color: "#193D71",
          mt: 5,
          mb: 2
        }}>Frequently Asked Questions?</Box>
        <Box className='video'>
          <iframe src={campaignData?.FAQ?.attachmentUrl} className='responsive-iframe' />
        </Box>
      </Container>
    </Box>
  )
}

export default Faq  