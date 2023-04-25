import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Button,
  Typography,
  Grid,
  Avatar,
} from "@mui/material";
import ReviewImg from "../../assets/images/Review.png";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import moment from 'moment';
import COMMON from "../Configs/Common";
import { useSelector, useDispatch } from "react-redux";




function Review() {
  const campaignID = useSelector(state => state.CampaignReducer.campaignId)
  const token = localStorage.getItem("token");
  const params = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState([])

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: "#57C0F1",
        fontSize: "15px",
        textTransform: "uppercase",
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[0][1]}`,
    };
  }

  const getReview = () => {
    if (params.campaignId) {
      axios(
        {
          method: "GET",
          url: `${process.env.REACT_APP_UAT_URL}/fundraising/campaigns/${params.campaignId}/reviews`,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            ...COMMON.SECURITY_HEADERS
          },
        })
        .then(
          (response) => {
            if (response.status === 200) {
              setReview(response.data.content);
            }
          }
        )
        .catch((error) => {
          console.log(error);
        }
        );
    } else {
      axios(
        {
          method: "GET",
          url: `${process.env.REACT_APP_UAT_URL}/campaign/${campaignID}/reviews`,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            ...COMMON.SECURITY_HEADERS
          },
        })
        .then(
          (response) => {
            if (response.status === 200) {
              setReview(response.data.content);
            }
          }
        )
        .catch((error) => {
          console.log(error);
        }
        );
    }
  }

  useEffect(() => {
    getReview();
  }, []);

  return (
    <Box>
      <Container maxWidth="lg">
        {review.length === 0 ?
          <Box sx={{ display: { xs: 'block', md: "flex" }, margin: { xs: '50px 0', md: "114px 0" }, justifyContent: 'center' }} >
            <Box item xs={12} md={6} sx={{ width: { xs: '100%', md: '50%' } }}  >
              <img src={ReviewImg} alt="image" />
            </Box>
            <Box item xs={12} md={6} sx={{ alignSelf: "center", textAlign: 'center', marginTop: { xs: '20px', md: '0' } }}>
              <Typography sx={{
                fontWeight: "700",
                fontSize: { xs: '25px', sm: "40px" }
              }}>Be the First one to your reviews</Typography>
              <Typography sx={{ fontSize: "13px" }}>We will update very soon... </Typography>
              <Button variant="contained" sx={{ padding: { xs: '14px 44px', md: "16px 125px" }, background: "#57C0F1", fontSize: "24px", mt: 3, borderRadius: "10px" }} onClick={() => { navigate(`/investment/${params.campaignId}`) }}>
                Invest Now
              </Button>
            </Box>
          </Box > :
          <Box sx={{ mt: 5 }}>
            {review.map((item, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: "20px",
                    padding: "30px",
                    marginTop: "40px"

                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: "700", color: "#151515" }}
                  >
                    “{item.review}”
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 3,
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar {...stringAvatar(`${item.author}`)} />
                      <Box sx={{ m: 1 }}>
                        <Typography sx={{
                          fontWeight: "700",
                          lineHeight: 1,
                          fontSize: "18px",
                        }}>
                          {item.author}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        color: "#AAAAAA",
                        fontWeight: "700",
                        fontSize: "12px",
                      }}
                    >
                      {moment(item.createdAt).format("hh:mm a DD MMMM YYYY")}
                    </Box>
                  </Box>
                </Box>
              )
            })}
          </Box>

        }
      </Container>
    </Box>
  );
}

export default Review;
