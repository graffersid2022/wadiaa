import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import {
  Box,
  Container,
  Grid,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import RightArrow from "../../../assets/images/right-arrow.png";
import Close from "../../../assets/images/close.png";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
// import { investorData } from "../../Actions/InvestorAction";
import COMMON from "../../Configs/Common";
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
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const token = localStorage.getItem("token");

  const dispatch = useDispatch();
  const state = useSelector((state) => state.InvestorReducer);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm();


  const onSubmit = (data) => {
    let id;

    let passdata = {
      category: value === 0 && "SOPHISTICATED",
      subCategory: data.sophisticatedInvestor,
    }

    let file = {
      file: data.file[0],
    }

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_UAT_URL}/accreditation`,
      data: passdata,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...COMMON.SECURITY_HEADERS
      },
    })
      .then((response) => {
        console.log(response)
        if (response.status === 200) {
          id = response.data.accreditationId
        }
      })
      .catch((error) => {
        console.log(error.response)
      })

    setTimeout(() => {
      id &&
        axios({
          method: "POST",
          url: `${process.env.REACT_APP_UAT_URL}/accreditation/${id}/attachment`,
          data: file,
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            ...COMMON.SECURITY_HEADERS
          },
        })
          .then((response) => {
            if (response.status === 200) {
              console.log(response)
            }
          })
          .catch((response) => {
            console.log(response)
          });
    }, 1000);
  }

  return (

    <Box sx={{ background: "#fff" }}>
      <Box sx={{ pt: 15, margin: '10px' }}>
        <Container maxWidth="lg">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                fontWeight: "700",
                fontSize: "28px",
              }}
            >
              Apply for Accreditation
            </Box>
            <Box>
              Upon submission, your request will b  e reviewed by our agent and
              approved subject to satisfactory documentation. The review may take
              up to 24 hours.
            </Box>
            <Grid container spacing={5}>
              <Grid item xs={9}>
                <Box
                  sx={{
                    background: "#F5F5F5",
                    padding: "30px",
                    borderRadius: "10px",
                    mt: 4,
                  }}
                >
                  <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Sophisticated Investor" {...a11yProps(0)} sx={{ fontSize: "20px" }} />
                      </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                      <Controller
                        rules={{ required: true }}
                        control={control}
                        name="sophisticatedInvestor"
                        render={({ field }) => {
                          return (
                            <RadioGroup {...field}>
                              <FormControlLabel
                                value="GOVERNMENT"
                                control={<Radio />}
                                className="radio1-label"
                                label="My net personal assets exceed USD 779,244 (Seven Hundred and Seventy Nine Thousand, Two Hundred and Forty Four United States Dollar) or OMR 300,000 (Three Hundred Thousand Omani Rial) or its equivalent in foreign currencies"
                              />
                              <FormControlLabel
                                sx={{ mt: 2 }}
                                value="CMA_LICENSED_ENTITIES"
                                control={<Radio />}
                                className="radio1-label"
                                label="My gross total annual income is not less than USD 51,949 (Fifty One Thousand, Nine Hundred and Forty Nine United States Dollar) or OMR 20,000 (Twenty Thousand Omani Rial) or its equivalent in foreign currencies in the last twelve (12) months"
                              />
                              <FormControlLabel
                                sx={{ mt: 2 }}
                                value="CBO_LICENSED_ENTITIES"
                                control={<Radio />}
                                className="radio1-label"
                                label="I jointly with my spouse, have a gross total annual income exceeding USD 77,924 (Seventy Seven Thousand, Nine Hundred and Twenty Four United States Dollar) or OMR 30,000 (Thirty Thousand Omani Rial) or its equivalent in foreign currencies in the last twelve (12) months."
                              />
                              <FormControlLabel
                                sx={{ mt: 2 }}
                                value="PENSION_FUNDS"
                                control={<Radio />}
                                className="radio1-label"
                                label="I jointly with my spouse, have a gross total annual income exceeding USD 77,924 (Seventy Seven Thousand, Nine Hundred and Twenty Four United States Dollar) or OMR 30,000 (Thirty Thousand Omani Rial) or its equivalent in foreign currencies in the last twelve (12) months."
                              />
                              <FormControlLabel
                                sx={{ mt: 2 }}
                                value="LEVEL_1"
                                control={<Radio />}
                                className="radio1-label"
                                label="I jointly with my spouse, have a gross total annual income exceeding USD 77,924 (Seventy Seven Thousand, Nine Hundred and Twenty Four United States Dollar) or OMR 30,000 (Thirty Thousand Omani Rial) or its equivalent in foreign currencies in the last twelve (12) months."
                              />
                            </RadioGroup>
                          )
                        }}
                      />
                    </TabPanel>

                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Box sx={{ mt: 2 }}>Upload Documents based on the selected option</Box>
            <Grid container spacing={5}>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="filled-basic"
                  InputLabelProps={{
                    shrink: false,
                  }}
                  type="file"
                  label="Upload PDF document"
                  variant="filled"
                  fullWidth
                  {...register("file", {
                    required: true,
                  })}
                  className="step-input"
                  helperText="Please upload the document proof to confirm the selected statement above.(Bank Net Worth or Income Statement)"
                />
              </Grid>
            </Grid>
            <Box sx={{ mt: 3, mb: 10 }}>
              <Button variant="contained"
                type="submit"
                sx={{ mr: 2, background: "#57C0F1", fontSize: "18px", padding: "13px 24px", borderRadius: "10px" }}>
                Apply for accreditation
                <img src={RightArrow} alt="image" className="arrow-image" />
              </Button>
              <Button variant="outlined"
                type="submit" sx={{ color: "#57C0F1", padding: "12px 24px", fontSize: "18px", border: "2px solid #57c0f1", borderRadius: "10px", marginTop: { xs: '10px', sm: '0' } }}>
                <img src={Close} alt="image" className="arrow-image" />
                Cancel
              </Button>
            </Box>
          </form>
        </Container>
      </Box >
    </Box >
  );
}

