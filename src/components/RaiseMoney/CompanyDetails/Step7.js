import React from "react";
import { json, useNavigate } from "react-router-dom"
import {
  Box,
  Grid,
  TextField,
  FormHelperText,
  Container,
  Button,
  Chip
} from "@mui/material";

import LeftArrow from "../../../assets/images/left-arrow.png";
import RightArrow from "../../../assets/images/right-arrow.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import ROUTES from "../../Configs/Routes";
import COMMON from "../../Configs/Common";

function Step7({ handleBack, activeStep, attachment }) {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const token = localStorage.getItem("token");
    let arr = ["file_1", "file_2", "file_3", "file_4", "file_5", "file_6"]
    for (let i = 0; i < arr.length; i++) {
      let passData = {
        file: data[arr[i]][0],
      }
      axios({
        method: "POST",
        url: `${process.env.REACT_APP_UAT_URL}/${process.env.REACT_APP_TYPE_BUSINESS}/attachment`,
        data: passData,
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          Authorization: `Bearer ${token} `,
          ...COMMON.SECURITY_HEADERS
        },
      })
        .then((response) => {
          if (response.status === 200) {
          //   let data = JSON.parse(localStorage.getItem('campaignData'))
          //  if(data){ 
          //   axios({
          //     method: "POST",
          //     url: `${process.env.REACT_APP_UAT_URL}/campaign/${data[0].id}/data/updated`,
          //     data: passData,
          //     headers: {
          //       "Content-Type": "multipart/form-data",
          //       Accept: "application/json",
          //       Authorization: `Bearer ${token} `,
          //       ...COMMON.SECURITY_HEADERS
          //     },
          //   }).then(
          //     localStorage.removeItem("campaignData")
          //   ).catch()
          // }
            navigate(ROUTES.RAISEMONEY.CAMPAIGN)
          }
        })
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                id="filled-basic"
                type="file"
                label="Upload Owner Passport"
                variant="filled"
                fullWidth
                className={
                  watch("file_1") ? "step-input black-color" : "step-input transparent-color"
                }
                InputLabelProps={
                  watch("file_1") ? { shrink: true } : { shrink: false }
                }
                {...register("file_1", { required: "required" })}
                helperText="Passport Copy (include Visa Page - If applicable)"
              />
              <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.file_1 ? errors?.file_1?.message : null}</FormHelperText>
              {
                attachment[0]?.name &&
                <Chip label={attachment[0]?.name}
                  sx={{ mb: 1, mr: 2 }} />
              }
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                id="filled-basic"
                type="file"
                label="Upload Owner Residence/Tax ID"
                variant="filled"
                fullWidth
                className={
                  watch("file_2") ? "step-input black-color" : "step-input transparent-color"
                }
                InputLabelProps={
                  watch("file_2") ? { shrink: true } : { shrink: false }
                }
                helperText="Upload Residence/Tax ID"
                {...register("file_2", { required: "required" })}
              />
              <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.file_2 ? errors?.file_2?.message : null}</FormHelperText>
              {
                attachment[1]?.name &&
                <Chip label={attachment[1]?.name}
                  sx={{ mb: 1, mr: 2 }} />
              }
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                id="filled-basic"
                type="file"
                label="Upload Company CR certificate"
                variant="filled"
                fullWidth
                className={
                  watch("file_3") ? "step-input black-color" : "step-input transparent-color"
                }
                InputLabelProps={
                  watch("file_3") ? { shrink: true } : { shrink: false }
                }
                helperText="Upload CR certificate"
                {...register("file_3", { required: "required" })}

              />
              <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.file_3 ? errors?.file_3?.message : null}</FormHelperText>
              {
                attachment[2]?.name &&
                <Chip label={attachment[2]?.name}
                  sx={{ mb: 1, mr: 2 }} />
              }
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                id="filled-basic"
                type="file"
                label="Audited Owner Financials"
                variant="filled"
                fullWidth className={
                  watch("file_4") ? "step-input black-color" : "step-input transparent-color"
                }
                InputLabelProps={
                  watch("file_4") ? { shrink: true } : { shrink: false }
                }
                helperText="If company registration is less than one year old, financials attested by the board is acceptable"
                {...register("file_4", { required: "required" })}
              />
              <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.file_4 ? errors?.file_4?.message : null}</FormHelperText>
              {
                attachment[3]?.name &&
                <Chip label={attachment[3]?.name}
                  sx={{ mb: 1, mr: 2 }} />
              }
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                id="filled-basic"
                type="file"
                label="Authorized Signatory Signature"
                variant="filled"
                fullWidth
                className={
                  watch("file_5") ? "step-input black-color" : "step-input transparent-color"
                }
                InputLabelProps={
                  watch("file_5") ? { shrink: true } : { shrink: false }
                }
                helperText="Authorized Signatory Signature"
                {...register("file_5", { required: "required" })}
              />
              <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.file_5 ? errors?.file_5?.message : null}</FormHelperText>
              {
                attachment[4]?.name &&
                <Chip label={attachment[4]?.name}
                  sx={{ mb: 1, mr: 2 }} />
              }
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                id="filled-basic"
                type="file"
                label="Company Authorization letter"
                variant="filled"
                fullWidth
                className={
                  watch("file_6") ? "step-input black-color" : "step-input transparent-color"
                }
                InputLabelProps={
                  watch("file_6") ? { shrink: true } : { shrink: false }
                }
                helperText="Company Authorization letter"
                {...register("file_6", { required: "required" })}
              />
              <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.file_6 ? errors?.file_6?.message : null}</FormHelperText>
              {
                attachment[5]?.name &&
                <Chip label={attachment[5]?.name}
                  sx={{ mb: 1, mr: 2 }} />
              }
            </Grid>
          </Grid>
        </Container>
        <Box sx={{ pt: 2 }} className="step-bottom">
          <Container
            maxWidth="lg"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                color: "#235AAC",
                borderBottom: "1px solid",
                cursor: "pointer",
              }}
            >
              Back To Dashboard
            </Box>
            <Box>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
                className="back-btn"
              >
                <img src={LeftArrow} alt="leftArrow" className="arrow-image" />
                Previous
              </Button>
              <Button type="submit" sx={{ mr: 1 }} className="next-btn">
                Submit
                <img
                  src={RightArrow}
                  alt="rightarrow"
                  className="arrow-image"
                />
              </Button>
            </Box>
          </Container>
        </Box>
      </form>
    </Box>
  );
}

export default Step7;
