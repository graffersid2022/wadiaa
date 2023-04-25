import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Box, Container, Button, Typography, Grid } from '@mui/material'
import RightArrow from '../../assets/images/right-arrow.png'
import LeftArrow from '../../assets/images/left-arrow.png'
import Tick from '../../assets/images/tick.png'
import { Outlet } from 'react-router-dom'
import Footer from "../Footer"
import axios from 'axios'
import { useParams } from "react-router-dom";
import { getCampaignId, getCampaignAllData, getSingleData } from "../Actions/CampaignAction";
import { useSelector, useDispatch } from "react-redux";
import ROUTES from '../Configs/Routes'
import COMMON from '../Configs/Common'


function Preview() {

  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const token = localStorage.getItem("token");
  const params = useParams();
  const campaignID = useSelector(state => state.CampaignReducer.campaignId)
  const campaignData = useSelector(state => state.CampaignReducer.data)
  const [singleCampaignData, setSingleCampaignData] = useState([])

  const handleGetdata = () => {
    if (location.pathname === ROUTES.PREVIEW.PITCH) {
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_UAT_URL}/${process.env.REACT_APP_TYPE_CAMPAIGN}/${campaignID}/content`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          ...COMMON.SECURITY_HEADERS
        },
      })
        .then((response) => {
          if (response.status === 200) {
            for (let i in response.data) {
              dispatch(getCampaignAllData(
                {
                  [response.data[i].type.type]: response.data[i]
                }
              ))
            }
          }
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
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
          if (response.status === 200) {
            setSingleCampaignData(response.data.content.filter(
              item => item.id === Number(params.campaignId)
            ))
            dispatch(getSingleData(response.data.content.filter(
              item => item.id === Number(params.campaignId)
            )))
          }
        })
        .catch((error) => {
          console.log(error)
        })

      axios({
        method: "GET",
        url: `${process.env.REACT_APP_UAT_URL}/fundraising/campaigns/${params.campaignId}/content`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          ...COMMON.SECURITY_HEADERS
        },
      })
        .then((response) => {
          if (response.status === 200) {
            for (let i in response.data) {
              dispatch(getCampaignAllData(
                {
                  [response.data[i].type.type]: response.data[i]
                }
              ))
            }
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }

  }

  const getCampaignData = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_UAT_URL}/${process.env.REACT_APP_TYPE_CAMPAIGN}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...COMMON.SECURITY_HEADERS

      },
    })
      .then((response) => {
        if (response.status === 200) {
          dispatch(getCampaignId(response.data.content[0].id))
        }
      })
  }

  useEffect(() => {
    getCampaignData();
    handleGetdata();
  }, [])

  return (
    <Box className="preview-main">

      <Box Box sx={{ height: "100vh" }}>
        <Box sx={{ background: "#F3F3F3", padding: "16px 0" }}>
          <Container>
            {
              params.campaignId === undefined ?
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Box className='preview-text'>Preview Page</Box>
                  <Box>
                    <Button variant="contained" className="btn-back-to-edit" onClick={() => { navigate(ROUTES.RAISEMONEY.CAMPAIGN) }}>
                      <img src={LeftArrow} alt="leftArrow" className='arrow-image' />
                      Back to edit</Button>
                  </Box>
                </Box>
                :
                <Box sx={{ textAlign: "end" }}>
                  <Box>
                    <Button variant="contained" className="btn-back-to-edit" onClick={() => { navigate(ROUTES.INVEST_HOME) }}>
                      <img src={LeftArrow} alt="leftArrow" className='arrow-image' />
                      Back to Dashboard</Button>
                  </Box>
                </Box>
            }
          </Container>
        </Box>
        <Container sx={{ justifyContent: 'center' }}>
          <Box sx={{ display: { xs: 'block', lg: "flex" }, marginTop: "80px" }}>
            <Box sx={{ width: { xs: '100%', lg: "60%" } }}>
              <Box sx={{
                display: { xs: 'flex', lg: 'block' },
                fontWeight: "900",
                fontSize: " 48px",
                color: "#235AAC",
                justifyContent: 'center'
              }}>
                <img src={campaignData.LOGO?.attachmentUrl} alt="image" className="campaign-preview-logo" />
              </Box>
              <img src={campaignData.BANNER?.attachmentUrl} alt="image" className="preview-1" />
            </Box>
            <Box sx={{ width: { xs: '100%', lg: "40%" }, marginTop: { xs: '20px', lg: '0' } }}>
              <Box sx={{
                background: "#FFFFFF",
                boxShadow: "0px 4px 20px rgba(34, 34, 34, 0.1)",
                borderRadius: "40px",
                border: "1px solid #72C9F3",
                padding: { xs: '32px 20px', sm: "32px 50px" }
              }}>
                <Box sx={{ display: "flex" }}>
                  <Typography className="trending-div" sx={{ marginRight: "16px" }}> <img src={Tick} alt="tick" />Trending</Typography>
                  <Typography className="trending-div"> <img src={Tick} alt="tick" />Accredited</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
                  <Typography sx={{ color: "#235AAC", fontSize: { xs: '24px', md: "36px" }, fontWeight: "900", marginRight: "20px" }}>$ 5,937,000</Typography>
                  <Typography>Raised</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                  <Typography sx={{ color: "#151515", fontSize: "24px", fontWeight: "600", marginRight: { xs: '30px', sm: "20px" } }}>$ {singleCampaignData[0]?.details?.previouslyFundedAmount ? singleCampaignData[0]?.details?.previouslyFundedAmount : 0}</Typography>
                  <Typography>Previously Crowdfunded</Typography>
                </Box>
                <Grid container spacing={3} sx={{ mt: 1 }}>
                  <Grid item xs={6}>
                    <Typography className="grid-number" sx={{ xs: '20px!important', sm: '24px' }}>{singleCampaignData[0]?.details?.numberOfInvestments ? singleCampaignData[0]?.details?.numberOfInvestments : 0}</Typography>
                    <Typography className="grid-info">Investors</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography className="grid-number" sx={{ xs: '20px!important', sm: '24px' }}>${singleCampaignData[0]?.details?.valuation ? singleCampaignData[0]?.details?.valuation : 0}</Typography>
                    <Typography className="grid-info">Valuation</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography className="grid-number" sx={{ xs: '20px!important', sm: '24px' }}>${singleCampaignData[0]?.minimumInvestmentAmount ? singleCampaignData[0]?.minimumInvestmentAmount : 0}</Typography>
                    <Typography className="grid-info">Min. Investment</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography className="grid-number" sx={{ xs: '20px!important', sm: '24px' }}>Common</Typography>
                    <Typography className="grid-info">Shares offered</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography className="grid-number" sx={{ xs: '20px!important', sm: '24px' }}>${singleCampaignData[0]?.details?.priceForShare ? singleCampaignData[0]?.details?.priceForShare : 0}</Typography>
                    <Typography className="grid-info">Price per share</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography className="grid-number" sx={{ xs: '20px!important', sm: '24px', textTransform: "capitalize" }}>{singleCampaignData[0]?.type ? singleCampaignData[0]?.type : "CROWDFUNDING"}</Typography>
                    <Typography className="grid-info">Offering type</Typography>
                  </Grid>
                </Grid>
                {
                  location.pathname === ROUTES.PREVIEW.PITCH ?
                    ""
                    :
                    <Button variant="contained" onClick={() => { navigate(`/investment/${params.campaignId}`) }} sx={{ width: "100%", mt: 3, background: "#57C0F1", padding: "16px 0", fontSize: "22px", borderRadius: "10px" }}>Invest Now</Button>
                }
              </Box>
            </Box>
          </Box>
        </Container>
        <Box className="second-tab" sx={{ padding: { xs: '30px 117px', sm: "30px 150px" } }}>
          <Button onClick={() => { params.campaignId === undefined ? navigate(ROUTES.PREVIEW.PITCH) : navigate(`/preview/pitch/${params.campaignId}`) }}>Pitch</Button>
          <Button onClick={() => { params.campaignId === undefined ? navigate(ROUTES.PREVIEW.TERMS) : navigate(`/preview/terms/${params.campaignId}`) }}>Terms</Button>
          <Button onClick={() => { params.campaignId === undefined ? navigate(ROUTES.PREVIEW.FAQ) : navigate(`/preview/faq/${params.campaignId}`) }}>FAQ</Button>
          <Button onClick={() => { params.campaignId === undefined ? navigate(ROUTES.PREVIEW.UPDATE) : navigate(`/preview/update/${params.campaignId}`) }}>Updates</Button>
          <Button onClick={() => { params.campaignId === undefined ? navigate(ROUTES.PREVIEW.REVIEW) : navigate(`/preview/review/${params.campaignId}`) }}>Reviews</Button>
          <Button onClick={() => { params.campaignId === undefined ? navigate(ROUTES.PREVIEW.DISCUSSION) : navigate(`/preview/discussion/${params.campaignId}`) }}>Discussion</Button>
        </Box>
        <Outlet />
        <Footer />
      </Box >

    </Box >
  )
}

export default Preview  