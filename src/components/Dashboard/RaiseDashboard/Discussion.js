import React from 'react'
import { Box, Button } from "@mui/material";

function Discussion() {
  return (
    <Box>
      <Box sx={{
        fontWeight: 700,
        fontSize: "24px"
      }}>
        Questions Raised
      </Box>
      <Box sx={{
        background: "#FFFFFF",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "30px",
        padding: "16px 24px"
      }}>
        <Box sx={{ minHeight: "350px" }}>

        </Box>
        {/* <Box sx={{ border: "1px solid #CCCCCC", padding: "9px 26px", borderRadius: "20px", display: { xs: 'block', sm: "flex" }, justifyContent: "space-between" }}>
          <Box>Write something....</Box>
          <Button variant="contained" sx={{ background: "#57C0F1" }}>Send Message</Button>
        </Box> */}
      </Box>
    </Box>
  )
}

export default Discussion