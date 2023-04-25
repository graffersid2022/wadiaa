import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import ROUTES from "../Configs/Routes"
import FaqImage from '../../assets/images/faq-img.png'
import Footer from '../Footer'
import { Box, Grid, Typography, Container, Button, Accordion, AccordionDetails, AccordionSummary, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Provide1 from "../../assets/images/provide-1.png"
import Provide2 from "../../assets/images/Provide-2.png"
import Provide3 from "../../assets/images/Provide-3.png"
import Provide4 from "../../assets/images/Provide-4.png"
import Raise1 from "../../assets/images/home-raise1.png"
import Raise2 from "../../assets/images/home-raise2.png"
import Raise3 from "../../assets/images/home-raise3.png"
import Raise4 from "../../assets/images/home-raise4.png"
import { useDispatch } from 'react-redux';
import { getUserType } from "../Actions/Index"
import { toast } from 'react-toastify';

function Home() {

  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem("data"));
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleRaise = () => {
    if (localStorage.getItem("token") === null) {
      navigate(ROUTES.SIGN_UP)
      dispatch(getUserType("BUSINESS"))
    } else if (user.type === "INVESTOR") {
      toast("You are logged in as an Investor. Fundraising is not permitted. You must register/login as a business with a different company mail id to raise funds",{autoClose: 10000,})
    }
    else {
      navigate(ROUTES.RAISEMONEY.PRE_SCREENING)
    }
  }

  return (
    <div>
      <div className='home-div1'>
        <Container maxWidth="lg" className="home-container">
          <Box sx={{ color: "#fff", fontSize: { xs: '29px', sm: '40px', md: '55px', lg: "64px" }, fontWeight: "900" }}>
          A great Network of Active investors
          {/* <br /> */}
            {/* <span style={{ color: "#57c0f1" }}>investors</span> */}
          </Box>
          <Box sx={{ color: "#fff", fontSize: { xs: '20px', sm: '24px', md: '30px', lg: "32px" }, fontWeight: "400", marginTop: "46px", opacity: "0.8" }}>
            We help founders raise funds, engage their <br />
            community, and scale for the future.
          </Box>
          <Button variant='contained' className="home-raisemoney" onClick={handleRaise}>Apply For Funding</Button>
        </Container>
        <Box sx={{ backgroundColor: "#193d71" }}>
          <Box className="second-container">

            <Container maxWidth="lg">
              <Box sx={{ paddingTop: "92px", fontSize: { xs: '30px', sm: "40px" }, color: "#fff" }}>
                What we provide?
              </Box>
              <Box>
                <Grid container spacing={3} >
                  <Grid item xs={12} lg={3} md={6} sm={12}>
                    <Grid className="provide-grid">
                      <Box className='provide-img'>
                        <img src={Provide1} alt="image" />
                      </Box>
                      <Box className='provide-title'>Regulated Crowdfunding </Box>
                      <Box className="provide-dis">Crowdfunding services regulated by the Capital Markets Authority (CMA) </Box>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} lg={3} md={6} sm={12}>
                    <Grid className="provide-grid">
                      <Box className='provide-img'>
                        <img src={Provide2} alt="image" />
                      </Box>
                      <Box className='provide-title'>Dedicated Team</Box>
                      <Box className="provide-dis">We assign a dedicated team to advise and guide you to get your campaign content ready, ongoing customer service and provide investor services once your raise is live.</Box>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} lg={3} md={6} sm={12}>
                    <Grid className="provide-grid">
                      <Box className='provide-img'>
                        <img src={Provide3} alt="image" />
                      </Box>
                      <Box className='provide-title'>Rolling Closes</Box>
                      <Box className="provide-dis">Withdraw funds as early as achieving regulatory minimum and continue to withdraw at agreed milestones to keep funding the business growth</Box>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} lg={3} md={6} sm={12}>
                    <Grid className="provide-grid">
                      <Box className='provide-img'>
                        <img src={Provide4} alt="image" />
                      </Box>
                      <Box className='provide-title'>SPV Setup</Box>
                      <Box className="provide-dis">We help you with the documentation to on-board your investors onto the company under a special purpose vehicle (SPV)</Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
              <Box className='money-works'>
                <Box sx={{ display: { xs: 'block', sm: "flex" }, justifyContent: "space-between", alignItems: "center" }}>
                  <Box sx={{
                    color: "#fff", fontSize: { xs: '25px', sm: "40px" },
                    fontweight: "700"
                  }}>How to raise Funds on Wadiaa</Box>
                  <Button variant='contained'
                    onClick={handleRaise}
                    sx={{
                      Radius: "48.51px", padding: { xs: '12px 20px', sm: "0px 28px", md: '18px 20px', lg: "14px 40px" }, borderRadius: "48px", fontWeight: "700", fontSize: { xs: '16px', sm: "24px" }, background: "#57C0F1"
                    }}>Apply For Funding</Button>
                </Box>
                <Box>
                  <Container sx={{ margin: "auto", marginTop: "75px" }}>
                    <Box className="line-main">
                      <Box sx={{ display: "inline-block", width: { xs: '100%', sm: '100%', md: "100%", lg: '48%' }, textAlign: { xs: 'center', lg: 'left' } }}>
                        <Box sx={{ display: { xs: 'block', sm: "flex" }, mt: { md: '-20px', lg: "50px" } }}>
                          <img src={Raise1} alt="image" className="home-img-raise" />
                          <Box sx={{ margin: "-7px 6%", textAlign: { xs: 'center' } }}>
                            <Box className="home-step" sx={{ textAlign: { xs: 'center', lg: 'left' } }}>Apply</Box>
                            <Box className='home-step-description' sx={{ textAlign: { xs: 'center', lg: 'left' } }}>Fill in the Raise Funds form and upload information. We will conduct the due-diligence and select to raise Funds.</Box>
                          </Box>
                        </Box>
                      </Box>
                      <Box sx={{ display: "inline-block", width: { xs: '100%', sm: '100%', md: "100%", lg: '50%' }, textAlign: { xs: 'center', lg: 'left' } }} >
                        <Box sx={{ marginTop: { md: '30px!important', lg: "10px" }, marginLeft: { xs: '0', sm: '0', md: '0', lg: "-5%" }, display: { xs: 'block', sm: "flex" }, alignItems: 'start' }}>
                          <img src={Raise2} alt="image" className="home-img-raise" />
                          <Box sx={{ margin: { sm: "12px 0 0 0", md: "0 0 0 0", lg: "32px 16% 0 0" }, marginLeft: { sm: '6%', md: '6%!important' }, textAlign: { xs: 'center' } }} >
                            <Box className="home-step" sx={{ marginRight: { lg: "30%" }, textAlign: { xs: 'center', lg: 'left' } }}>Campaign Agreement Signed</Box>
                            <Box className='home-step-description' sx={{ textAlign: { xs: 'center', lg: 'left' } }}>We make recommendations to make your campaign a success and we sign an agreement on the terms for raising money.</Box>
                          </Box>
                        </Box>
                      </Box>
                      <Box sx={{ display: "inline-block", width: { xs: '100%', sm: '100%', md: "100%", lg: '40%' }, marginLeft: { md: '0', lg: "15%" }, marginTop: "30px", textAlign: { xs: 'center', lg: 'left' } }} className='raise3'>
                        <Box sx={{ display: { xs: 'block', sm: "flex" }, alignItems: 'start' }}>
                          <img src={Raise3} alt="image" className="home-img-raise" sx={{ marginTop: "35px" }} />
                          <Box sx={{ paddingLeft: { sm: '40px', md: '55px', lg: "5px" }, textAlign: { xs: 'center' } }}>
                            <Box className="home-step" sx={{ textAlign: { xs: 'center', lg: 'left' } }}>Campaign Launched</Box>
                            <Box className='home-step-description' sx={{ textAlign: { xs: 'center', lg: 'left' } }}>We open the campaign for raising money on the platform. We take reservations and then collect the money from investors</Box>
                          </Box>
                        </Box>
                      </Box>
                      <Box sx={{ display: "inline-block", width: { xs: '100%', sm: '100%', md: "100%", lg: '45%' }, textAlign: { xs: 'center', lg: 'left' } }} className='raise4'>
                        <Box sx={{ marginTop: { md: '20px', lg: "40px" }, display: { xs: 'block', sm: "flex" } }}>
                          <img src={Raise4} alt="image" className="home-img-raise" />
                          <Box sx={{ paddingLeft: { sm: '45px', md: '50px', lg: "10px" }, paddingTop: { sm: '0', md: '0!important', lg: "20px" }, textAlign: { xs: 'center' } }} >
                            <Box className="home-step" sx={{ textAlign: { xs: 'center', lg: 'left' } }}>Campaign Close</Box>
                            <Box className='home-step-description' sx={{ textAlign: { xs: 'center', lg: 'left' } }}>We close the campaign and transfer the funds upon successfully reaching the required minimum funding target. We help with investor on-boarding</Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Container>
                </Box>
              </Box>
            </Container>
          </Box>


          <Box className='home-raisingmoney'>
            <Container maxWidth="lg">
              <Box sx={{ display: { xs: 'block', sm: "flex" }, justifyContent: "space-between", alignItems: "center", marginTop: "50px" }}>
                <Box sx={{
                  fontWeight: "700",
                  fontSize: { xs: '25px', sm: "40px" },
                  color: "#fff",
                }}>Founder Benefits in Crowdfunding</Box>
                <Button variant='contained' onClick={handleRaise} sx={{ fontSize: "24px", fontWeight: "700", marginTop: { xs: '20px', sm: '0' }, padding: { xs: '12px 20px', sm: "0px 28px", md: '18px 20px', lg: "14px 40px" }, borderRadius: "48px", background: "#57C0F1" }}>Apply For Funding</Button>
              </Box>
              <Box className='home-raise-div'>
                <Grid container spacing={5} >
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box sx={{ height: "100%" }}>
                      <Box className="home-que" sx={{ fontSize: { xs: '18px', sm: '24px' } }}>
                        Simplify your fundraising process
                      </Box>
                      <Box className="home-ans">
                        The Wadiaa platform makes investing easy and accessible. We take care of all the cumbersome details of getting investors onboarded.
                      </Box>
                    </Box>
                    <Divider sx={{ background: "rgba(255, 255, 255, 0.2)", mt: 2 }} />
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box sx={{ height: "100%" }}>
                      <Box className="home-que" sx={{ fontSize: { xs: '18px', sm: '24px' } }}>
                        Focus on business growth while raising money
                      </Box>
                      <Box className="home-ans">
                        Raise Funds on Wadiaa while focusing on increasing your sales, growing the brand, and engaging your community, all while focusing on your core business.
                      </Box>
                    </Box>
                    <Divider sx={{ background: "rgba(255, 255, 255, 0.2)", mt: 2 }} />
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box sx={{ height: "100%" }}>
                      <Box className="home-que" sx={{ fontSize: { xs: '18px', sm: '24px' } }}>
                        Engage the community
                      </Box>
                      <Box className="home-ans">
                        Gain more exposure for your business on our platform. Let our users, your customers and fans buy into your mission and turn them into your most loyal brand ambassadors.
                      </Box>
                    </Box>
                    <Divider sx={{ background: "rgba(255, 255, 255, 0.2)", mt: 2 }} />
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box sx={{ height: "100%" }}>
                      <Box className="home-que" sx={{ fontSize: { xs: '18px', sm: '24px' } }}>
                        Streamlined investment process
                      </Box>
                      <Box className="home-ans">
                        Our processes are streamlined and startup-friendly, making your investment campaign management easy and affordable.
                      </Box>
                    </Box>
                    <Divider sx={{ background: "rgba(255, 255, 255, 0.2)", mt: 2 }} />
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box sx={{ height: "100%" }}>
                      <Box className="home-que" sx={{ fontSize: { xs: '18px', sm: '24px' } }}>
                        Drive your key marketing and sales metrics up
                      </Box>
                      <Box className="home-ans">
                        Fundraising on Wadiaa comes with multiple added benefits. Companies gain exponential visibility from being hosted on Wadiaa and can significantly grow their user bases, sell more, gain better media coverage, connect with more VCs, and raise follow on funding rounds at impressive terms.
                      </Box>
                    </Box>
                    <Divider sx={{ background: "rgba(255, 255, 255, 0.2)", mt: 2 }} />
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box sx={{ height: "100%" }}>
                      <Box className="home-que" sx={{ fontSize: { xs: '18px', sm: '24px' } }}>
                        Opportunity to manage investors under one SPV - Single line on your cap table
                      </Box>
                      <Box className="home-ans">
                        Wadiaa investors can be organized under one SPV represented by one lead investor. The SPV would be represented as a single line on your cap table and can act as a single investor. This helps founders ensure operational costs remain under control while effectively managing your investors.
                      </Box>
                    </Box>
                    <Divider sx={{ background: "rgba(255, 255, 255, 0.2)", mt: 2 }} />
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box sx={{ height: "100%" }}>
                      <Box className="home-que" sx={{ fontSize: { xs: '18px', sm: '24px' } }}>
                        Access to our wider pool of investors, founders, and partners
                      </Box>
                      <Box className="home-ans">
                        Our investment terms and processes are liked by VCs and PE investors. You can raise funds on Wadiaa before, during, or after your VC round. A crowdfunding round with Wadiaa is an important complement to traditional VC fundraising.
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box sx={{ height: "100%" }}>
                      <Box className="home-que" sx={{ fontSize: { xs: '18px', sm: '24px' } }}>
                        Make Investors your advocates
                      </Box>
                      <Box className="home-ans">
                        Wadiaa investors are your biggest fans and engaged supporters. They spread the word in their networks, can offer help in their field of expertise, and introduce you to their connections. Our investors include seasoned Angel Investors, VCs, social media influencers, supporters and can help you beyond raising capital.
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
                <Divider sx={{ background: "rgba(255, 255, 255, 0.2)", mt: 3 }} />
                <Box sx={{ color: "#fff", fontSize: "24px", fontWeight: "700", textAlign: "center", mt: 2 }}>View More</Box>
              </Box>

              <Box className='home-faq'>
                <Grid container spacing={3} className='flex'>
                  <Grid item xs={12} sm={12} md={5} lg={5} xl={5} >
                    <img src={FaqImage} alt="faq" className='home-img-faq' />
                  </Grid>
                  <Grid item xs={12} sm={12} md={7} lg={7} xl={7} >
                    <Box sx={{
                      fontWeight: "700",
                      fontSize: "36px",
                      color: "#fff"
                    }}>FAQs</Box>
                    <Box sx={{ marginTop: "20px" }}>
                      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} className="accrdion">
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon sx={{ color: "#fff", fontSize: "20px" }} />}
                          aria-controls="panel1bh-content"
                          id="panel1bh-header"
                        >
                          <Typography sx={{ fontSize: { xs: '16px', sm: "20px" } }} >Who we are?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography sx={{ fontSize: { xs: '16px', sm: "20px" } }}>
                            Wadiaa is an Omani Fintech company engaged in Crowd-funding/ Crowd-lending activities with
                            focus on Equity and Loan-based funding for small and medium enterprises.
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} className="accrdion">
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
                          aria-controls="panel2bh-content"
                          id="panel2bh-header"
                        >
                          <Typography sx={{ fontSize: { xs: '16px', sm: "20px" } }}>
                            What we do?
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography sx={{ fontSize: { xs: '16px', sm: "20px" } }}>
                            We enable promising startups to raise funds for growth by enabling them to run fundraising
                            campaigns on the Wadiaa platform. We also enable investors from the general public,
                            investment houses, Angel investors and VCs looking for investing in startups and SMEs to find
                            promising startups, review their potential and invest in these fundraising campaigns amounts
                            they can afford. Upon completing a successful funding campaign, we transfer the fund to the
                            startup company.
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} className="accrdion">
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
                          aria-controls="panel3bh-content"
                          id="panel3bh-header"
                        >

                          <Typography sx={{ fontSize: { xs: '16px', sm: "20px" } }}>
                            What investment options are available on Wadiaa?
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography sx={{ fontSize: { xs: '16px', sm: "20px" } }}>
                            Presently, we are offering equity crowdfunding. So, investors can invest in startups in return for
                            shares in the startup.
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')} className="accrdion">
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
                          aria-controls="panel4bh-content"
                          id="panel4bh-header"
                        >
                          <Typography sx={{ fontSize: { xs: '16px', sm: "20px" } }}>
                            What type of investment opportunities are available on the platform?
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography sx={{ fontSize: { xs: '16px', sm: "20px" } }}>
                            We try to be selective in the type of companies fundraising on the Wadiaa platform. Although
                            the industry sectors may vary, we aim to give investors a wide range of business sectors to
                            invest in. Some of the more popular ones include e-Commerce, Fin-tech, Health-tech, F&B,
                            services, among others. Please search for the sectors that you are most interested in.
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')} className="accrdion">
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
                          aria-controls="panel5bh-content"
                          id="panel4bh-header"
                        >
                          <Typography sx={{ fontSize: { xs: '16px', sm: "20px" } }}>
                            Is investing on the Wadiaa platform safe?
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography sx={{ fontSize: { xs: '16px', sm: "20px" } }}>
                            The Wadiaa platform itself is regulated and built to ensure a safe and secure investment
                            experience for our customers. However, investing in startups is high risk as startups have a
                            higher failure rate than established companies. Hence, if the startups fail, you can lose all of
                            your invested money. Also, there is no immediate secondary market to sell your shares. You
                            only get your returns when the startup grows and gets acquired or issue an initial public offering
                            (IPO). Hence, do your own due-diligence before investing and only invest amounts that you can
                            afford to lose.
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Container>
            <Footer />
          </Box>
        </Box>
      </div >
    </div >
  )
}

export default Home