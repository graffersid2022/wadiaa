import React, { useState, useEffect } from 'react'
import { Box, Container, Grid, Typography } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios'
import { useNavigate } from 'react-router';
import ROUTES from '../Configs/Routes';
import COMMON from '../Configs/Common';


function MyPortfolio() {

  const [data, setData] = useState([])
  const token = localStorage.getItem("token");
  const navigate = useNavigate()

  const getInvestmentList = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_UAT_URL}/investments`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...COMMON.SECURITY_HEADERS
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setData(response.data.content)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getInvestmentList()
  }, [])

  const handleView = (id) => {
    navigate(ROUTES.PAYDETAILS);
    localStorage.setItem("inID", id)
  }


  return (
    <Box sx={{ background: "#fff" }}>
      <Box sx={{ pt: 20, margin: { xs: '15px', sm: '0' } }} >
        <Container maxWidth="lg">
          <Box sx={{
            fontWeight: "700",
            fontSize: "24px"
          }}>My Dashboard</Box>
          <Box sx={{ background: "#193D71", mt: 5, borderRadius: "20px", padding: "35px" }}>
            <Grid container spacing={3} sx={{ textAlign: 'center' }}>
              <Grid item xs={12} md={6} lg={3} >
                <Box className="portfolio-head">Total Investments</Box>
                {/* <Box className="portfolio-info">32</Box> */}
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <Box className="portfolio-head">Total invested amount</Box>
                {/* <Box className="portfolio-info">USD 7,00,000</Box> */}
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <Box className="portfolio-head">Total profit received</Box>
                {/* <Box className="portfolio-info">USD 1,00,000</Box> */}
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <Box className="portfolio-head">No of active amounts</Box>
                {/* <Box className="portfolio-info">EDUTEC pvt.ltd.</Box> */}
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ p: 5, mt: 4, boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", borderRadius: "20px" }} >
            <Typography sx={{
              fontWeight: "700",
              fontSize: "24px"
            }}>Active investments</Typography>
            <TableContainer>
              <Table sx={{ minWidth: 650, mt: 3 }} aria-label="caption table">
                <TableHead>
                  <TableRow sx={{ background: "#F5F5F5", borderRadius: "20px" }}>
                    <TableCell sx={{ color: "#999B9C", fontWeight: "700" }}>Company Name</TableCell>
                    <TableCell sx={{ color: "#999B9C", fontWeight: "700" }} align="right">Invested amount</TableCell>
                    <TableCell sx={{ color: "#999B9C", fontWeight: "700" }} align="right">Tenor</TableCell>
                    <TableCell sx={{ color: "#999B9C", fontWeight: "700" }} align="right">Date</TableCell>
                    <TableCell sx={{ color: "#999B9C", fontWeight: "700" }} align="right">Investment status</TableCell>
                    <TableCell sx={{ color: "#999B9C", fontWeight: "700" }} align="right">Returns</TableCell>
                    <TableCell sx={{ color: "#999B9C", fontWeight: "700" }} align="right">Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.length === 0 ?
                    <TableRow> <TableCell colSpan={7} sx={{ textAlign: "center" }}>No records found</TableCell> </TableRow> :
                    data.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.campaign.business.name}
                        </TableCell>
                        <TableCell align="right" sx={{ textTransform: "capitalize" }}>USD {row.requestedAmount}</TableCell>
                        <TableCell align="right">{row.Tenor}</TableCell>
                        <TableCell align="right">{row.createDate}</TableCell>
                        <TableCell align="right">{row.status}</TableCell>
                        <TableCell align="right">{row.Returns}</TableCell>
                        <TableCell align="right" sx={{ cursor: "pointer" }} onClick={() => handleView(row.id)}>VIEW</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default MyPortfolio  