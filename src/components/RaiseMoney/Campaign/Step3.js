import React from "react";
import {
  Box,
  Grid,
  TextField,
  FormHelperText,
  Container,
  Button,
} from "@mui/material";
import LeftArrow from "../../../assets/images/left-arrow.png";
import RightArrow from "../../../assets/images/right-arrow.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
import COMMON from "../../Configs/Common";
import Chip from '@mui/material/Chip';
import { toast } from "react-toastify";

function Step3({ handleBack, activeStep, campaignContent, setCampaignContent }) {
  console.log(campaignContent)


  const campaignID = useSelector(state => state.CampaignReducer.campaignId)
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      HIGHLIGHTS_DISCRIPTION: campaignContent?.HIGHLIGHTS?.description,
      PROBLEM_DISCRIPTION: campaignContent?.PROBLEM?.description,
      SOLUTION_DISCRIPTION: campaignContent?.SOLUTION?.description,
      PRODUCT_DISCRIPTION: campaignContent?.PRODUCT?.description,
      TRACTION_DISCRIPTION: campaignContent?.TRACTION?.description,
      CUSTOMERS_DISCRIPTION: campaignContent?.CUSTOMERS?.description,
      BUSINESS_DISCRIPTION: campaignContent?.BUSINESS?.description,
      MARKET_DISCRIPTION: campaignContent?.MARKET?.description,
      COMPETITION_DISCRIPTION: campaignContent?.COMPETITION?.description,
      STRATEGY_DISCRIPTION: campaignContent?.STRATEGY?.description,
      FUNDING_DISCRIPTION: campaignContent?.FUNDING?.description,
      RISKS_DISCRIPTION: campaignContent?.RISKS?.description,
      TEAM_DISCRIPTION: campaignContent?.TEAM?.description,
    }
  });


  const token = localStorage.getItem("token");
  let passData1
  let campaignType


  const onSubmit = (data) => {
    let getNewKey = [];
    let newValue
    for (const [key, value] of Object.entries(data)) {
      newValue = value
      if (value != "" && newValue?.length != 0 && value !== undefined) {
        getNewKey.push(key.substring(0, key.lastIndexOf("_")))
      }
    }

    campaignType = [...new Set(getNewKey)];

    campaignType.map((item, index) => {

      if (item === "FAQ") {
        const FAQ = data?.FAQ_FILE[0];
        if (FAQ.type != "application/pdf") {
          setError("FAQ_FILE", {
            type: "filetype",
            message: "Only PDF are valid"
          });
          return;
        }
      }
      if (item === "TERMS_AND_CONDITION") {
        const TERMS_AND_CONDITION = data?.TERMS_AND_CONDITION_FILE[0];
        if (TERMS_AND_CONDITION.type != "application/pdf") {
          setError("TERMS_AND_CONDITION_FILE", {
            type: "filetype",
            message: "Only PDF are valid"
          });
          return;
        }
      }

      let passData
      if (item + "_DISCRIPTION" in data) {
        passData = {
          description: data[item + "_DISCRIPTION"],
        }
      } else {
        passData = {
          description: "",
        }
      }

      if (passData.description != "") {
        setTimeout(() => {
          if (item + "_FILE" in data) {
            passData1 = {
              file: data[item + "_FILE"][0],
              type: item,
            }
          } else {
            passData1 = {
              file: "",
              type: item,
            }
          }

          if (!campaignContent[item].description) {
            axios({
              method: "POST",
              url: `${process.env.REACT_APP_UAT_URL}/${process.env.REACT_APP_TYPE_CAMPAIGN}/${campaignID}/content/description?type=${item}`,
              data: passData,
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
                ...COMMON.SECURITY_HEADERS
              },
            })
              .then((response) => {
                if (response.status == 201) {
                  handleAttachment(response.data)
                  getCampaignData()
                }
              })
              .catch((error) => {
                console.log(error)
              })
          } else {
            if (campaignContent[item].description !== data[item + "_DISCRIPTION"]) {
              axios({
                method: "PUT",
                url: `${process.env.REACT_APP_UAT_URL}/${process.env.REACT_APP_TYPE_CAMPAIGN}/${campaignID}/content/description/${campaignContent[item].id}`,
                data: passData,
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  "X-Content-Type-Options": "nosniff",
                  "Strict-Transport-Security": "max-age=max-age=63072000;includeSubDomains; preload",
                  "X-Frame-Options": "SAMEORIGIN",
                  "X-XSS-Protection": 1,
                  Authorization: `Bearer ${token}`,
                },
              })
                .then((response) => {
                  if (response.status === 202) {
                    getCampaignData()
                    toast.success("Campaign content updated successfully")
                  }
                })
            }

            if (campaignContent && campaignContent[item]?.filename !== data[item + "_FILE"][0].name) {
              axios({
                method: "PUT",
                url: `${process.env.REACT_APP_UAT_URL}/${process.env.REACT_APP_TYPE_CAMPAIGN}/${campaignID}/content/attachment/${campaignContent[item].id}`,
                data: passData1,
                headers: {
                  "Content-Type": "multipart/form-data",
                  Accept: "application/json",
                  "X-Content-Type-Options": "nosniff",
                  "Strict-Transport-Security": "max-age=max-age=63072000;includeSubDomains; preload",
                  "X-Frame-Options": "SAMEORIGIN",
                  "X-XSS-Protection": 1,
                  Authorization: `Bearer ${token}`,
                },
              })
                .then((response) => {
                  console.log(response)
                  if (response.status === 202) {
                    getCampaignData()
                    toast.success("Campaign content updated successfully")
                  }
                })
            }
          }
        }, 1000 * index)
      } else {
        if (item + "_FILE" in data) {
          passData1 = {
            file: data[item + "_FILE"][0],
            type: item,
          }
        } else {
          passData1 = {
            file: "",
            type: item,
          }
        }

        if (!campaignContent?.HIGHLIGHTS?.description) {
          axios({
            method: "POST",
            url: `${process.env.REACT_APP_UAT_URL}/${process.env.REACT_APP_TYPE_CAMPAIGN}/${campaignID}/content/attachment`,
            data: passData1,
            headers: {
              "Content-Type": "multipart/form-data",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
              ...COMMON.SECURITY_HEADERS
            },
          })
            .then((response) => {
              if (response.status == 201) {
                getCampaignData()
              }
            })
        } else {
          axios({
            method: "PUT",
            url: `${process.env.REACT_APP_UAT_URL}/${process.env.REACT_APP_TYPE_CAMPAIGN}/${campaignID}/content/attachment/${campaignContent[item].id}`,
            data: passData1,
            headers: {
              "Content-Type": "multipart/form-data",
              Accept: "application/json",
              "X-Content-Type-Options": "nosniff",
              "Strict-Transport-Security": "max-age=max-age=63072000;includeSubDomains; preload",
              "X-Frame-Options": "SAMEORIGIN",
              "X-XSS-Protection": 1,
              Authorization: `Bearer ${token}`,
            },
          })
            .then((response) => {
              console.log(response)
              if (response.status === 202) {
                getCampaignData()
                toast.success("Campaign content updated successfully")
              }
            })
        }
      }
    })
    


  }

  const handleAttachment = (dataId) => {
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_UAT_URL}/${process.env.REACT_APP_TYPE_CAMPAIGN}/${campaignID}/content/attachment/${dataId}`,
      data: passData1,
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        "X-Content-Type-Options": "nosniff",
        "Strict-Transport-Security": "max-age=max-age=63072000;includeSubDomains; preload",
        "X-Frame-Options": "SAMEORIGIN",
        "X-XSS-Protection": 1,
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 202) {
          getCampaignData()
        }
      })
  }

  const handleDelete = (id) => {
    axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_UAT_URL}/${process.env.REACT_APP_TYPE_CAMPAIGN}/${campaignID}/content/attachment/${id}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...COMMON.SECURITY_HEADERS

      },
    })
      .then((response) => {
        if (response.status === 204) {
          toast.success("Deleted Successfully")
          getCampaignData()
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const getCampaignData = () => {
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
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container maxWidth="lg">
          <Box
            sx={{
              fontWeight: "700",
              fontSize: "24px",
            }}
          >
            Pitch
          </Box>
          <Box
            sx={{
              fontWeight: "600",
              fontSize: "18px",
              mt: 3,
            }}
          >
            The Highlights*
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id="filled-textarea"
                label="Write something...."
                multiline
                variant="filled"
                fullWidth
                helperText="Enter the highlight of your project"
                className="multiples-input"
                {...register("HIGHLIGHTS_DISCRIPTION", {
                  required: "Highlight Description is Required",
                })}
              />
              <FormHelperText sx={{ color: "#ff3e3e" }}>
                {errors?.HIGHLIGHTS_DISCRIPTION ? errors?.HIGHLIGHTS_DISCRIPTION?.message : null}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                id="filled-basic"
                type="file"
                label="Upload image*"
                variant="filled"
                fullWidth
                className={
                  watch("HIGHLIGHTS_FILE") ? "step-input black-color" : "step-input transparent-color"
                }
                InputLabelProps={
                  watch("HIGHLIGHTS_FILE") ? { shrink: true } : { shrink: false }
                }
                helperText="Upload the image of heightlight"
                {...register("HIGHLIGHTS_FILE")}
              />
              {
                campaignContent?.HIGHLIGHTS?.filename &&
                <Chip label={campaignContent?.HIGHLIGHTS?.filename}
                  onDelete={() => handleDelete(campaignContent.HIGHLIGHTS.id)}
                  sx={{ mb: 1, mr: 2 }} />
              }
              <FormHelperText sx={{ color: "#ff3e3e" }}>
                {errors?.HIGHLIGHTS_FILE ? errors?.HIGHLIGHTS_FILE?.message : null}
              </FormHelperText>
            </Grid>
          </Grid>
          <Box
            sx={{
              fontWeight: "600",
              fontSize: "18px",
              mt: 3,
            }}
          >
            The Problem*
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id="filled-textarea"
                label="Write something...."
                multiline
                variant="filled"
                fullWidth
                helperText="Enter the Problem use case of your Project"
                className="multiples-input"
                {...register("PROBLEM_DISCRIPTION", {
                  required: "Problem Description is Required",
                })}
              />
              <FormHelperText sx={{ color: "#ff3e3e" }}>
                {errors?.PROBLEM_DISCRIPTION ? errors?.PROBLEM_DISCRIPTION?.message : null}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                id="filled-basic"
                type="file"
                label="Upload image*"
                variant="filled"
                fullWidth
                className={
                  watch("PROBLEM_FILE") ? "step-input black-color" : "step-input transparent-color"
                }
                InputLabelProps={
                  watch("PROBLEM_FILE") ? { shrink: true } : { shrink: false }
                }
                helperText="upload the image of problem"
                {...register("PROBLEM_FILE")}
              />
              {
                campaignContent?.PROBLEM?.filename &&
                <Chip label={campaignContent?.PROBLEM?.filename}
                  onDelete={() => handleDelete(campaignContent.PROBLEM.id)}
                  sx={{ mb: 1, mr: 2 }} />
              }
              <FormHelperText sx={{ color: "#ff3e3e" }}>
                {errors?.PROBLEM_FILE ? errors?.PROBLEM_FILE?.message : null}
              </FormHelperText>
            </Grid>
          </Grid>
          <Box
            sx={{
              fontWeight: "600",
              fontSize: "18px",
              mt: 3,
            }}
          >
            The Solution*
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id="filled-textarea"
                label="Write something...."
                multiline
                variant="filled"
                fullWidth
                helperText="Enter the Solution use case of your Project"
                className="multiples-input"
                {...register("SOLUTION_DISCRIPTION", {
                  required: "Solution Description is Required",
                })}
              />
              <FormHelperText sx={{ color: "#ff3e3e" }}>
                {errors?.SOLUTION_DISCRIPTION ? errors?.SOLUTION_DISCRIPTION?.message : null}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                id="filled-basic"
                type="file"
                label="Upload image*"
                variant="filled"
                fullWidth
                className={
                  watch("SOLUTION_FILE") ? "step-input black-color" : "step-input transparent-color"
                }
                InputLabelProps={
                  watch("SOLUTION_FILE") ? { shrink: true } : { shrink: false }
                }
                helperText="upload the image of solution"
                {...register("SOLUTION_FILE")}
              />
              {
                campaignContent?.SOLUTION?.filename &&
                <Chip label={campaignContent?.SOLUTION?.filename}
                  onDelete={() => handleDelete(campaignContent.SOLUTION.id)}
                  sx={{ mb: 1, mr: 2 }} />
              }
              <FormHelperText sx={{ color: "#ff3e3e" }}>
                {errors?.SOLUTION_FILE ? errors?.SOLUTION_FILE?.message : null}
              </FormHelperText>
            </Grid>
          </Grid>
          <Box
            sx={{
              fontWeight: "600",
              fontSize: "18px",
              mt: 3,
            }}
          >
            The Product/Service offered*
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id="filled-textarea"
                label="Write something...."
                multiline
                variant="filled"
                fullWidth
                helperText="Enter the Product/Service offered by your project"
                className="multiples-input"
                {...register("PRODUCT_DISCRIPTION", {
                  required: "Product/Service Description is Required",
                })}
              />
              <FormHelperText sx={{ color: "#ff3e3e" }}>
                {errors?.PRODUCT_DISCRIPTION ? errors?.PRODUCT_DISCRIPTION?.message : null}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                id="filled-basic"
                type="file"
                label="Upload image*"
                variant="filled"
                fullWidth
                className={
                  watch("PRODUCT_FILE") ? "step-input black-color" : "step-input transparent-color"
                }
                InputLabelProps={
                  watch("PRODUCT_FILE") ? { shrink: true } : { shrink: false }
                }
                helperText="Upload the image of Product/Service"
                {...register("PRODUCT_FILE")}
              />
              {
                campaignContent?.PRODUCT?.filename &&
                <Chip label={campaignContent?.PRODUCT?.filename}
                  onDelete={() => handleDelete(campaignContent.PRODUCT.id)}
                  sx={{ mb: 1, mr: 2 }} />
              }
              <FormHelperText sx={{ color: "#ff3e3e" }}>
                {errors?.PRODUCT_FILE ? errors?.PRODUCT_FILE?.message : null}
              </FormHelperText>
            </Grid>
          </Grid>
          <Box
            sx={{
              fontWeight: "600",
              fontSize: "18px",
              mt: 3,
            }}
          >
            The Traction*
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id="filled-textarea"
                label="Write something...."
                multiline
                variant="filled"
                fullWidth
                helperText="Enter the Traction offered by your project"
                className="multiples-input"
                {...register("TRACTION_DISCRIPTION", {
                  required: "Traction Description is Required",
                })}
              />
              <FormHelperText sx={{ color: "#ff3e3e" }}>
                {errors?.TRACTION_DISCRIPTION ? errors?.TRACTION_DISCRIPTION?.message : null}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                id="filled-basic"
                type="file"
                label="Upload image*"
                variant="filled"
                fullWidth
                className={
                  watch("TRACTION_FILE") ? "step-input black-color" : "step-input transparent-color"
                }
                InputLabelProps={
                  watch("TRACTION_FILE") ? { shrink: true } : { shrink: false }
                }
                helperText="Upload the image of Traction"
                {...register("TRACTION_FILE",)}
              />
              {
                campaignContent?.TRACTION?.filename &&
                <Chip label={campaignContent?.TRACTION?.filename}
                  onDelete={() => handleDelete(campaignContent.TRACTION.id)}
                  sx={{ mb: 1, mr: 2 }} />
              }
              <FormHelperText sx={{ color: "#ff3e3e" }}>
                {errors?.TRACTION_FILE ? errors?.TRACTION_FILE?.message : null}
              </FormHelperText>
            </Grid>
          </Grid>
          <Box
            sx={{
              fontWeight: "600",
              fontSize: "18px",
              mt: 3,
            }}
          >
            The Customers*
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id="filled-textarea"
                label="Write something...."
                multiline
                variant="filled"
                fullWidth
                helperText="Enter the Customer Target base of your project"
                className="multiples-input"
                {...register("CUSTOMERS_DISCRIPTION", {
                  required: "Customer Description is Required",
                })}
              />
              <FormHelperText sx={{ color: "#ff3e3e" }}>
                {errors?.CUSTOMERS_DISCRIPTION ? errors?.CUSTOMERS_DISCRIPTION?.message : null}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                id="filled-basic"
                type="file"
                label="Upload image*"
                variant="filled"
                fullWidth
                className={
                  watch("CUSTOMERS_FILE") ? "step-input black-color" : "step-input transparent-color"
                }
                InputLabelProps={
                  watch("CUSTOMERS_FILE") ? { shrink: true } : { shrink: false }
                }
                helperText="Upload the image of Customer Target base"
                {...register("CUSTOMERS_FILE")}
              />
              {
                campaignContent?.CUSTOMERS?.filename &&
                <Chip label={campaignContent?.CUSTOMERS?.filename}
                  onDelete={() => handleDelete(campaignContent.CUSTOMERS.id)}
                  sx={{ mb: 1, mr: 2 }} />
              }
              <FormHelperText sx={{ color: "#ff3e3e" }}>
                {errors?.CUSTOMERS_FILE ? errors?.CUSTOMERS_FILE?.message : null}
              </FormHelperText>
            </Grid>
          </Grid>
          <Box
            sx={{
              fontWeight: "600",
              fontSize: "18px",
              mt: 3,
            }}
          >
            The Business Model*
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id="filled-textarea"
                label="Write something...."
                multiline
                variant="filled"
                fullWidth
                helperText="Enter the Business Model of your project"
                className="multiples-input"
                {...register("BUSINESS_DISCRIPTION", {
                  required: "Business Model Description is Required",
                })}
              />
              <FormHelperText sx={{ color: "#ff3e3e" }}>
                {errors?.BUSINESS_DISCRIPTION ? errors?.BUSINESS_DISCRIPTION?.message : null}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                id="filled-basic"
                type="file"
                label="Upload image*"
                variant="filled"
                fullWidth
                className={
                  watch("BUSINESS_FILE") ? "step-input black-color" : "step-input transparent-color"
                }
                InputLabelProps={
                  watch("BUSINESS_FILE") ? { shrink: true } : { shrink: false }
                }
                helperText="Upload the image of Business Model"
                {...register("BUSINESS_FILE")}
              />
              {
                campaignContent?.BUSINESS?.filename &&
                <Chip label={campaignContent?.BUSINESS?.filename}
                  onDelete={() => handleDelete(campaignContent.BUSINESS.id)}
                  sx={{ mb: 1, mr: 2 }} />
              }
              <FormHelperText sx={{ color: "#ff3e3e" }}>
                {errors?.BUSINESS_FILE ? errors?.BUSINESS_FILE?.message : null}
              </FormHelperText>
            </Grid>
          </Grid>
          <Box
            sx={{
              fontWeight: "600",
              fontSize: "18px",
              mt: 3,
            }}
          >
            The Market*
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id="filled-textarea"
                label="Write something...."
                multiline
                variant="filled"
                fullWidth
                helperText="Enter the Target Market of your project"
                className="multiples-input"
                {...register("MARKET_DISCRIPTION", {
                  required: "Market Description is Required",
                })}
              />
              <FormHelperText sx={{ color: "#ff3e3e" }}>
                {errors?.MARKET_DISCRIPTION ? errors?.MARKET_DISCRIPTION?.message : null}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                id="filled-basic"
                type="file"
                label="Upload image*"
                variant="filled"
                fullWidth
                className={
                  watch("MARKET_FILE") ? "step-input black-color" : "step-input transparent-color"
                }
                InputLabelProps={
                  watch("MARKET_FILE") ? { shrink: true } : { shrink: false }
                }
                helperText="Upload the image of Target Market"
                {...register("MARKET_FILE")}
              />
              {
                campaignContent?.MARKET?.filename &&
                <Chip label={campaignContent?.MARKET?.filename}
                  onDelete={() => handleDelete(campaignContent.MARKET.id)}
                  sx={{ mb: 1, mr: 2 }} />
              }
              <FormHelperText sx={{ color: "#ff3e3e" }}>
                {errors?.MARKET_FILE ? errors?.MARKET_FILE?.message : null}
              </FormHelperText>
            </Grid>
          </Grid>
          <Box
            sx={{
              fontWeight: "600",
              fontSize: "18px",
              mt: 3,
            }}
          >
            The Competition*
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id="filled-textarea"
                label="Write something...."
                multiline
                variant="filled"
                fullWidth
                helperText="Enter your advantage details over your Competition through your project"
                className="multiples-input"
                {...register("COMPETITION_DISCRIPTION", {
                  required: "Competition Description is Required",
                })}
              />
              <FormHelperText sx={{ color: "#ff3e3e" }}>
                {errors?.COMPETITION_DISCRIPTION ? errors?.COMPETITION_DISCRIPTION?.message : null}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                id="filled-basic"
                type="file"
                label="Upload image*"
                variant="filled"
                fullWidth
                className={
                  watch("COMPETITION_FILE") ? "step-input black-color" : "step-input transparent-color"
                }
                InputLabelProps={
                  watch("COMPETITION_FILE") ? { shrink: true } : { shrink: false }
                }
                helperText="Upload the image of Competition"
                {...register("COMPETITION_FILE")}
              />
              {
                campaignContent?.COMPETITION?.filename &&
                <Chip label={campaignContent?.COMPETITION?.filename}
                  onDelete={() => handleDelete(campaignContent.COMPETITION.id)}
                  sx={{ mb: 1, mr: 2 }} />
              }
              <FormHelperText sx={{ color: "#ff3e3e" }}>
                {errors?.COMPETITION_FILE ? errors?.COMPETITION_FILE?.message : null}
              </FormHelperText>
            </Grid>
          </Grid>
          <Box
            sx={{
              fontWeight: "600",
              fontSize: "18px",
              mt: 3,
            }}
          >
            The Strategy*
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id="filled-textarea"
                label="Write something...."
                multiline
                variant="filled"
                fullWidth
                helperText="Enter the Strategy Approach of your project"
                className="multiples-input"
                {...register("STRATEGY_DISCRIPTION", {
                  required: "Strategy Description Required",
                })}
              />
              <FormHelperText sx={{ color: "#ff3e3e" }}>
                {errors?.STRATEGY_DISCRIPTION ? errors?.STRATEGY_DISCRIPTION?.message : null}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                id="filled-basic"
                type="file"
                label="Upload image*"
                variant="filled"
                fullWidth
                className={
                  watch("STRATEGY_FILE") ? "step-input black-color" : "step-input transparent-color"
                }
                InputLabelProps={
                  watch("STRATEGY_FILE") ? { shrink: true } : { shrink: false }
                }
                helperText="Upload the image of Strategy"
                {...register("STRATEGY_FILE")}
              />
              {
                campaignContent?.STRATEGY?.filename &&
                <Chip label={campaignContent?.STRATEGY?.filename}
                  onDelete={() => handleDelete(campaignContent.STRATEGY.id)}
                  sx={{ mb: 1, mr: 2 }} />
              }
              <FormHelperText sx={{ color: "#ff3e3e" }}>
                {errors?.STRATEGY_FILE ? errors?.STRATEGY_FILE?.message : null}
              </FormHelperText>
            </Grid>
          </Grid>
          <Box
            sx={{
              fontWeight: "600",
              fontSize: "18px",
              mt: 3,
            }}
          >
            The Funding*
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id="filled-textarea"
                label="Write something...."
                multiline
                variant="filled"
                fullWidth
                helperText="Enter the Funding details you need for your project"
                className="multiples-input"
                {...register("FUNDING_DISCRIPTION", {
                  required: "Funding Description is Required",
                })}
              />
              <FormHelperText sx={{ color: "#ff3e3e" }}>
                {errors?.FUNDING_DISCRIPTION ? errors?.FUNDING_DISCRIPTION?.message : null}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                id="filled-basic"
                type="file"
                label="Upload image*"
                variant="filled"
                fullWidth
                className={
                  watch("FUNDING_FILE") ? "step-input black-color" : "step-input transparent-color"
                }
                InputLabelProps={
                  watch("FUNDING_FILE") ? { shrink: true } : { shrink: false }
                }
                helperText="Upload the image of Funding"
                {...register("FUNDING_FILE")}
              />
              {
                campaignContent?.FUNDING?.filename &&
                <Chip label={campaignContent?.FUNDING?.filename}
                  onDelete={() => handleDelete(campaignContent.FUNDING.id)}
                  sx={{ mb: 1, mr: 2 }} />
              }
              <FormHelperText sx={{ color: "#ff3e3e" }}>
                {errors?.FUNDING_FILE ? errors?.FUNDING_FILE?.message : null}
              </FormHelperText>
            </Grid>
          </Grid>
          <Box
            sx={{
              fontWeight: "600",
              fontSize: "18px",
              mt: 3,
            }}
          >
            The Risk*
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id="filled-textarea"
                label="Write something...."
                multiline
                variant="filled"
                fullWidth
                helperText="Enter the Risk details associated with your project"
                className="multiples-input"
                {...register("RISKS_DISCRIPTION", {
                  required: "Risks Description is Required",
                })}
              />
              <FormHelperText sx={{ color: "#ff3e3e" }}>
                {errors?.RISKS_DISCRIPTION ? errors?.RISKS_DISCRIPTION?.message : null}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                id="filled-basic"
                type="file"
                label="Upload image*"
                variant="filled"
                fullWidth
                className={
                  watch("RISKS_FILE") ? "step-input black-color" : "step-input transparent-color"
                }
                InputLabelProps={
                  watch("RISKS_FILE") ? { shrink: true } : { shrink: false }
                }
                helperText="Upload the image of Risks"
                {...register("RISKS_FILE")}
              />
              {
                campaignContent?.RISKS?.filename &&
                <Chip label={campaignContent?.RISKS?.filename}
                  onDelete={() => handleDelete(campaignContent.RISKS.id)}
                  sx={{ mb: 1, mr: 2 }} />
              }
              <FormHelperText sx={{ color: "#ff3e3e" }}>
                {errors?.RISKS_FILE ? errors?.RISKS_FILE?.message : null}
              </FormHelperText>
            </Grid>
          </Grid>
          <Box
            sx={{
              fontWeight: "600",
              fontSize: "18px",
              mt: 3,
            }}
          >
            The Team*
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id="filled-textarea"
                label="Write something...."
                multiline
                variant="filled"
                fullWidth
                helperText="Enter the details of the Team associated with your Project"
                className="multiples-input"
                {...register("TEAM_DISCRIPTION", {
                  required: "Team Description is Required",
                })}
              />
              <FormHelperText sx={{ color: "#ff3e3e" }}>
                {errors?.TEAM_DISCRIPTION ? errors?.TEAM_DISCRIPTION?.message : null}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                id="filled-basic"
                type="file"
                label="Upload image*"
                variant="filled"
                fullWidth
                helperText="Helper Text"
                className={
                  watch("TEAM_FILE") ? "step-input black-color" : "step-input transparent-color"
                }
                InputLabelProps={
                  watch("TEAM_FILE") ? { shrink: true } : { shrink: false }
                }
                {...register("TEAM_FILE")}
              />
              {
                campaignContent?.TEAM?.filename &&
                <Chip label={campaignContent?.TEAM?.filename}
                  onDelete={() => handleDelete(campaignContent.TEAM.id)}
                  sx={{ mb: 1, mr: 2 }} />
              }
              <FormHelperText sx={{ color: "#ff3e3e" }}>
                {errors?.TEAM_FILE ? errors?.TEAM_FILE?.message : null}
              </FormHelperText>
            </Grid>
          </Grid>
          <Box sx={{
            fontSize: "20px", mt: 2,
            fontWeight: "500"
          }}>Company details</Box>
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                id="filled-basic"
                type="file"
                label="Upload FAQ PDF*"
                variant="filled"
                fullWidth
                className={
                  watch("FAQ_FILE") ? "step-input black-color" : "step-input transparent-color"
                }
                InputLabelProps={
                  watch("FAQ_FILE") ? { shrink: true } : { shrink: false }
                }
                helperText="Upload FAQs (PDF format)"
                {...register("FAQ_FILE")}
              />
              {
                campaignContent?.FAQ?.filename &&
                <Chip label={campaignContent?.FAQ?.filename}
                  onDelete={() => handleDelete(campaignContent.FAQ.id)}
                  sx={{ mb: 1, mr: 2 }} />
              }
              <FormHelperText sx={{ color: "#ff3e3e" }}>
                {errors?.FAQ_FILE ? errors?.FAQ_FILE?.message : null}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                id="filled-basic"
                type="file"
                label="Upload Terms and condition*"
                variant="filled"
                fullWidth
                className={
                  watch("TERMS_AND_CONDITION_FILE") ? "step-input black-color" : "step-input transparent-color"
                }
                InputLabelProps={
                  watch("TERMS_AND_CONDITION_FILE") ? { shrink: true } : { shrink: false }
                }
                helperText="Upload the Terms and Conditions"
                {...register("TERMS_AND_CONDITION_FILE")}
              />
              {
                campaignContent?.TERMS_AND_CONDITION?.filename &&
                <Chip label={campaignContent?.TERMS_AND_CONDITION?.filename}
                  onDelete={() => handleDelete(campaignContent.TERMS_AND_CONDITION.id)}
                  sx={{ mb: 1, mr: 2 }} />
              }
              <FormHelperText sx={{ color: "#ff3e3e" }}>
                {errors?.TERMS_AND_CONDITION_FILE ? errors?.TERMS_AND_CONDITION_FILE?.message : null}
              </FormHelperText>
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
                Proceed
                <img src={RightArrow} alt="rightarrow" className="arrow-image" />
              </Button>
            </Box>
          </Container>
        </Box>
      </form>
    </Box >
  );
}

export default Step3;

