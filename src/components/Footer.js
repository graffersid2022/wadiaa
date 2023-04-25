import React, { useState } from 'react'
import { Box, Container, Typography, Grid, Button } from '@mui/material';
import Green_logo from '../assets/images/green-logo.png'
import { useNavigate } from 'react-router-dom'
import TermsandCondition from './Common/TermsandCondition';
import ROUTES from './Configs/Routes';
import COMMON from './Configs/Common';
import { BsLinkedin, BsTwitter, BsInstagram, BsFacebook, BsYoutube } from "react-icons/bs";


function Footer() {

  const navigate = useNavigate()

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [navigate])

  return (
    <Box className='footer'>
      <Container maxWidth="lg">
        <Box className="footer-div" sx={{ textAlign: { xs: "center", md: "center", lg: "left" }, }}>
          <Grid container spacing={2}>
            <Grid item lg={3} md={12}  >
              <Typography sx={{ color: "#57C0F1", fontSize: "22px", fontWeight: "700" }}>Bridging the funding<br />
                gap!</Typography>
              <Typography sx={{ color: "#fff", fontSize: "16px", marginTop: "20px" }}>
                Investing in startups is high risk. You can lose all of the invested amount.
                Hence, invest only amounts that you can afford to lose
              </Typography>
              <Typography sx={{ color: "#96C36D", fontSize: "16px", mt: 2 }}>Follow us</Typography>
              <Box sx={{ display: "flex", mt: 1, justifyContent: { xs: "center", md: "center", lg: "left" } }} className="social-links-footer">
                <a href={COMMON.SOCIALURL.LinkedIn} target="_blank" >
                  <BsLinkedin />
                </a>
                <a href={COMMON.SOCIALURL.Instagram} target="_blank">
                  <BsInstagram />
                </a>
                <a href={COMMON.SOCIALURL.Twitter} target="_blank">
                  <BsTwitter />
                </a>
                <a href={COMMON.SOCIALURL.Facebook} target="_blank">
                  <BsFacebook />
                </a>
                <a href={COMMON.SOCIALURL.YouTube} target="_blank">
                  <BsYoutube />
                </a>
              </Box>
            </Grid>
            <Grid item lg={1} md={0}>
            </Grid>
            <Grid item lg={8} md={12} >
              <Box className='footer-grid' sx={{ width: "100%" }}>
                <Grid container spacing={2} direction="row" >
                  <Grid item xs={3}>
                    <Typography className="grid-header" >Company</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography className="grid-header">Investing</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography className="grid-header">Fundraising</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography className="grid-header">Legal</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Button className="grid-info-footer"
                      href={COMMON.URL.AboutWadiaa}
                    >About Wadiaa</Button>
                  </Grid>
                  <Grid item xs={3}>
                    <Button className="grid-info-footer" href={COMMON.URL.WhyInvest}>Why Invest?</Button >
                  </Grid>
                  <Grid item xs={3}>
                    <Button className="grid-info-footer" href={COMMON.URL.WhyRaisefunds}>Why raise funds? </Button>
                  </Grid>
                  <Grid item xs={3}>
                    <Button className="grid-info-footer" href={COMMON.URL.TermsOfUse}>Terms of Use</Button>
                  </Grid>
                  <Grid item xs={3}>
                    <Button className="grid-info-footer" href={COMMON.URL.TheTeam}>The Team</Button>
                  </Grid>
                  <Grid item xs={3}>
                    <Button className="grid-info-footer" href={COMMON.URL.HowtoInvest} >How to Invest?</Button>
                  </Grid>
                  <Grid item xs={3}>
                    <Button className="grid-info-footer" href={COMMON.URL.HowtoRaiseFunds} >How to Raise Funds?</Button>
                  </Grid>
                  <Grid item xs={3}>
                    <Button className="grid-info-footer" href={COMMON.URL.RisksDisclaimer}>Risks Disclaimer</Button>
                  </Grid>
                  <Grid item xs={3}>
                    <Button className="grid-info-footer" href={COMMON.URL.ContactUs}>Contact Us</Button>
                  </Grid>
                  <Grid item xs={3}>
                    <Button className="grid-info-footer" onClick={() => { navigate(ROUTES.INVEST_HOME) }}>Start Investing </Button>
                  </Grid>
                  <Grid item xs={3}>
                    <Button className="grid-info-footer" onClick={() => { navigate(ROUTES.RAISE_HOME) }}>Apply to raise funds</Button>
                  </Grid>
                  <Grid item xs={3}>
                    <Button className="grid-info-footer" href={COMMON.URL.PrivacyPolicy}>Privacy Policy</Button>
                  </Grid>
                  <Grid item xs={3}>
                    <Button className="grid-info-footer" href={COMMON.URL.Press} sx={{ justifyContent: "start" }}>Press & Media Centre</Button>
                  </Grid>
                  <Grid item xs={3}>
                    <Button className="grid-info-footer" href={COMMON.URL.WhyInvest}>Investing FAQs</Button>
                  </Grid>
                  <Grid item xs={3}>
                    <Button className="grid-info-footer" href={COMMON.URL.WhyRaisefunds}>Fundraising FAQs</Button>
                  </Grid>
                  <Grid item xs={3}>
                    <Button className="grid-info-footer" href={COMMON.URL.RisksDisclaimer}></Button>
                  </Grid>
                  <Grid item xs={3}>
                    <Button className="grid-info-footer" href={COMMON.URL.Careers}>Careers</Button>
                  </Grid>
                  <Grid item xs={3}>
                    <Button className="grid-info-footer" href={COMMON.URL.InvestorFeedback} >Investor Feedback</Button>
                  </Grid>
                  <Grid item xs={3}>
                  </Grid>
                  <Grid item xs={3}>
                    <Button></Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box >
        <Box sx={{ color: "#fff" }}>
          <Typography sx={{ fontWeight: "900", fontSize: "16px" }}>
            General Risk Disclosure
          </Typography>
          <TermsandCondition />
        </Box>
      </Container >
    </Box >
  )
}

export default Footer