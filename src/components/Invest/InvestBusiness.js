import React from "react";
import {
  Box,
  Typography,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import Business from "../../../src/assets/images/Business.png";

function InvestBusiness() {
  return (
    <Box sx={{ height: "100vh" }}>
      <Box sx={{ pt: 20, textAlign: "center" }}>
        <Typography
          sx={{ fontSize: "40px", fontWeight: "700", color: "#ffffff" }}
        >
          Investor Registration
        </Typography>
      </Box>
      <Box sx={{ mt: 15, display: "flex", justifyContent: "center" }} >
        <Box
          sx={{
            background: "rgb(37 71 120)",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
            padding: "50px",
            color: "#fff",
            borderRadius: "30px",
            position: "relative"
          }}
          className="investor-registration"
        >
          <Grid container spacing={10}>
            <Grid item lg={4}>
              <img src={Business} alt="image" style={{ width: "115px" }} />
              <Box sx={{ textAlign: "center", fontSize: '24px' }}>Buiness</Box>
            </Grid>
            <Grid item lg={8}>
              <Box sx={{ fontSize: "24px" }}>Select Business Investor type</Box>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="female"
                  sx={{
                    background: "red",
                    mt: 2,
                    background: "rgba(255, 255, 255, 0.05)",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: "10px"
                  }}
                  control={<Radio />}
                  label="Sophisticated Company investor"
                />
                <FormControlLabel
                  sx={{
                    background: "red",
                    mt: 2,
                    background: "rgba(255, 255, 255, 0.05)",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: "10px"
                  }}
                  value="male"
                  control={<Radio />}
                  label="Other Company Investor"
                />
              </RadioGroup>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default InvestBusiness;
