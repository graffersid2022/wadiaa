import React, { useState, useEffect } from 'react'
import { Box, Typography, Grid, Button, Container, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FaqImage from '../assets/images/faq-img.png'
import Footer from './Footer'

function FAQ() {
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <React.Fragment>
      <Box sx={{ pt: 10, pb: 10, color: "#fff" }}>
        <Container maxWidth="lg">
          <Box className='home-faq'>
            <Grid container spacing={3} sx={{ position: "relative" }} >
              <Grid item xs={5}>
                <img src={FaqImage} alt="faq" className='home-img-faq' />
              </Grid>
              <Grid item xs={7}>
                <Box sx={{
                  fontWeight: "700",
                  fontSize: "36px",
                  color: "#fff"
                }}>Frequently Asked Questions?</Box>
                <Box sx={{ marginTop: "20px" }}>
                  <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} className="accrdion">
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon sx={{ color: "#fff", fontSize: "20px" }} />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography sx={{ fontSize: "20px" }} >Who we are?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                        Aliquam eget maximus est, id dignissim quam.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} className="accrdion">
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
                      aria-controls="panel2bh-content"
                      id="panel2bh-header"
                    >

                      <Typography sx={{ fontSize: "20px" }}>
                        What we do in this page?
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
                        varius pulvinar diam eros in elit. Pellentesque convallis laoreet
                        laoreet.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} className="accrdion">
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
                      aria-controls="panel3bh-content"
                      id="panel3bh-header"
                    >

                      <Typography sx={{ fontSize: "20px" }}>
                        What will the option for investments?
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
                        amet egestas eros, vitae egestas augue. Duis vel est augue.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')} className="accrdion">
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
                      aria-controls="panel4bh-content"
                      id="panel4bh-header"
                    >
                      <Typography sx={{ fontSize: "20px" }}>
                        What type investment available in the wadiaa?
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
                        amet egestas eros, vitae egestas augue. Duis vel est augue.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')} className="accrdion">
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
                      aria-controls="panel5bh-content"
                      id="panel4bh-header"
                    >
                      <Typography sx={{ fontSize: "20px" }}>
                        What type investment availablesds in the wadiaa?
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
                        amet egestas eros, vitae egestas augue. Duis vel est augue.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
      <Footer />
    </React.Fragment>
  )
}

export default FAQ