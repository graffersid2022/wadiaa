import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import ROUTES from '../Configs/Routes'
import FaqImage from '../../assets/images/faq-img.png'
import Footer from '../../components/Footer'
import { Box, Grid, Typography, Container, Button, Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Frame1 from "../../assets/images/Frame-1.png"
import Frame2 from "../../assets/images/Frame-2.png"
import Frame3 from "../../assets/images/Frame-3.png"
import Benefit1 from "../../assets/images/benefit1.png"
import Benefit2 from "../../assets/images/benefit2.png"
import Benefit3 from "../../assets/images/benefit3.png"
import Benefit4 from "../../assets/images/benefit4.png"
import Benefit5 from "../../assets/images/benefit5.png"
import Benefit6 from "../../assets/images/benefit6.png"
import Hamza from "../../assets/images/Hamza.png"
import Work1 from "../../assets/images/work1.png"
import Work2 from "../../assets/images/work2.png"
import Work3 from "../../assets/images/work3.png"
import Work4 from "../../assets/images/work4.png"
import Work5 from "../../assets/images/work5.png"
import campaign1 from "../../assets/images/campaign1.png";
import { useDispatch } from 'react-redux';
import { getUserType } from "../Actions/Index"
import { useEffect } from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import axios from 'axios'
import COMMON from '../Configs/Common'
import moment from "moment";


function Home() {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const carouselState = [
    { id: 1, state: 'initial-state' },
    { id: 2, state: 'final-state' },
    // { id: 3, state: 'sd-state' }
  ];
  const [campaignData, setCampaignData] = useState([])
  const token = localStorage.getItem("token")

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const getCampaignData = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_UAT_URL}/fundraising/campaigns`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...COMMON.SECURITY_HEADERS

      },
    })
      .then((response) => {
        setCampaignData(response.data.content)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getCampaignData()
  }, []);

  const responsive = {
    0: {
      items: 1,
    },

    900: {
      items: 2,
    }

  }




  return (
    <div>
      <OwlCarousel items={1} className="owl-theme" loop nav autoplay={true} autoplayTimeout={7000}>
        <div className='home-div1'>
          <Container maxWidth="lg" className="home-container">
            <Box sx={{ color: "#fff", fontSize: { xs: '29px', sm: '40px', md: '55px', lg: "64px" }, fontWeight: "900" }}>
              <span style={{ color: "#57c0f1" }}> Invest</span> in companies that wish <br />to change the world
            </Box>
            <Box sx={{ color: "#fff", fontSize: { xs: '20px', sm: '24px', md: '30px', lg: "32px" }, fontWeight: "400", marginTop: "46px", opacity: "0.8" }}>
              Grow your investments in multiples
            </Box>
            <Button variant='contained' className="home-raisemoney" onClick={() => { navigate(ROUTES.INVEST_HOME) }}>Invest</Button>
          </Container>
        </div>

        <div className='home-div2'>
          <Container maxWidth="lg" className="home-container">
            <Box sx={{ color: "#fff", fontSize: { xs: '29px', sm: '40px', md: '55px', lg: "64px" }, fontWeight: "900" }}>
              We have a great <span style={{ color: "#57c0f1" }}>community</span> of seasoned investors
            </Box>
            <Box sx={{ color: "#fff", fontSize: { xs: '20px', sm: '24px', md: '30px', lg: "32px" }, fontWeight: "400", marginTop: "46px", opacity: "0.8" }}>
              Funding with value-add for all
            </Box>
            <Button variant='contained' className="home-raisemoney" onClick={() => { navigate(ROUTES.RAISE_HOME) }}>Raise Funds</Button>
          </Container></div>

        <div className='home-div3'>
          <Container maxWidth="lg" className="home-container">
            <Box sx={{ color: "#fff", fontSize: { xs: '29px', sm: '40px', md: '55px', lg: "64px" }, fontWeight: "900" }}>
              <span style={{ color: "#57c0f1" }}>Bridging </span>founders and investors
            </Box>
            <Box sx={{ color: "#fff", fontSize: { xs: '20px', sm: '24px', md: '30px', lg: "32px" }, fontWeight: "400", marginTop: "46px", opacity: "0.8" }}>
              Helping founders access investors, raise money, engage their <br />community and scale for the future
            </Box>
            <Button variant='contained' className="home-raisemoney"
              sx={{
                textTransform: "capitalize"
              }}

              target="_blank"
              href={COMMON.URL.Learn}
            >Learn</Button>
          </Container></div>
      </OwlCarousel>

      <Box sx={{ backgroundColor: "#193d71" }} >
        <Box className="world-image">
          <Container maxWidth="lg" sx={{ pt: 10 }}>
           {
            campaignData.length>0?
             <Box
              sx={{
                fontWeight: "700",
                fontSize: { xs: '36px', sm: "48px" },
                color: "#fff",
              }}
            >
              Open investments
            </Box>:null}
            <Box>
              <Grid container spacing={3} sx={{ mt: 4 }}>
               
              {campaignData.map((item, index) => {
                    return (
                      <Grid item lg={4} md={6} sm={6} xs={12} sx={{ position: "relative",cursor:"pointer" }} onClick={() => { navigate(`/preview/pitch/${item.id}`) }}>
                        <Box>
                          <img src={campaign1} alt="image" />
                        </Box>
                        <Box
                          sx={{
                            background: "#040D1C",
                            padding: "21px",
                            position: "absolute",
                            bottom: "0",
                            borderRadius: "30px 0 30px 30px",
                            width: "calc(100% - 24px)",
                          }}
                        >
                          <Box sx={{ display: "flex" }}>
                            {item.details.highlights.map((item, index) => {
                              return (
                                <Box
                                  key={index}
                                  sx={{
                                    background: "rgba(255, 255, 255, 0.2)",
                                    borderRadius: "35.5px",
                                    padding: "8px",
                                    fontSize: "10px",
                                    marginRight: "8px",
                                    color: "#57C0F1",
                                  }}
                                >
                                  {item}
                                </Box>
                              )
                            })}
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              mt: 3,
                            }}
                          >
                            <Box
                              sx={{
                                fontWeight: "900",
                                fontSize: "20px",
                                color: "#96C36D",
                              }}
                            >
                              {item.business.name}
                            </Box>
                            <Box
                              sx={{
                                fontWeight: "700",
                                fontSize: "12px",
                                color: "#FFFFFF",
                                border: "2px solid #ffffff",
                                padding: "5px",
                                borderRadius: "25px",
                              }}
                            >
                              {moment(item.endDate).diff(moment(), 'days') > 0 ? `${moment(item.endDate).diff(moment(), 'days')} days left` : "Closed"}
                            </Box>
                          </Box>
                          {item.details.impacts.map((item, index) => {
                            return (
                              <Box sx={{ color: "#E6E7E7", mt: 1 }}>
                                {item}
                              </Box>
                            )
                          })}
                          <Box
                            sx={{
                              background: "rgba(255, 255, 255, 0.2)",
                              display: "flex",
                              justifyContent: "space-between",
                              mt: 1,
                              padding: "15px",
                              borderRadius: "10px",
                            }}
                          >
                            <Box>
                              <Box
                                sx={{
                                  color: "#96C36D",
                                  lineHeight: "19px",
                                }}
                              >
                                {item.details.numberOfInvestments}
                              </Box>
                              <Box sx={{ fontSize: "12px", color: "#fff" }}>
                                Investments
                              </Box>
                            </Box>
                            <Box>
                              <Box
                                sx={{
                                  color: "#96C36D",
                                  lineHeight: "19px",
                                }}
                              >
                                15+
                              </Box>
                              <Box sx={{ fontSize: "12px", color: "#fff" }}>
                                Investments made this week
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Grid>
                    )
                  })}
              </Grid>
            </Box>
          </Container>

          <Box className='home-who' >
            <Container sx={{ padding: "50px" }}>
              <Box container spacing={5} sx={{ color: "white", fontSize: "40px", fontWeight: "500" }}>
                Who we are ?
              </Box>
              <Box className="homewho" sx={{ mt: 5 }}>
                <OwlCarousel className='owl-main owl-theme' responsive={responsive} margin={20}
                  loop autoplay={true} autoplayTimeout={2000} dots={false}
                  slidetransition='ease' autoplayHoverPause={true}
                  autoheight={true.toString()}
                >
                  <Grid className="provide-grid" sx={{ margin: "0px" }}>
                    <Box className='homewho' >
                      <Box>
                        <img src={Frame1} alt="image" className='frame' />
                      </Box>
                      <Box >
                        <Box sx={{ color: "#57C0F1", fontSize: { xs: '18px', sm: "30px" }, fontWeight: "700", marginTop: { xs: '10px', sm: '0' } }}>Regulated Platform</Box>
                        <Box sx={{ color: "#FFFFFF", fontFamily: "lato", fontWeight: "400", fontSize: { xs: '18px', sm: "24px" }, lineHeight: "28.8px", marginTop: { xs: '10px', sm: '0' } }}>Crowdfunding platform regulated by the Capital Markets Authority (CMA) of Oman.</Box>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid className="provide-grid" sx={{ margin: "0px" }}>
                    <Box className='homewho'>
                      <Box>
                        <img src={Frame2} alt="image" className='frame1' />
                      </Box>
                      <Box>
                        <Box sx={{ color: "#57C0F1", fontSize: { xs: '20px', sm: "30px" }, fontWeight: "700", marginTop: { xs: '10px', sm: '0' } }}>Founder Advisory</Box>
                        <Box sx={{ color: "#FFFFFF", fontFamily: "lato", fontWeight: "400", fontSize: { xs: '18px', sm: "24px" }, lineHeight: "28.8px", marginTop: { xs: '10px', sm: '0' } }}>Founders are guided along the process to enable campaign success while ensuring compliance.</Box>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid className="provide-grid" sx={{ margin: "0px" }}>
                    <Box className='homewho'>
                      <Box>
                        <img src={Frame3} alt="image" className='frame1' />
                      </Box>
                      <Box>
                        <Box sx={{ color: "#57C0F1", fontSize: { xs: '18px', sm: "30px" }, fontWeight: "700", marginTop: { xs: '10px', sm: '0' } }}>Enhanced Due-diligence</Box>
                        <Box sx={{ color: "#FFFFFF", fontFamily: "lato", fontWeight: "400", fontSize: { xs: '18px', sm: "24px" }, lineHeight: "28.8px", marginTop: { xs: '10px', sm: '0' } }}>Fundraising requests undergo due diligence and risk assessments by our experts to ensure that the most promising investment opportunities are offered.</Box>
                      </Box>
                    </Box>
                  </Grid>
                </OwlCarousel>
              </Box>
            </Container>
          </Box>

          <Container maxWidth="lg">
            <Box>
              <Box sx={{ paddingTop: "92px", fontSize: "40px", color: "#fff" }}>
                Benefits for you
              </Box>
              <Box >
                <Grid container spacing={3} className='benefits'>
                  <Grid item xs={12} lg={4} md={6} sm={12} >
                    <Grid className="benefit-grid" >
                      <Box className='benefit-img'>
                        <img src={Benefit1} alt="image" />
                      </Box>
                      <Box className='benefittitle'>
                        <Box className='benefit-title'>Most promising investment opportunities </Box>
                        <Box className="benefit1">Our due diligence process ensures that the best opportunities are presented to you. </Box>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} lg={4} md={6} sm={12}>
                    <Grid className="benefit-grid">
                      <Box className='benefit-img' >
                        <img src={Benefit2} alt="image" />
                      </Box>
                      <Box className='benefittitle'>
                        <Box className='benefit-title'>High Risk, High Returns</Box>
                        <Box className="benefit">Investing in start-up businesses and SMEs can provide returns in multiples in a relatively short time.</Box>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} lg={4} md={6} sm={12}>
                    <Grid className="benefit-grid">
                      <Box className='benefit-img3'>
                        <img src={Benefit3} alt="image" />
                      </Box>
                      <Box className='benefittitl3'>
                        <Box className='benefit-title'>Safe and secure platform</Box>
                        <Box className="benefit">The platform is regularly tested and upgraded to ensure a secure and reliable investment and fundraising experience.</Box>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} lg={4} md={6} sm={12} >
                    <Grid className="benefit-grid">
                      <Box className='benefit-img4'>
                        <img src={Benefit4} alt="image" />
                      </Box>
                      <Box className='benefittitle'>
                        <Box className='benefit-title'>Adherence to regulation </Box>
                        <Box className="benefit">We ensure the fundraising and investing processes are in compliance with regulatory requirements. </Box>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} lg={4} md={6} sm={12}>
                    <Grid className="benefit-grid">
                      <Box className='benefit-img5'>
                        <img src={Benefit5} alt="image" />
                      </Box>
                      <Box className='benefittitle5'>
                        <Box className='benefit-title'> Fundraising value add</Box>
                        <Box className="benefit">Guiding businesses to enable them to raise funds successfully and in compliance to the rules and regulations</Box>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} lg={4} md={6} sm={12}>
                    <Grid className="provide-grid">
                      <Box className='benefit-img6'>
                        <img src={Benefit6} alt="image" />
                      </Box>
                      <Box className='benefittitle6'>
                        <Box className='benefit-title'>Great user experience</Box>
                        <Box className="benefit">Constantly improving the platform to deliver an exceptional experience for all.</Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>

              {/* <Box sx={{ marginTop: "50px" }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} lg={4} md={6} sm={12} >
                    <Grid className="benefit-grid">
                      <Box className='benefit-img4'>
                        <img src={Benefit4} alt="image" />
                      </Box>
                      <Box className='benefittitle'>
                        <Box className='benefit-title'>Adherence to regulation </Box>
                        <Box className="benefit">We ensure the fundraising and investing processes are in compliance with regulatory requirements. </Box>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} lg={4} md={6} sm={12}>
                    <Grid className="benefit-grid">
                      <Box className='benefit-img5'>
                        <img src={Benefit5} alt="image" />
                      </Box>
                      <Box className='benefittitle5'>
                        <Box className='benefit-title'> Fundraising value add</Box>
                        <Box className="benefit">Guiding businesses to enable them to raise funds successfully and in compliance to the rules and regulations</Box>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} lg={4} md={6} sm={12}>
                    <Grid className="provide-grid">
                      <Box className='benefit-img6'>
                        <img src={Benefit6} alt="image" />
                      </Box>
                      <Box className='benefittitle6'>
                        <Box className='benefit-title'>Great user experience</Box>
                        <Box className="benefit">Constantly improving the platform to deliver an exceptional experience for all.</Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Box> */}
            </Box>
          </Container>
        </Box>
        <Box className="home-raisingmoney" >
          <Container maxWidth="lg">
            <Box sx={{ marginTop: 25, position: "relative" }} className="hamza-point" >
              <Grid>
                <Grid className="hamza-grid" >
                  <Box className='hamza-img' >
                    <img src={Hamza} alt="image" />
                  </Box>
                  <Box >
                    <Box className='hamza-title' >
                      “Bridging the gap in the Start-up and SME Ecosystem”
                    </Box>
                    <Box className='hamza-quote' sx={{ fontSize: "16px" }} >
                      <Box sx={{ fontWeight: "700" }}>Hamza Al Lawati</Box>
                      <Box sx={{ fontSize: "14px" }}>Founder & CEO, Wadiaa</Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ marginTop: "100px" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box sx={{
                  color: "#fff", fontSize: "40px",
                  fontweight: "700"
                }}>How it works?</Box>
              </Box>
              <Container sx={{ margin: "auto", marginTop: "75px" }}>
                <Box className="work-line" >

                  <Box className='workbox1' sx={{ width: { md: "190px" } }} >
                    <Box className="work-grid">
                      <Box sx={{
                        fontWeight: 900,
                        fontSize: "24px",
                        color: "#57C0F1",
                        pt: 2,
                        pl: 3
                      }} >1</Box>
                      <Box className='work-img'>
                        <img src={Work1} alt="image" />
                      </Box>
                      <Box className='work-title1 '>Business applies for funding on Wadiaa</Box>
                    </Box>
                  </Box>

                  <Box className='workbox2' sx={{ width: { md: "190px" } }} >
                    <Box className="work-grid">
                      <Box sx={{
                        fontWeight: 900,
                        fontSize: "24px",
                        color: "#57C0F1",
                        pt: 2,
                        pl: 3
                      }} >2</Box>
                      <Box className='work-img'>
                        <img src={Work2} alt="image" />
                      </Box>
                      <Box className='work-title2'>Wadiaa does a due-diligence and risk assessment on the funding proposal</Box>
                    </Box>
                  </Box>

                  <Box className='workbox3' sx={{ width: { md: "190px" } }} >
                    <Box className="work-grid">
                      <Box sx={{
                        fontWeight: 900,
                        fontSize: "24px",
                        color: "#57C0F1",
                        pt: 2,
                        pl: 3
                      }} >3</Box>
                      <Box className='work-img3'>
                        <img src={Work3} alt="image" />
                      </Box>
                      <Box className='work-title3'>Approved fundraising campaigns listed on the marketplace</Box>
                    </Box>
                  </Box>

                  <Box className='workbox4' sx={{ width: { md: "190px" } }} >
                    <Box className="work-grid">
                      <Box sx={{
                        fontWeight: 900,
                        fontSize: "24px",
                        color: "#57C0F1",
                        pt: 2,
                        pl: 3
                      }} >4</Box>
                      <Box className='work-img4'>
                        <img src={Work4} alt="image" />
                      </Box>
                      <Box className='work-title4'>Investors select and fund requests based on their interests and investment assessment</Box>
                    </Box>
                  </Box>

                  <Box className='workbox5' sx={{ width: { md: "190px" } }} >
                    <Box className="work-grid" >
                      <Box sx={{
                        fontWeight: 900,
                        fontSize: "24px",
                        color: "#57C0F1",
                        pt: 2,
                        pl: 3
                      }} >5</Box>
                      <Box className='work-img'>
                        <img src={Work5} alt="image" />
                      </Box>
                      <Box className='work-title5'>Businesses get funded and grow, providing investors returns in multiples when an investment exit is secured in the future.</Box>
                    </Box>
                  </Box>

                </Box>
              </Container>
            </Box>

            <Box className='home-faq'>
              <Grid container spacing={3} sx={{ position: "relative" }} >
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
                        <Typography>
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
                        <Typography>
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
                        <Typography>
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
                        <Typography>
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
                        <Typography>
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

        </Box>




      </Box >
      <Footer />
      {/* </div > */}
    </div >
  )
}

export default Home