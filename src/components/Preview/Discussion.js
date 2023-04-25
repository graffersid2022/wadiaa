import React from 'react'
import {
  Box,
  Container,
  Button,
  Typography,
  Grid,
  Avatar,
} from "@mui/material";
import ReviewImg from "../../assets/images/Review.png";

function Discussion() {
  return (
    <Box sx={{ display: { xs: 'block', md: "flex" }, margin: { xs: '50px 0', md: "114px 0" }, justifyContent: 'center' }} >
      <Box item xs={12} md={6} sx={{ width: { xs: '100%', md: '50%' } }}  >
        <img src={ReviewImg} alt="image" />
      </Box>
      <Box item xs={12} md={6} sx={{ alignSelf: "center", textAlign: 'center', marginTop: { xs: '20px', md: '0' } }}>
        <Typography sx={{
          fontWeight: "500",
          fontSize: { xs: '25px', sm: "40px" }
        }}>Be the first to<br />
          <span style={{ fontWeight: "700" }}>Start the Discussion</span></Typography>
      </Box>
    </Box >
  )
}

export default Discussion