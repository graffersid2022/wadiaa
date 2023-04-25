import React, { useEffect, useState } from 'react'
import { Box, Button, Container, Divider, Grid } from '@mui/material'
import axios from 'axios'
import COMMON from '../Configs/Common'
function Notification() {
  const token = localStorage.getItem('token')
  const [notification, setNotification] = useState([])

  const getNotification = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_UAT_URL}/notification`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...COMMON.SECURITY_HEADERS
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setNotification(response.data)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getNotification()
  }, [])

  return (
    <Box sx={{ background: "#fff" }}>
      <Box sx={{ pt: 15 }}>
        <Container maxWidth="lg">
        <Grid container spacing={1}>
          <Grid item xs={12} md={6} lg={8}>
          <Box sx={{
                fontWeight: "700",
                fontSize: "24px",
                margin: "10px"
              }}>
                My Notifications
              </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
               
              {/* <Button sx={{
                fontWeight: "700",
                fontSize: "20px",
                margin: "10px 0px 0px 53%"
              }}>Mark All Read</Button> */}
          </Grid>
        </Grid>
          {/* <Box sx={{
            fontWeight: "700",
            fontSize: "24px",
            margin: "10px"
          }}>
            My Notifications
          </Box> */}
          <Box sx={{
            background: "#F5F5F5",
            borderRadius: "20px",
            padding: "30px",
            margin: '10px',
            mt: 5
          }}>
            {/* <Box>
              <Box sx={{
                fontWeight: "700",
                fontSize: "20px"
              }}>Please complete your investment</Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>Your investment in edutec is pending please complete the process now by  clicking here!</Box>
                <Box>07:09 PM, Yesterday</Box>
              </Box>
            </Box>
            <Divider sx={{ mt: 3, mb: 3 }} /> */}
            {notification.length < 0 ? <Box sx={{ textAlign: "center" }}>No Found</Box> :
              notification.map((item, index) => {
                return (
                  <Box>
                    <Box>
                      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Box>{item.message}</Box>
                      </Box>
                    </Box>
                    <Divider sx={{ mt: 3, mb: 3 }} />
                  </Box>
                )
              })
            }
            {/* <Box>
              <Box sx={{
                fontWeight: "700",
                fontSize: "20px"
              }}>Please complete your investment</Box>
              <Box sx={{ display: { xs: 'block', md: "flex" }, justifyContent: "space-between" }}>
                <Box sx={{ marginTop: { xs: '10px', sm: '0' } }}>Your investment in edutec is pending please complete the process now by  clicking here!</Box>
                <Box sx={{ marginTop: { xs: '10px', sm: '0' } }}>07:09 PM, Yesterday</Box>
              </Box>
            </Box> */}
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default Notification