import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import {
  Box,
  Stepper,
  Step,
  Button,
  Typography,
  Container,
  StepLabel,
  Divider,
} from "@mui/material";
import StepHeader from "../../StepHeader";
import axios from "axios";
import ROUTES from "../../Configs/Routes";
import COMMON from "../../Configs/Common";
import { useDispatch, useSelector } from 'react-redux'
import { getCampaignId } from "../../Actions/CampaignAction";


const steps = ["General Details", "Upload documents", "Campaign details "];

function Index() {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [campaign, setCampaign] = useState({});
  const [campaignContent, setCampaignContent] = useState({});
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const getDetails = () => {
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
          singleCampaign(response.data.content[0]?.id)
          dispatch(getCampaignId(response.data.content[0]?.id))
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const campaignData =async ()=>{
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_UAT_URL}/pre/screening`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...COMMON.SECURITY_HEADERS

      },
    }).then(res=>{
      localStorage.setItem("campaignData",JSON.stringify(res.data.content))
    }).catch()
  }

  useEffect(() => {
    campaignData()
    getDetails()
  }, [])

  const singleCampaign = (id) => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_UAT_URL}/${process.env.REACT_APP_TYPE_CAMPAIGN}/${id}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...COMMON.SECURITY_HEADERS
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setCampaign({ ...campaign, ...response?.data })
        }
      })
      .catch((error) => {
        console.log(error)
      })

    axios({
      method: "GET",
      url: `${process.env.REACT_APP_UAT_URL}/${process.env.REACT_APP_TYPE_CAMPAIGN}/${id}/content`,
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
            setCampaignContent(
              (prevUser) => ({ ...prevUser, [response.data[i].type.type]: response.data[i] })
            )
          }
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <Box sx={{ background: "#ffffff" }} className="raise-money-bg">
      <Container maxWidth="lg">
        <Box sx={{ paddingTop: "108px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <StepHeader />
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Stepper
                activeStep={activeStep}
                sx={{
                  borderRadius: "10px",
                  padding: "20px",
                  paddingLeft: { xs: '0!important', sm: '20px' },
                  background: "#F5F5F5",
                }}
                alternativeLabel
              >
                {steps.map((label, index) => (
                  <Step key={label} sx={{}}>
                    <StepLabel
                      onClick={handleStep(index)}
                      sx={{ fontSize: "12px !important" }}
                      className="step-form"
                    >
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Box>
        </Box>
      </Container>
      <Divider sx={{ my: 3 }} />
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{ fontSize: { xs: '28px', sm: "32px" }, fontWeight: "900", marginRight: "50px" }}
            >
              Create Campaign
            </Box>
          </Box>
          <Box>
            <Button
              variant="contained"
              className="previwe-btn"
              onClick={() => navigate(ROUTES.PREVIEW.PITCH)}
            >
              Preview page
            </Button>
          </Box>
        </Box>

        <div>
          <Typography sx={{ mt: 2, mb: 3, py: 1, display: "flex" }}>
            <Box className="Polygon">{activeStep + 1}</Box>
            <Box sx={{ fontSize: "24px", fontWeight: "700" }}>
              {steps[activeStep]}
            </Box>
          </Typography>
        </div>
      </Container>
      <Box sx={{ paddingBottom: "100px" }}>
        {activeStep === 0 ? (
          <Step1
            handleNext={handleNext}
            handleBack={handleBack}
            activeStep={activeStep}
            setCampaign={setCampaign}
            campaign={campaign}
            getDetails={getDetails}
          />
        ) : activeStep === 1 ? (
          <Step2 handleNext={handleNext}
            handleBack={handleBack}
            activeStep={activeStep}
            campaignContent={campaignContent}
            setCampaignContent={setCampaignContent}
          />
        ) : activeStep === 2 ? (
          <Step3
            handleBack={handleBack}
            activeStep={activeStep}
            campaignContent={campaignContent}
            setCampaignContent={setCampaignContent}
          />
        ) : null}
      </Box>
    </Box>
  );
}

export default Index;
