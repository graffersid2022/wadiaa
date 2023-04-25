import React, { useState, useEffect } from "react"
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
import axios from "axios";
import COMMON from "../../Configs/Common";
const steps = [
  "General Information",
  "Contact Details",
  "Financial Information",
  "Bank Details",
  "Company Management",
  "Upload documents",
];

function RaiseMoney() {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [user, setUser] = useState({});
  const [user1, setUser1] = useState([]);
  const [user2, setUser2] = useState({});
  const [user3, setUser3] = useState({});
  const [user4, setUser4] = useState({});
  const [user5, setUser5] = useState([]);
  const [user6, setUser6] = useState([]);
  const [user7, setUser7] = useState([]);


  const updateUser = (data) => {
    setUser((prevUser) => ({ ...prevUser, ...data }));
  };

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


  const getDetails = () => {
    const token = localStorage.getItem("token");
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_UAT_URL}/${process.env.REACT_APP_TYPE_INVESTOR}`,
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

    axios({
      method: "GET",
      url: `${process.env.REACT_APP_UAT_URL}/${process.env.REACT_APP_TYPE_INVESTOR}/address`,
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
      url: `${process.env.REACT_APP_UAT_URL}/${process.env.REACT_APP_TYPE_INVESTOR}/finance`,
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
      url: `${process.env.REACT_APP_UAT_URL}/${process.env.REACT_APP_TYPE_INVESTOR}/bank/accounts`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...COMMON.SECURITY_HEADERS
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setUser4({ ...user4, ...response.data.content[0] })
        }
      })
      .catch((error) => {
        console.log(error)
      })

    axios({
      method: "GET",
      url: `${process.env.REACT_APP_UAT_URL}/${process.env.REACT_APP_TYPE_INVESTOR}/owners`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...COMMON.SECURITY_HEADERS
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setUser5([...user5, ...response.data.content])
        }
      })
      .catch((error) => {
        console.log(error)
      })

    axios({
      method: "GET",
      url: `${process.env.REACT_APP_UAT_URL}/${process.env.REACT_APP_TYPE_INVESTOR}/members`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...COMMON.SECURITY_HEADERS
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setUser6([...user6, ...response.data.content])
        }
      })
      .catch((error) => {
        console.log(error)
      })

    axios({
      method: "GET",
      url: `${process.env.REACT_APP_UAT_URL}/${process.env.REACT_APP_TYPE_INVESTOR}/attachments`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...COMMON.SECURITY_HEADERS
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setUser7(response.data.content)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getDetails()
  }, []);




  return (
    <Box sx={{ background: "#ffffff" }} className="raise-money-bg">
      <Container maxWidth="lg">
        <Box sx={{ paddingTop: "125px" }}>
          <Box
            sx={{
              display: { xs: 'block', md: "flex" },
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{
              fontWeight: "900",
              fontSize: { xs: '20px', md: "28px" },
              margin: '10px'
            }}>
              Investor Registration
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Stepper
                activeStep={activeStep}
                sx={{
                  borderRadius: "10px",
                  padding: {
                    xs: "10px", sm: "20px"
                  },
                  margin: '5px',
                  background: "#F5F5F5",
                }}
                alternativeLabel
              >
                {steps.map((label, index) => (
                  <Step key={label} sx={{}}>
                    <StepLabel
                      onClick={handleStep(index)}
                      sx={{ fontSize: { xs: '11px!important', sm: "12px" } }}
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
          />
        )
          : activeStep === 1 ? (
            <Step2
              handleNext={handleNext}
              handleBack={handleBack}
              activeStep={activeStep}
              user2={user2}
              setUser2={setUser2}
            />
          )
            : activeStep === 2 ? (
              <Step3
                handleNext={handleNext}
                handleBack={handleBack}
                activeStep={activeStep}
                user3={user3}
                setUser3={setUser3}
              />
            )
              : activeStep === 3 ? (
                <Step4
                  handleNext={handleNext}
                  handleBack={handleBack}
                  activeStep={activeStep}
                  user4={user4}
                  setUser4={setUser4}
                />
              )
                : activeStep === 4 ? (
                  <Step5
                    handleNext={handleNext}
                    handleBack={handleBack}
                    activeStep={activeStep}
                    user5={user5}
                    setUser5={setUser5}
                    user6={user6}
                    setUser6={setUser6}
                  />
                )
                  : activeStep === 5 ? (
                    <Step6
                      handleNext={handleNext}
                      handleBack={handleBack}
                      activeStep={activeStep}
                      user7={user7}
                      setUser7={setUser7}
                    />
                  )
                    // : activeStep === 6 ? (
                    //   <Step7
                    //     handleNext={handleNext}
                    //     handleBack={handleBack}
                    //     activeStep={activeStep}
                    //     user={user}
                    //   />
                    // )
                    : (
                      ""
                    )}
      </Box>
    </Box>
  );
}

export default RaiseMoney;
