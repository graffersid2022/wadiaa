import React from 'react'
import { Box, Button, Grid } from '@mui/material'
import { HiOutlinePlus } from 'react-icons/hi'
import UpdateImage from "../../../assets/images/Update.png"


function Update() {
  return (
    <Box>
      <Box sx={{
        fontWeight: 700,
        fontSize: "24px"
      }}>Update</Box>
      <Box sx={{ background: "#F5F5F5", borderRadius: "10px", mt: 3, padding: "20px" }}>
        <Box sx={{ background: "#fff", padding: "24px", borderRadius: "20px" }}>
          <Button variant="contained" sx={{
            background: "#57C0F1", p: 1, fontSize: "18px"
          }}><HiOutlinePlus sx={{ marginRight: "20px" }} /> Add New Update</Button>
        </Box>
        <Box sx={{
          fontWeight: "700",
          fontSize: "24px",
          mt: 3
        }}>
          Previous updates
        </Box>
        {/* <Box sx={{ background: "#fff" }}>
          <Grid container sapcing={1}>
            <Grid item xs={12} md={6} lg={7}>
              <Box>
                <img src={UpdateImage} alt="image" />
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={5}>
              <Box sx={{
                p: 5, color: "#193D71", fontWeight: 700,
                fontSize: { xs: '20px', sm: "24px" }
              }}>
                <Box>
                  Announcing our<br />
                  Series A funding from Wadiaa
                </Box>
                <Box sx={{ mt: 2 }}>
                  14.3 million USD in the year of
                  March 2022
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box> */}
      </Box>

    </Box >
  )
}

export default Update