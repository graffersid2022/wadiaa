import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  LinearProgress,
  Divider,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";

function Portfolio() {
  const token = localStorage.getItem("token");
  const [investmentList, setInvestmentList] = useState([]);

  const getData = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_UAT_URL}/${process.env.REACT_APP_TYPE_CAMPAIGN}/1/investments`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Content-Type-Options": "nosniff",
        "Strict-Transport-Security": "max-age=max-age=63072000;includeSubDomains; preload",
        "X-Frame-Options": "SAMEORIGIN",
        "X-XSS-Protection": 1,
        Authorization: `Bearer ${token}`
      },
    })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data)
          setInvestmentList(response.data.content)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Box sx={{ margin: '10px' }}>
      <Grid container spacing={2}>
        <Grid
          item
          lg={6}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              fontWeight: "700",
              fontSize: "24px",
            }}
          >
            My Portfolio
          </Box>
        </Grid>
        <Grid item lg={6}>
          <Box
            sx={{
              fontWeight: "700",
              fontSize: "24px",
              textAlign: "right",
              fontFamily: "Lato",
              fontStyle: "normal",
            }}
          >
            <Button
              variant="outlined"
              sx={{
                fontFamily: "Lato",
                fontStyle: "normal",
                fontWeight: "700",
                fontSize: "20px",
                color: "#57C0F1",
                border: "1px solid #57C0F1",
                borderRadius: "10px",
                padding: "10px 32px 10px 33px",
              }}
            >
              View Campaign Page
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Box
        sx={{
          background: "#193D71",
          mt: 5,
          borderRadius: "20px",
          padding: "30px",
        }}
      >
        <Grid container spacing={2}>
          <Grid
            item
            lg={6}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Box className="portfolio-info">
              Fund raising{" "}
              {/* <span className="portfolio-head">(Last Date 20/12/2022)</span> */}
            </Box>
          </Grid>
          <Grid item lg={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                fontWeight: "700",
                fontSize: "24px",
                textAlign: "right",
                fontFamily: "Lato",
                fontStyle: "normal",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  fontFamily: "Lato",
                  fontStyle: "normal",
                  fontWeight: "700",
                  fontSize: "20px",
                  color: "#ffffff",
                  background: "#57C0F1",
                  bordeRadius: "10px",
                  padding: "4px 30px 4px 30px",
                }}
              >
                <span
                  style={{
                    height: "9px",
                    width: "9px",
                    backgroundColor: "#fff",
                    borderRadius: "100px",
                    marginRight: "10px",
                  }}
                ></span>{" "}
                Live campaign
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            my: 4,
          }}
        >
          <Grid item lg={12}>
            <LinearProgress
              variant="determinate"
              // value={40}
              sx={{
                height: "10px",
                color: "#ffffff",
                backgroundColor: "#ffffff",
                opacity: 0.2,
                borderRadius: "10px",
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item lg={6}>
            <Box className="portfolio-head">Total Received Amount</Box>
            {/* <Box className="portfolio-info">32</Box> */}
          </Grid>
          <Grid
            item
            lg={6}
            sx={{
              textAlign: "right",
            }}
          >
            <Box className="portfolio-head">Target Amount</Box>
            {/* <Box className="portfolio-info">USD 7,00,000</Box> */}
          </Grid>
        </Grid>
        <Divider
          variant="middle"
          sx={{
            backgroundColor: "#ffffff",
            opacity: "0.2",
            marginLeft: 0,
            marginRight: 0,
            my: 3,
          }}
        />
        <Grid container spacing={1}>
          <Grid item lg={2}>
            <Box
              sx={{
                color: "rgba(255,255,255,0.5)",
                fontSize: "22px",
                fontWeight: 700,
              }}
            >
              No. of Investors
            </Box>
            {/* <Box sx={{ fontWeight: 700, fontSize: "26px", color: "#fff" }}>
              45 investors
            </Box> */}
          </Grid>
          <Grid item lg={3}>
            <Box
              sx={{
                color: "rgba(255,255,255,0.5)",
                fontSize: "22px",
                fontWeight: 700,
              }}
            >
              Total Commited Amount
            </Box>
            {/* <Box sx={{ fontWeight: 700, fontSize: "26px", color: "#fff" }}>
              550,000
            </Box>
            <Box sx={{ color: "rgba(255,255,255,0.5)", fontSize: "20px" }}>
              (55 shares)
            </Box> */}
          </Grid>
          <Grid item lg={3.5}>
            <Box
              sx={{
                color: "rgba(255,255,255,0.5)",
                fontSize: "22px",
                fontWeight: 700,
              }}
            >
              Campaign period
            </Box>
            {/* <Box sx={{ fontWeight: 700, fontSize: "26px", color: "#fff" }}>
              12 months
            </Box>
            <Box sx={{ color: "rgba(255,255,255,0.5)", fontSize: "20px" }}>
              (5 month and 12 days) completed
            </Box> */}
          </Grid>
          <Grid
            item
            lg={3.5}
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Button
              variant="outlined"
              sx={{
                fontFamily: "Lato",
                fontStyle: "normal",
                fontWeight: "700",
                fontSize: "16px",
                color: "#FFF",
                border: "1px solid #FFF",
                borderRadius: "10px",
                padding: "10px 32px 10px 33px",
              }}
            >
              Request Campaign Extension
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          p: 5,
          mt: 4,
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "20px",
        }}
      >
        <Typography
          sx={{
            fontWeight: "700",
            fontSize: "24px",
          }}
        >
          Recent Investers
        </Typography>
        <TableContainer>
          <Table sx={{ minWidth: 650, mt: 3 }} aria-label="caption table">
            <TableHead>
              <TableRow sx={{ background: "#F5F5F5", borderRadius: "20px" }}>
                <TableCell
                  sx={{ color: "#000000", fontSize: "20px", fontWeight: "700" }}
                >
                  Company/ User Name
                </TableCell>
                <TableCell
                  sx={{ color: "#000000", fontSize: "20px", fontWeight: "700" }}
                  align="right"
                >
                  Investment
                </TableCell>
                <TableCell
                  sx={{ color: "#000000", fontSize: "20px", fontWeight: "700" }}
                  align="right"
                >
                  Status
                </TableCell>
                <TableCell
                  sx={{ color: "#000000", fontSize: "20px", fontWeight: "700" }}
                  align="right"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                investmentList.length === 0 ?
                  <TableRow> <TableCell colSpan={7} sx={{ textAlign: "center" }}>No records found</TableCell> </TableRow> :
                  investmentList.map((item, index) => {
                    return (
                      <TableRow>
                        <TableCell component="th" scope="row">
                          {item.name}
                        </TableCell>
                        <TableCell align="right" sx={{ textTransform: "capitalize" }}>
                          USD {item.requestedAmount}
                        </TableCell>
                        <TableCell align="right">{item.status}</TableCell>
                        <TableCell align="right">Active</TableCell>
                      </TableRow>
                    )
                  })
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default Portfolio;
