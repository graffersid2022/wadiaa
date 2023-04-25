import React from 'react'
import { Box, Button, Grid, Container, TextField, FormHelperText } from '@mui/material'
import PhoneInput from "react-phone-input-2";
import RightArrow from "../assets/images/right-arrow.png";

function ContactUs() {
   return (
      <Box sx={{ background: "#fff" }}>
         <Box sx={{ pt: 20, margin: '10px' }}>
            <Container maxWidth="lg">
               <Box sx={{
                  fontWeight: "700",
                  fontSize: "32px"
               }}> Contact us</Box>
               <Grid container spacing={5} sx={{ mt: 1 }}>
                  <Grid item xs={12} lg={4}>
                     <TextField
                        id="filled-basic"
                        label="Full Name"
                        variant="filled"
                        fullWidth
                        className="step-input"
                        helperText="Description about the label got mentioned over the left side"
                     />
                  </Grid>
                  <Grid item xs={12} lg={4}>
                     <TextField
                        id="filled-basic"
                        label="Email"
                        variant="filled"
                        fullWidth
                        className="step-input"
                        helperText="Description about the label got mentioned over the left side"
                     />
                  </Grid>
                  <Grid item xs={12} lg={4}>
                  </Grid>
                  <Grid item xs={12} lg={4} className="phone-input">
                     <PhoneInput
                        name="phoneNumber"
                        autoFocus={true}
                        id="filled-basic"
                        variant="filled"
                        placeholder='Phone number'
                        country={"om"}
                     // value={userPhone}
                     // onChange={
                     //    (phone) => {
                     //       setUserPhone(phone)
                     //    }
                     // }
                     />
                     <FormHelperText className="helper-text">
                        Helper Text
                     </FormHelperText>
                  </Grid>
                  <Grid item xs={12} lg={4}>
                     <TextField
                        id="filled-basic"
                        label="Subject"
                        variant="filled"
                        fullWidth
                        className="step-input"
                        helperText="Description about the label got mentioned over the left side"
                     />
                  </Grid>
                  <Grid item xs={12} lg={8}>
                     <TextField
                        id="filled-basic"
                        label="Your message"
                        variant="filled"
                        fullWidth
                        className="step-input"
                        helperText="Description about the label got mentioned over the left side"
                     />
                  </Grid>
               </Grid>
            </Container>
         </Box>
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
                     type="submit"
                     sx={{ mr: 1 }} className="next-btn">
                     Submit
                     <img src={RightArrow} alt="rightarrow" className='arrow-image' />
                  </Button>
               </Box>
            </Container>
         </Box>
      </Box>
   )
}

export default ContactUs