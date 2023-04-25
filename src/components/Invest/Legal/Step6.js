import React from "react";
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
import { useNavigate } from "react-router";
import ROUTES from "../../Configs/Routes";
import COMMON from "../../Configs/Common";

function Step6({ handleNext, handleBack, activeStep, user7 }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const token = localStorage.getItem("token");

    let newValue
    let arr = []

    for (const [key, value] of Object.entries(data)) {
      newValue = value
      if (newValue?.length != 0) {
        arr.push(key)
      }
    }

    for (let i = 0; i < arr.length; i++) {
      let passData = {
        file: data[arr[i]][0],
      }
      axios({
        method: "POST",
        url: `${process.env.REACT_APP_UAT_URL}/${process.env.REACT_APP_TYPE_INVESTOR}/attachment`,
        data: passData,
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          ...COMMON.SECURITY_HEADERS
        },
      })
        .then((response) => {
          if (response.status === 200) {
            navigate(ROUTES.INVEST.TERMS_CONDITION)
          }
        })
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ margin: '15px' }}>
          <Container maxWidth="lg">
            <Grid container spacing={5}>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="filled-basic"
                  type="file"
                  label="Upload Passport copy*"
                  variant="filled"
                  fullWidth
                  className={
                    watch("file_1") ? "step-input black-color" : "step-input transparent-color"
                  }
                  InputLabelProps={
                    watch("file_1") ? { shrink: true } : { shrink: false }
                  }
                  helperText="Passport Copy (include Visa Page - If applicable) "
                  {...register("file_1", { required: "Passport Attachment is Required" })}
                />
                {
                  user7[0].name &&
                  <Chip label={user7[0].name}
                    // onDelete={() => handleDelete(campaignContent.HIGHLIGHTS.id)}
                    sx={{ mb: 1, mr: 2 }} />
                }
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.file_1 ? errors?.file_1?.message : null}</FormHelperText>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="filled-basic"
                  type="file"
                  label="Upload Residence/Tax ID*"
                  variant="filled"
                  fullWidth
                  helperText="Residence ID Copy (or) Tax ID copy "
                  className={
                    watch("file_2") ? "step-input black-color" : "step-input transparent-color"
                  }
                  InputLabelProps={
                    watch("file_2") ? { shrink: true } : { shrink: false }
                  }
                  {...register("file_2", { required: "Residence ID Attachment is Required" })}
                />
                {
                  user7[1].name &&
                  <Chip label={user7[1].name}
                    // onDelete={() => handleDelete(campaignContent.HIGHLIGHTS.id)}
                    sx={{ mb: 1, mr: 2 }} />
                }
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.file_2 ? errors?.file_2?.message : null}</FormHelperText>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="filled-basic"
                  type="file"
                  label="Upload CR Document*"
                  variant="filled"
                  fullWidth
                  className={
                    watch("file_3") ? "step-input black-color" : "step-input transparent-color"
                  }
                  InputLabelProps={
                    watch("file_3") ? { shrink: true } : { shrink: false }
                  }
                  helperText="Company Registration Document"
                  {...register("file_3", { required: "CR Document Attachment is Required" })}
                />
                {
                  user7[2].name &&
                  <Chip label={user7[2].name}
                    // onDelete={() => handleDelete(campaignContent.HIGHLIGHTS.id)}
                    sx={{ mb: 1, mr: 2 }} />
                }
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.file_3 ? errors?.file_3?.message : null}</FormHelperText>

              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  id="filled-basic"
                  type="file"
                  label="Upload Authorized Signature *"
                  variant="filled"
                  fullWidth
                  className={
                    watch("file_4") ? "step-input black-color" : "step-input transparent-color"
                  }
                  InputLabelProps={
                    watch("file_4") ? { shrink: true } : { shrink: false }
                  }
                  helperText="Authorized Signatory Signature "
                  {...register("file_4", { required: "Authorized Signature Attachment Required" })}
                />
                {
                  user7[3].name &&
                  <Chip label={user7[3].name}
                    // onDelete={() => handleDelete(campaignContent.HIGHLIGHTS.id)}
                    sx={{ mb: 1, mr: 2 }} />
                }
                <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.file_4 ? errors?.file_4?.message : null}</FormHelperText>

              </Grid>
            </Grid>
          </Container>
        </Box>
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
            <Box className="btnmargin">
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
                Proceed
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

export default Step6;
