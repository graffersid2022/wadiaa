import React from 'react'
import Footer from './Footer'
import { Box, Grid, Container } from '@mui/material';
import { useNavigate } from 'react-router';
import ROUTES from './Configs/Routes';


function Learn() {
  const navigate = useNavigate()
  return (
    <Box>
      <Box sx={{ pt: 25, height: "100vh", margin: '5px' }}>
        <Container maxWidth="lg">
          <Box sx={{ border: "1px solid gray", padding: { xs: '10px', sm: "30px" }, borderRadius: "20px" }}>
            <Grid container spacing={5} sx={{ textAlign: "center" }}>
              <Grid item xs={4} md={4}>
                <Box sx={{ fontWeight: "700", fontSize: { xs: '20px', sm: "26px" }, color: "#57C0F1" }}>Investing</Box>
              </Grid>
              <Grid item xs={4} md={4}>
                <Box sx={{ fontWeight: "700", fontSize: { xs: '20px', sm: "26px" }, color: "#57C0F1" }}>Fundraising</Box>
              </Grid>
              <Grid item xs={4} md={4}>
                <Box sx={{ fontWeight: "700", fontSize: { xs: '20px', sm: "26px" }, color: "#57C0F1" }}>Legal</Box>
              </Grid>
              <Grid item xs={4} md={4}>
                <Box sx={{ fontWeight: "500", fontSize: { xs: '13px', sm: "18px" }, color: "#fff" }}>Why Invest? (on Wadiaa)</Box>
              </Grid>
              <Grid item xs={4} md={4}>
                <Box sx={{ fontWeight: "500", fontSize: { xs: '13px', sm: "18px" }, color: "#fff" }} >Why raise funds? (on Wadiaa)</Box>
              </Grid>
              <Grid item xs={4} md={4}>
                <Box sx={{ fontWeight: "500", fontSize: { xs: '13px', sm: "18px" }, color: "#fff" }}>Terms of Use</Box>
              </Grid>
              <Grid item xs={4} md={4}>
                <Box sx={{ fontWeight: "500", fontSize: { xs: '13px', sm: "18px" }, color: "#fff" }} onClick={() => { navigate(ROUTES.INVEST_HOME) }}>How to Invest?</Box>
              </Grid>
              <Grid item xs={4} md={4}>
                <Box sx={{ fontWeight: "500", fontSize: { xs: '13px', sm: "18px" }, color: "#fff" }} onClick={() => { navigate(ROUTES.RAISE_HOME) }}>How to Raise Funds?</Box>
              </Grid>
              <Grid item xs={4} md={4}>
                <Box sx={{ fontWeight: "500", fontSize: { xs: '13px', sm: "18px" }, color: "#fff" }}>Risks</Box>
              </Grid>
              <Grid item xs={4} md={4}>
                <Box sx={{ fontWeight: "500", fontSize: { xs: '13px', sm: "18px" }, color: "#fff" }}>Investing FAQs</Box>
              </Grid>
              <Grid item xs={4} md={4}>
                <Box sx={{ fontWeight: "500", fontSize: { xs: '13px', sm: "18px" }, color: "#fff" }}>Fundraising FAQs</Box>
              </Grid>
              <Grid item xs={4} md={4}>
                <Box sx={{ fontWeight: "500", fontSize: { xs: '13px', sm: "18px" }, color: "#fff" }}>Privacy Policy</Box>
              </Grid>
              <Grid item xs={4} md={4}>
              </Grid>
              <Grid item xs={4} md={4}>
                <Box sx={{ fontWeight: "500", fontSize: { xs: '13px', sm: "18px" }, color: "#fff" }}>Success Stories</Box>
              </Grid>
              <Grid item xs={4} md={4}>
                <Box sx={{ fontWeight: "500", fontSize: { xs: '13px', sm: "18px" }, color: "#fff" }}>Disclaimer</Box>
              </Grid>
            </Grid>
          </Box>



        </Container>
      </Box>
      <Footer />
    </Box>
  )
}

export default Learn