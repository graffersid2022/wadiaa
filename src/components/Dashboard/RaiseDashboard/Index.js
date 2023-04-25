import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Divider,
  Tab,
  Tabs,
} from "@mui/material";
import Portfolio from "./Portfolio";
import FundingHistory from "./FundingHistory";
import Update from "./Update";
import Discussion from "./Discussion";
import Payment from "./RaisePayment";

function RaiseDashboard() {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ background: "#fff" }}>
      <Box sx={{ pt: 20, margin: '5px' }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              bgcolor: "#f5f5f5",
              borderRadius: "20px",
              px: 2,
              py: 2,
              my: 3,
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              className="main-tab"
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
            // aria-label="scrollable force tabs example"
            >
              <Tab
                label="My Portfolio"
                sx={{ borderRadius: "10px", color: "#151515", p: 1, flex: 1, fontWeight: 400, fontSize: { xs: '14px', sm: '20px' } }}
                className="tab-button"
              />
              <Divider
                orientation="vertical"
                style={{ height: 30, alignSelf: "center", backgroundColor: 'rgba(0,0,0,0.2)' }}
              />
              <Tab
                label="Funding History"
                sx={{ borderRadius: "10px", color: "#151515", p: 1, flex: 1, fontWeight: 400, fontSize: { xs: '14px', sm: '20px' } }}
                className="tab-button"
              />
              <Divider
                orientation="vertical"
                style={{ height: 30, alignSelf: "center", backgroundColor: 'rgba(0,0,0,0.2)' }}
              />
              <Tab
                label="Update"
                sx={{ borderRadius: "10px", color: "#151515", p: 1, flex: 1, fontWeight: 400, fontSize: { xs: '14px', sm: '20px' } }}
                className="tab-button"
              />
              <Divider
                orientation="vertical"
                style={{ height: 30, alignSelf: "center", backgroundColor: 'rgba(0,0,0,0.2)' }}
              />
              <Tab
                label="Questions Raised"
                sx={{ borderRadius: "10px", color: "#151515", p: 1, flex: 1, fontWeight: 400, fontSize: { xs: '14px', sm: '20px' } }}
                className="tab-button"
              />
              <Divider
                orientation="vertical"
                style={{ height: 30, alignSelf: "center", backgroundColor: 'rgba(0,0,0,0.2)' }}
              />
              <Tab
                label="Payment"
                sx={{ borderRadius: "10px", color: "#151515", p: 1, flex: 1, fontWeight: 400, fontSize: { xs: '14px', sm: '20px' } }}
                className="tab-button"
              />
            </Tabs>
          </Box>
          {
            value === 0 ? <Portfolio /> : value === 2 ? <FundingHistory /> : value === 4 ? <Update /> : value === 6 ? <Discussion /> : value === 8 ? <Payment /> : null
          }
        </Container>
      </Box>
    </Box>
  );
}

export default RaiseDashboard;
