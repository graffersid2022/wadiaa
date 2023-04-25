import React, { useState, useEffect } from "react";
import {
  Box,
  Stepper,
  Step,
  Typography,
  Container,
  StepLabel,
  Divider,
} from "@mui/material";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import Step7 from "./Step7";
import StepHeader from "../../StepHeader";
import axios from "axios";
import COMMON from "../../Configs/Common";
const steps = [
  "Legal Entity Details",
  "Contact Details",
  "Financial Information",
  "Commercial Information",
  "Bank Details",
  "Company Management",
  "Upload documents",
];

function RaiseMoney() {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [user1, setUser1] = useState([]);
  const [user2, setUser2] = useState({});
  const [user3, setUser3] = useState({});
  const [user4, setUser4] = useState({});
  const [user5, setUser5] = useState({});
  const [user6owner, setUser6owner] = useState([]);
  const [user6member, setUser6member] = useState([]);
  const [attachment, setAttachment] = useState([]);

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

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const token = localStorage.getItem("token");
  const getDetails = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_UAT_URL}/${process.env.REACT_APP_TYPE_BUSINESS}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...COMMON.SECURITY_HEADERS
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setUser1({ ...user1, ...response.data })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }


  useEffect(() => {
    getDetails()
  }, []);

  useEffect(() => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_UAT_URL}/${process.env.REACT_APP_TYPE_BUSINESS}/address`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...COMMON.SECURITY_HEADERS
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setUser2({ ...user2, ...response.data })
        }
      })
      .catch((error) => {
        console.log(error)
      })

    axios({
      method: "GET",
      url: `${process.env.REACT_APP_UAT_URL}/${process.env.REACT_APP_TYPE_BUSINESS}/finance`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...COMMON.SECURITY_HEADERS
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setUser3({ ...user3, ...response.data })
        }
      })
      .catch((error) => {
        console.log(error)
      })

    axios({
      method: "GET",
      url: `${process.env.REACT_APP_UAT_URL}/${process.env.REACT_APP_TYPE_BUSINESS}/commerce`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...COMMON.SECURITY_HEADERS
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setUser4({ ...user4, ...response.data })
        }
      })
      .catch((error) => {
        console.log(error)
      })

    axios({
      method: "GET",
      url: `${process.env.REACT_APP_UAT_URL}/${process.env.REACT_APP_TYPE_BUSINESS}/bank/accounts`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...COMMON.SECURITY_HEADERS
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setUser5({ ...user5, ...response.data.content[0] })
        }
      })
      .catch((error) => {
        console.log(error)
      })

    axios({
      method: "GET",
      url: `${process.env.REACT_APP_UAT_URL}/${process.env.REACT_APP_TYPE_BUSINESS}/owners`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...COMMON.SECURITY_HEADERS
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setUser6owner([...user6owner, ...response.data.content])
        }
      })
      .catch((error) => {
        console.log(error)
      })

    axios({
      method: "GET",
      url: `${process.env.REACT_APP_UAT_URL}/${process.env.REACT_APP_TYPE_BUSINESS}/members`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...COMMON.SECURITY_HEADERS
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setUser6member([...user6member, ...response.data.content])
        }
      })
      .catch((error) => {
        console.log(error)
      })

    axios({
      method: "GET",
      url: `${process.env.REACT_APP_UAT_URL}/${process.env.REACT_APP_TYPE_BUSINESS}/attachments`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...COMMON.SECURITY_HEADERS
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setAttachment(response.data.content)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])




  return (

    <Box sx={{ background: "#ffffff" }} className="raise-money-bg">
      <Container maxWidth="lg">
        <Box sx={{ paddingTop: "106px" }}>
          <Box
            sx={{
              display: { xs: 'block', sm: 'flex' },
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
                  background: "#F5F5F5",
                  paddingLeft: { xs: '0!important', sm: '20px' },
                  display: "flex"
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
          <Box sx={{ fontSize: "32px", fontWeight: "900" }}>
            Apply To Raise Funds
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
            user1={user1}
            setUser1={setUser1}
            getDetails
          />
        ) : activeStep === 1 ? (
          <Step2
            handleNext={handleNext}
            handleBack={handleBack}
            activeStep={activeStep}
            user2={user2}
            setUser2={setUser2}
          />
        ) : activeStep === 2 ? (
          <Step3
            handleNext={handleNext}
            handleBack={handleBack}
            activeStep={activeStep}
            user3={user3}
            setUser3={setUser3}
          />
        ) : activeStep === 3 ? (
          <Step4
            handleNext={handleNext}
            handleBack={handleBack}
            activeStep={activeStep}
            user4={user4}
            setUser4={setUser4}
          />
        ) : activeStep === 4 ? (
          <Step5
            handleNext={handleNext}
            handleBack={handleBack}
            activeStep={activeStep}
            user5={user5}
            setUser5={setUser5}
          />
        ) : activeStep === 5 ? (
          <Step6
            handleNext={handleNext}
            handleBack={handleBack}
            activeStep={activeStep}
            user6owner={user6owner}
            user6member={user6member}
          />
        ) : activeStep === 6 ? (
          <Step7
            handleNext={handleNext}
            handleBack={handleBack}
            activeStep={activeStep}
            attachment={attachment}
          />
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
}

export default RaiseMoney;
