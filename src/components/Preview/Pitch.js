import React, { useState, useEffect } from "react";
import { Box, Container, Button, Typography, Grid } from "@mui/material";
import Founder2 from "../../assets/images/founder-2.png";
import EdutechLogo from "../../assets/images/edutechlogo.png";
import { useSelector } from "react-redux";

function Pitch() {
  const campaignData = useSelector(state => state.CampaignReducer.data)
  const SingleData = useSelector(state => state.CampaignReducer.singleData)

  var myId = getId(`${campaignData?.VIDEO_LINK?.description}`);

  function getId(url) {
    var regExp = /^.*(you.tube\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url?.match(regExp);

    if (match && match[2].length == 11) {
      return match[2];
    } else {
      return 'error';
    }
  }

  return (
    <Box>
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Grid sx={{ mt: "50px", textAlign: "center" }} className='video'>
          <iframe class="responsive-iframe"
            src={`https://www.youtube.com/embed/${myId}`}
          ></iframe>
        </Grid>
        <Grid container spacing={3} sx={{ mt: 5 }}>
          <Grid item xs={12} sm={7}>
            <h1>Highlights</h1>
            <Typography sx={{ mt: 3 }}>
              {campaignData.HIGHLIGHTS?.description}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={5}>
            <img src={campaignData.HIGHLIGHTS?.attachmentUrl} alt="img2" className="preview-2" />
          </Grid>
        </Grid>
        <Box sx={{ mt: 5 }}>
          <h1>The Problem</h1>
          <Typography>
            {campaignData.PROBLEM?.description}
          </Typography>
          <div className="preview-3">
            <img src={campaignData.PROBLEM?.attachmentUrl} alt="img" />
          </div>
        </Box>
        <Box sx={{ mt: 5 }}>
          <h1>Solution</h1>
          <Typography>
            {campaignData.SOLUTION?.description}
          </Typography>
        </Box>
        <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid item xs={12}>
            <Box className="solution-grid" sx={{ textAlign: "center" }}>
              <img src={campaignData.SOLUTION?.attachmentUrl} alt="img" />
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ display: { xs: 'block', sm: "flex" }, marginTop: { xs: '80px', sm: "150px" } }}>
          <Box sx={{ width: { xs: '100%', sm: "50%" } }}>
            <img src={campaignData.PRODUCT?.attachmentUrl} alt="img" className="preview-4" />
          </Box>
          <Box sx={{ width: { xs: '100%', sm: "50%" } }}>
            <h1>Product/Service</h1>
            <Typography>
              {campaignData.PRODUCT?.description}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: { xs: 'block', sm: "flex" }, marginTop: { xs: '80px', sm: "150px" } }}>
          <Box sx={{ width: { xs: '100%', sm: "50%" } }}>
            <h1>Traction</h1>
            <Typography>
              {campaignData.TRACTION?.description}
            </Typography>
          </Box>
          <Box sx={{ width: { xs: '100%', sm: "50%" }, marginTop: { xs: '10%', sm: "0" } }}>
            <img src={campaignData.TRACTION?.attachmentUrl} alt="img" className="preview-5" />
          </Box>
        </Box>

        <Box className="preview-customer">
          <h1>Customers</h1>
          <Typography sx={{ mt: 5 }}>
            {campaignData.CUSTOMERS?.description}
          </Typography>
          <Grid
            container
            spacing={3}
            sx={{ marginTop: "30px", alignIstems: "center" }}
          >
            <Grid item sm={12} sx={{ textAlign: "center" }}>
              <img src={campaignData.CUSTOMERS?.attachmentUrl} alt="img" width="200" height="200" />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ mt: 5 }}>
          <h1>Business Model</h1>
          <Box sx={{ textAlign: "center", width: { xs: '300px', md: '500px' } }}>
            <img src={campaignData.BUSINESS?.attachmentUrl} alt="img" />
          </Box>
          <Typography sx={{ mt: 4 }}>
            {campaignData.BUSINESS?.description}
          </Typography>
        </Box>
      </Container>
      <Box sx={{ background: "#57c0f11a", marginTop: "100px" }}>
        <Container maxWidth="lg">
          <Box sx={{ padding: { xs: '80px 20px', md: "80px 0" } }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <img src={campaignData.MARKET?.attachmentUrl} alt="img" className="preview-5" />
              </Grid>
              <Grid item xs={12} md={6}>
                <h1>Market</h1>
                <Typography sx={{ lineHeight: "173%" }}>
                  {campaignData.MARKET?.description}
                </Typography>
              </Grid>
            </Grid>

          </Box>
        </Container>
      </Box>
      <Box>
        <Container maxWidth="lg">
          <Box className="Competition-preview">
            <h1>Competition</h1>
            <Typography>
              {campaignData.COMPETITION?.description}
            </Typography>
            <Box sx={{ mt: 5, textAlign: "center" }}>
              <img src={campaignData.COMPETITION?.attachmentUrl} alt="img" className="Competition-img" />
            </Box>
          </Box>
          <Box sx={{ display: { xs: 'block', md: "flex" }, margin: { xs: '30px' } }}>
            <Box sx={{ width: { xs: "100%", sm: '80%', md: '50%' } }}>
              <img src={campaignData.STRATEGY?.attachmentUrl} alt="img" className="preview-6" />
            </Box>
            <Box sx={{ width: { xs: "100%", md: '50%' } }}>
              <h1>Strategy</h1>
              <Typography>
                {campaignData.STRATEGY?.description}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", marginTop: { xs: '50px', md: "150px" }, display: { xs: 'block', md: "flex" }, margin: { xs: '30px' } }}>
            <Box sx={{ width: { xs: "100%", md: '50%' } }}>
              <h1>Funding</h1>
              <Typography>
                {campaignData.FUNDING?.description}
              </Typography>
            </Box>
            <Box sx={{ width: { xs: "100%", sm: '80%', md: '50%' } }}>
              <Grid item xs={12} sx={{ p: { xs: '15px 5px', md: "0 20px" } }} >
                <img src={campaignData.FUNDING?.attachmentUrl} alt="img" />
              </Grid>
            </Box>
          </Box>

          <Box sx={{ mt: { xs: '50px', sm: "100px" }, margin: { xs: '30px' } }}>
            <h1>The Team</h1>
            <Grid container spacing={3}>
              <Grid item xs={12} md={5}>
                <img src={campaignData.TEAM?.attachmentUrl} alt="img" className="founder-preview" />
              </Grid>
              <Grid item xs={12} md={7}>
                <Box>
                  <Typography sx={{ marginRight: { xs: '1%', sm: "20%" } }}>
                    {campaignData.TEAM?.description}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ mt: "100px" }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4} sx={{ margin: { xs: "20px", md: '0' } }}>
                <Typography sx={{ mb: 3 }}>
                  <b>Legal name:</b> {SingleData[0]?.business?.name}
                </Typography>
                <Typography sx={{ mb: 3 }}>
                  <b>Founding year:</b> {SingleData[0]?.details?.fundraiserFoundingYear}
                </Typography>
                <Typography sx={{ mb: 3 }}>
                  <b>Registration Country:</b> {SingleData[0]?.business?.registrationCountry}
                </Typography>
                <Typography sx={{ mb: 3 }}>
                  <b>Employees:</b> {SingleData[0]?.business?.numberOfEmployees}
                </Typography>
                <Typography>
                  <b>Website: </b> {SingleData[0]?.details?.fundraiserWebsite}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default Pitch;
