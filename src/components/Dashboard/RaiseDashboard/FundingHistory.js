import React from 'react'
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  LinearProgress,
  Divider,
  Tab,
  Tabs,
} from "@mui/material";
function FundingHistory() {
  return (
    <>
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
              margin: '10px'
            }}
          >
            Funding History
          </Box>
        </Grid>
      </Grid>

      <Box
        sx={{
          background: "#ffffff",
          mt: 5,
          borderRadius: "20px",
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          padding: "30px",
          margin: "10px"
        }}
      >
        <Grid container sx={{ backgroundColor: "#f5f5f5", borderRadius: '10px', px: 3, py: 1.5 }}>
          <Grid item lg={6}>
            <Box sx={{ color: '#151515', fontSize: { xs: '26px', sm: '32px' }, fontWeight: 700 }}>EDUTEC</Box>
            {/* <Box sx={{ color: '#151515', fontSize: { xs: '18px', sm: '24px' }, fontWeight: 700, opacity: 0.3 }}>(Last Date 20/12/2023)</Box> */}
          </Grid>
          <Grid
            item
            lg={6}
            sx={{
              textAlign: "right",
            }}
          >
            <Box sx={{ color: '#151515', fontSize: { xs: '18px', sm: '24px' }, fontWeight: 700, opacity: 0.3 }}>Money Raised</Box>
            {/* <Box sx={{ color: '#151515', fontSize: { xs: '26px', sm: '32px' }, fontWeight: 700 }}>USD 7,00,000</Box> */}
          </Grid>
        </Grid>

        <Grid container sx={{ px: 1, py: 1.5, my: 3 }}>
          <Grid item lg={1.9}>
            <Box
              sx={{
                color: "#151515",
                opacity: 0.3,
                fontSize: "22px",
                fontWeight: 700,
              }}
            >
              No. of Investors
            </Box>
            {/* <Box sx={{ fontWeight: 700, fontSize: "22px", color: "#151515" }}>
              45 investors
            </Box> */}
          </Grid>
          <Grid item lg={2.2}>
            <Box
              sx={{
                color: "#151515",
                opacity: '0.3',
                fontSize: "22px",
                fontWeight: 700,
              }}
            >
              Total money raised
            </Box>
            {/* <Box sx={{ fontWeight: 700, fontSize: "22px", color: "#151515" }}>
              550,000
            </Box> */}
            {/* <Box sx={{ color: "#151515", fontSize: "20px", fontWeight: 700, }}>
              (55 shares)
            </Box> */}
          </Grid>
          <Grid item lg={3.5}>
            <Box
              sx={{
                color: "#151515",
                opacity: '0.3',
                fontSize: "22px",
                fontWeight: 700,
              }}
            >
              Campaign time period
            </Box>
            {/* <Box sx={{ fontWeight: 700, fontSize: "22px", color: "#151515" }}>
              12 Months
            </Box> */}
            {/* <Box sx={{ color: "#151515", fontSize: "20px", fontWeight: 700, }}>
              (5 months and 12 days completed)
            </Box> */}
          </Grid>
          <Grid item lg={2.2}>
            <Box
              sx={{
                color: "#151515",
                opacity: '0.3',
                fontSize: "22px",
                fontWeight: 700,
              }}
            >
              Target Amount
            </Box>
            {/* <Box sx={{ fontWeight: 700, fontSize: "22px", color: "#151515" }}>
              1,000000000 USD
            </Box> */}
          </Grid>

          <Grid item lg={2.2}>
            <Box
              sx={{
                color: "#151515",
                opacity: '0.3',
                fontSize: "22px",
                fontWeight: 700,
              }}
            >
              Type of campaign
            </Box>
            {/* <Box sx={{ fontWeight: 700, fontSize: "22px", color: "#151515" }}>
              Equity / Debt
            </Box> */}
          </Grid>
        </Grid>
        <Divider
          variant="middle"
          sx={{
            backgroundColor: "#235AAC",
            opacity: 0.2,
            marginLeft: 0,
            marginRight: 0,
            my: 3,
          }}
        />
     
      </Box>

    </>
  )
}

export default FundingHistory