import React, { useEffect } from "react";
import {
  Box,
  Grid,
  TextField,
  FormHelperText,
  Container,
  Button,
  Switch,
} from "@mui/material";
import LeftArrow from "../../../assets/images/left-arrow.png";
import RightArrow from "../../../assets/images/right-arrow.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
import COMMON from "../../Configs/Common";
import Chip from '@mui/material/Chip';
import { toast } from "react-toastify";

function Step2({ handleNext, handleBack, activeStep, campaignContent, setCampaignContent }) {
  const token = localStorage.getItem("token");
  const campaignID = useSelector(state => state.CampaignReducer.campaignId)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      VIDEO_LINK_DISCRIPTION: campaignContent?.VIDEO_LINK?.description,
    }
  });

  let passData1
  let campaignType

  const onSubmit = (data) => {
    let getNewKey = [];
    let newValue
    for (const [key, value] of Object.entries(data)) {
      newValue = value
      if (value != "" && newValue.length != 0) {
        getNewKey.push(key.substring(0, key.lastIndexOf("_")))
      }
    }
    campaignType = [...new Set(getNewKey)];
    campaignType.map((item, index) => {
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

          if (item === "PITCH_DECK") {
            const file = data.PITCH_DECK_FILE[0];
            if (file.type != "application/pdf") {
              setError("PITCH_DECK_FILE", {
                type: "filetype",
                message: "Only PDF are valid"
              });
              return;
            }
          }

          if (!campaignContent?.BANNER?.filename) {
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
        if (!campaignContent?.BANNER?.filename) {
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
              console.log(response)
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
  };

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
          toast.success("Campaign content updated successfully")
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
          <Grid container spacing={5}>
            <Grid item xs={12} md={6} lg={4}>
              <Box className="upper-label">Pitch deck</Box>
              <TextField
                id="filled-basic"
                type="file"
                label="Upload pitch deck*"
                variant="filled"
                fullWidth
                className={
                  watch("PITCH_DECK_FILE") ? "step-input black-color" : "step-input transparent-color"
                }
                InputLabelProps={
                  watch("PITCH_DECK_FILE") ? { shrink: true } : { shrink: false }
                }
                helperText="Please upload your Business's latest Pitch deck."
                {...register("PITCH_DECK_FILE"
                )}
              />
              {
                campaignContent?.PITCH_DECK?.filename &&
                <Chip label={campaignContent?.PITCH_DECK?.filename}
                  onDelete={() => handleDelete(campaignContent.PITCH_DECK.id)}
                  sx={{ mb: 1, mr: 2 }} />
              }

              <FormHelperText sx={{ color: "#ff3e3e" }}>
                {errors?.PITCH_DECK_FILE ? errors?.PITCH_DECK_FILE?.message : null}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Box className="upper-label">Campaign Banner image</Box>
              <TextField
                id="filled-basic"
                type="file"
                label="Upload top banner*"
                variant="filled"
                fullWidth
                className={
                  watch("BANNER_FILE") ? "step-input black-color" : "step-input transparent-color"
                }
                InputLabelProps={
                  watch("BANNER_FILE") ? { shrink: true } : { shrink: false }
                }
                helperText="Please upload your company's banner image to be displayed at the top of your campaign page"
                {...register("BANNER_FILE")}
              />
              {
                campaignContent?.BANNER?.filename &&
                <Chip label={campaignContent?.BANNER?.filename}
                  onDelete={() => handleDelete(campaignContent.BANNER.id)}
                  sx={{ mb: 1, mr: 2 }} />
              }
              <FormHelperText sx={{ color: "#ff3e3e" }}>
                {errors?.BANNER_FILE ? errors?.BANNER_FILE?.message : null}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Box className="upper-label">Campaign Link</Box>
              <TextField
                id="filled-basic"
                label="Campaign Link*"
                variant="filled"
                fullWidth
                className="step-input"
                helperText="Please upload the video link of your business campaign for potential Investor's to view"
                {...register("VIDEO_LINK_DISCRIPTION", { required: "Campaign Link is Required" })}
              />
              <FormHelperText sx={{ color: "#ff3e3e" }}>
                {errors?.VIDEO_LINK_DISCRIPTION ? errors?.VIDEO_LINK_DISCRIPTION?.message : null}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Box className="upper-label">Logo</Box>
              <TextField
                id="filled-basic"
                type="file"
                label="Logo*"
                variant="filled"
                fullWidth
                className={
                  watch("LOGO_FILE") ? "step-input black-color" : "step-input transparent-color"
                }
                InputLabelProps={
                  watch("LOGO_FILE") ? { shrink: true } : { shrink: false }
                }
                helperText="Please upload an image of your company logo to be displayed in your campaign"
                {...register("LOGO_FILE")}
              />
              {
                campaignContent?.LOGO?.filename &&
                <Chip label={campaignContent?.LOGO?.filename}
                  onDelete={() => handleDelete(campaignContent.LOGO.id)}
                  sx={{ mb: 1, mr: 2 }} />
              }
              <FormHelperText sx={{ color: "#ff3e3e" }}>
                {errors?.LOGO_FILE ? errors?.LOGO_FILE?.message : null}
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

export default Step2;
