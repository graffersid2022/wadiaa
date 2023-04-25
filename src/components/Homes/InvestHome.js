import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import FaqImage from "../../assets/images/faq-img.png";
import Footer from "../Footer";
import propTypes from 'prop-types';
import {
  Box,
  Grid,
  Typography,
  Container,
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Tab,
  Tabs
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import campaign1 from "../../assets/images/campaign1.png";
import { getUserType } from "../Actions/Index"
import { useDispatch } from "react-redux";
import ROUTES from "../Configs/Routes";
import axios from "axios";
import moment from "moment";
import Benefit1 from "../../assets/images/benefit1.png"
import Benefit2 from "../../assets/images/benefit2.png"
import Benefit3 from "../../assets/images/benefit3.png"
import Benefit4 from "../../assets/images/benefit4.png"
import Benefit5 from "../../assets/images/benefit5.png"
import Benefit6 from "../../assets/images/benefit6.png"
import COMMON from "../Configs/Common";
import { toast } from "react-toastify";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: propTypes.node,
  index: propTypes.number.isRequired,
  value: propTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Landing() {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("data"));
  const [campaignData, setCampaignData] = useState([])
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const token = localStorage.getItem("token");
  const [value, setValue] = React.useState(1);
  const handleChange1 = (event, newValue) => {
    setValue(newValue);
  };

  const handleInvestor = () => {
    if (localStorage.getItem("token") === null) {
      navigate(ROUTES.SIGN_UP)
      dispatch(getUserType("INVESTOR"))
    } else if (user.type === "BUSINESS") {
      toast("You are already registered as a business user")
    }
    else {
      navigate(ROUTES.INVEST.INVEST)
    }
  }

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

  function scrollWin() {
    window.scrollBy(0, 900);
  }

  return (
    <div>
      <div className="invest-home-div">
        <Container maxWidth="lg" className="home-container">
          <Box sx={{ color: "#193D71", fontSize: { xs: '30px', sm: "64px" }, fontWeight: "900", marginTop: { xs: '17%', sm: '0' } }}>
            Investor registration
          </Box>
          <Box
            sx={{
              color: "#193D71",
              fontSize: { xs: '24px', sm: "32px" },
              fontWeight: "400",
              marginTop: "46px",
              opacity: "0.8",
            }}
          >
            A diversified portfolio of digital education <br />
            platform across various metaverses
          </Box>
          <Button
            variant="contained"
            className="home-raisemoney"
            sx={{ background: "#235AAC" }}
            onClick={scrollWin}
          >
            Invest Now
          </Button>
        </Container>
        <Box sx={{ backgroundColor: "#193d71" }}>
          <Box>
            <Container maxWidth="lg" sx={{ pt: 10 }}>
              { campaignData.length>0?
                <Box
                sx={{
                  fontWeight: "700",
                  fontSize: { xs: '36px', sm: "48px" },
                  color: "#fff",
                  marginTop: { xs: '22%', sm: '0' }
                }}
              >
                Open investments
              </Box>
              :null}
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
          </Box>
          <Box className="second-container">

            <Container maxWidth="lg">
              <Box>
                <Box sx={{ paddingTop: "92px", fontSize: "40px", color: "#fff" }}>
                  Benefits for you
                </Box>
                <Box >
                  <Grid container spacing={3} >
                    <Grid item xs={12} lg={4} md={6} sm={12}>
                      <Grid className="benefit-grid">
                        <Box className='benefit-img'>
                          <img src={Benefit1} alt="image" />
                        </Box>
                        <Box className='benefittitle' sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                          <Box className='benefit-title' sx={{ fontSize: { xs: '20px' } }}>Most promising investment opportunities </Box>
                          <Box className="benefit1">Our due diligence process ensures that the best opportunities are presented to you. </Box>
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} lg={4} md={6} sm={12} >
                      <Grid className="benefit-grid">
                        <Box className='benefit-img'>
                          <img src={Benefit2} alt="image" />
                        </Box>
                        <Box className='benefittitle' sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
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
                        <Box className='benefittitl3' sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                          <Box className='benefit-title'>Safe and secure platform</Box>
                          <Box className="benefit">The platform is regularly tested and upgraded to ensure a secure and reliable investment and fundraising experience.</Box>
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} lg={4} md={6} sm={12}>
                      <Grid className="benefit-grid">
                        <Box className='benefit-img4'>
                          <img src={Benefit4} alt="image" />
                        </Box>
                        <Box className='benefittitle' sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
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
                        <Box className='benefittitle5' sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
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
                        <Box className='benefittitle6' sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                          <Box className='benefit-title'>Great user experience</Box>
                          <Box className="benefit">Constantly improving the platform to deliver an exceptional experience for all.</Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </Box>
          <Box className="home-raisingmoney">
            <Container maxWidth="lg" sx={{ pt: 6 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "50px",
                }}
              >
                <Box
                  sx={{
                    fontWeight: "700",
                    fontSize: { xs: '28px', sm: "40px" },
                    color: "#fff",
                  }}
                >
                  Benefits of investing in Wadiaa
                </Box>
                <Button
                  variant="contained"
                  sx={{
                    fontSize: { xs: "20px", sm: "24px" },
                    fontWeight: "700",
                    padding: { xs: '2px 34px', sm: "14px 40px" },
                    borderRadius: "48px",
                    background: "#57C0F1",
                  }}
                  onClick={handleInvestor}
                >
                  Invest Now
                </Button>
              </Box>
              <Box className="home-raise-div">
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box sx={{ height: "100%" }}>
                      <Box className="home-que" sx={{ fontSize: { xs: '18px' } }}>
                        Invest in your passion
                      </Box>
                      <Box className="home-ans" sx={{ fontSize: { xs: '16px' } }}>
                        As an investor, you can choose from our exciting fundraising campaigns and invest in businesses that you believe in, or businesses with a vision and mission that resonate with your values.
                      </Box>
                    </Box>
                    <Divider
                      sx={{ background: "rgba(255, 255, 255, 0.2)", mt: 2 }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box sx={{ height: "100%" }}>
                      <Box className="home-que" sx={{ fontSize: { xs: '18px' } }}>
                        Invest alongside prominent VCs and Angel Investors
                      </Box>
                      <Box className="home-ans">
                        Invest along some of the most seasoned Angel and VC investors. You may rely on their experience and due diligence.
                      </Box>
                    </Box>
                    <Divider
                      sx={{ background: "rgba(255, 255, 255, 0.2)", mt: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box sx={{ height: "100%" }}>
                      <Box className="home-que" sx={{ fontSize: { xs: '18px' } }}>Easy access to startup and SME funding</Box>
                      <Box className="home-ans" sx={{ fontSize: { xs: '16px' } }}>
                        Investing in startups and SMEs is no longer only for the wealthy, but accessible to all with a keen interest in supporting promising startups and SMEs and growing your investment
                      </Box>
                    </Box>
                    <Divider
                      sx={{ background: "rgba(255, 255, 255, 0.2)", mt: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box sx={{ height: "100%" }}>
                      <Box className="home-que" sx={{ fontSize: { xs: '18px' } }}>
                        Diversify your investment portfolio
                      </Box>
                      <Box className="home-ans" sx={{ fontSize: { xs: '16px' } }}>
                        Crowdfunding offers everyone the opportunity to diversify from traditional investment opportunities and opens a new set of higher risk, higher return investment opportunities. You can spread your investments across a range of campaigns to spread your risk and ensure healthy returns.
                      </Box>
                    </Box>
                    <Divider
                      sx={{ background: "rgba(255, 255, 255, 0.2)", mt: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box sx={{ height: "100%" }}>
                      <Box className="home-que" sx={{ fontSize: { xs: '18px' } }}>
                        Easy and Simple
                      </Box>
                      <Box className="home-ans" sx={{ fontSize: { xs: '16px' } }}>
                        We enable an easy tech-enabled investment process. All steps, including KYC and related paperwork can be conducted remotely, giving you the freedom to invest on the go.
                      </Box>
                    </Box>
                    <Divider
                      sx={{ background: "rgba(255, 255, 255, 0.2)", mt: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box sx={{ height: "100%" }}>
                      <Box className="home-que" sx={{ fontSize: { xs: '18px' } }}>
                        Monitor your investments and keep updated on their progress
                      </Box>
                      <Box className="home-ans" sx={{ fontSize: { xs: '16px' } }}>
                        Wadiaa investors are your biggest fans and engaged supporters. They spread the word in their networks, can offer help in their field of expertise, and introduce you to their connections. Our investors include seasoned Angel Investors, VCs, social media influencers, supporters and can help you beyond raising capital.
                      </Box>
                    </Box>
                    <Divider
                      sx={{ background: "rgba(255, 255, 255, 0.2)", mt: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box sx={{ height: "100%" }}>
                      <Box className="home-que" sx={{ fontSize: { xs: '18px' } }}>
                        High investment returns for higher risk
                      </Box>
                      <Box className="home-ans" sx={{ fontSize: { xs: '16px' } }}>
                        Start-ups come with potentially significant risks as you may lose your principal amount if the business fails. In addition to our screening process shortlisting the most attractive opportunities, each Start-up promises high rewards based on their future projections. The promises can be in the order of multiples at Exit.
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Box className='home-faq'>
                <Grid container spacing={3} className='flex' >
                  <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
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
            <Container>
              <Box sx={{ marginTop: "100px" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Box sx={{
                    color: "#fff", fontSize: { xs: '36px', sm: "40px" },
                    fontweight: "700"
                  }}>Types of Investors</Box>
                </Box>
                <Box className='invester'>
                  <Box sx={{ flexGrow: 1, display: { xs: 'block', sm: 'block', md: 'flex' } }}>
                    <Tabs
                      orientation="vertical"
                      variant="scrollable"
                      value={value}
                      onChange={handleChange1}
                      aria-label="Vertical tabs example"
                      sx={{ borderRight: 1, borderColor: 'divider' }}
                    >
                      <Tab label=" Individual Investors" className='tab1' disabled>
                      </Tab>
                      <Tab label="Retail Investors" {...a11yProps(1)} className='tab' />
                      <Tab label="Angel investors" {...a11yProps(2)} className='tab' />
                      <Tab label="Sophisticated Investors" {...a11yProps(3)} className='tab' />
                      <Tab
                        label="Business Investors" className='tab1' disabled>
                      </Tab>
                      <Tab label="Sophisticated Business" {...a11yProps(5)} className='tab' />
                      <Tab label="Other Company" {...a11yProps(6)} className='tab' />
                    </Tabs>
                    <TabPanel value={value} index={2} className='sophibusiness'>
                      <Box className='sophi'>
                        Angel Investors
                      </Box>
                      <li>
                        Your total net personal assets exceed RO 300,000 (Three Hundred Thousand <br />Omani Rial) or its equivalent in foreign currencies; or
                      </li>
                      <li>
                        Your gross total annual income is not less than RO 20,000 (Twenty Thousand <br />Omani Rial) or its equivalent in foreign currencies in the last twelve (12) <br />months; or
                      </li>
                      <li>
                        You, jointly with your spouse, have a gross total annual income exceeding<br /> RO 30,000 (Thirty Thousand Omani Rial) or its equivalent in foreign <br />currencies in the last twelve (12) months.
                      </li><br />
                      <Box className='limit'>
                        <span className='limitspan'>Investment Limit: </span> Up to RO 100,000 (One Hundred Thousand Omani Rial) for <br />Equity Crowdfunding  within a twelve (12) month period.
                      </Box>
                    </TabPanel>
                    <TabPanel value={value} index={1} className='sophibusiness' sx={{ fontSize: { xs: '16px', sm: '20px' } }}>
                      <Box className='sophi' >
                        Retail Investors
                      </Box>
                      <li>
                        You cannot be categorized as neither a sophisticated nor angel investor
                      </li><br />
                      <Box className='limit'>
                        <span className='limitspan'>Investment Limit: </span> Up to RO 3,000 (Three Thousand Omani Rial) per Campaign and<br /> not exceeding RO 20,000 (Twenty Thousand Omani Rial) within a twelve (12)<br /> month period.
                      </Box>
                    </TabPanel>
                    <TabPanel value={value} index={3} className='sophibusiness' sx={{ fontSize: { xs: '16px', sm: '20px' } }}>
                      <Box className='sophi'>
                        Sophisticated Investors
                      </Box>
                      <li>
                        Your total net personal assets or total net joint assets with his or her spouse <br />exceed RO 500,000 (Five Hundred Thousand Omani Rial) or its equivalent in <br />foreign currencies, excluding the value of the individual’s primary residence; or
                      </li>
                      <li>
                        Your gross total annual income is not less than RO 30,000 (Thirty Thousand <br />Omani Rial) or its equivalent in foreign currencies in the last twelve (12)<br /> months; or
                      </li>
                      <li>
                        You, jointly with your spouse, have a gross total annual income exceeding RO 50,000 <br />(Fifty Thousand Omani Rial) or its equivalent in foreign currencies in the last twelve <br />(12) months.
                      </li><br />
                      <Box className='limit'>
                        <span className='limitspan'> Investment Limit: </span> No restrictions
                      </Box>
                    </TabPanel>
                    <TabPanel value={value} index={5} className='sophibusiness' sx={{ fontSize: { xs: '16px', sm: '20px' } }}>
                      <Box className='sophi'>
                        Sophisticated Business
                      </Box>
                      <Box className='limit'>
                        Institutional Investors as set out in Article 1, Clause 8 of the Rules for  Crowdfunding <br />Platforms [Decision No. E/153/2021] issued by the CMA and refers to:
                      </Box>
                      <li>
                        Units of the administrative status of the Government
                      </li>
                      <li>
                        Entities licensed by the CMA including capital market institutions, companies <br />operating in the field of securities, insurance, and Takaful companies
                      </li>
                      <li>
                        Financial institutions licensed by the Central Bank of Oman
                      </li>
                      <li>
                        Pension funds
                      </li>
                      <li>
                        A company or investment fund with total assets exceeding RO 1,000,000<br />
                        (One Million Omani Rial) or itsequivalent in foreign currencies
                      </li><br />
                      <Box className='limit'>
                        <span className='limitspan'>Investment Limit: </span> No restrictions
                      </Box>
                    </TabPanel>
                    <TabPanel value={value} index={6} className='sophibusiness' sx={{ fontSize: { xs: '16px', sm: '20px' } }}>
                      <Box className='sophi'>
                        Other Company
                      </Box>
                      <li>
                        Institutions that may not be categorized as Sophisticated Investors as set <br />out in Article 1,Clause 8 of the Rules for Crowdfunding Platforms <br />[Decision No. E/153/2021] issued by the CMA
                      </li><br />
                      <Box className='limit'>
                        <span className='limitspan'> Investment Limit:</span> Up to RO 3,000 (Three Thousand Omani Rial) per Campaign and not <br />exceeding RO 20,000 (Twenty Thousand Omani Rial) within a twelve (12) month period.<br /><br />
                      </Box>
                    </TabPanel>
                  </Box>
                </Box>
              </Box>
            </Container>
            <Footer />
          </Box>
        </Box>
      </div >
    </div >
  );
}

