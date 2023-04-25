import React from "react";
import { Box, Container, Button } from "@mui/material";
import { useNavigate } from "react-router";
import Routes from "../../Configs/Routes"

function Request() {
  const navigate = useNavigate();
  return (
    <Box sx={{ background: "#fff" }}>
      <Box sx={{ mt: 20 }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              fontWeight: "700",
              fontSize: { xs: "26px", sm: "32px" },
              marginTop: { xs: "-40px", sm: '0' }
            }}
          >

          </Box>
          <Box>
            <Box
              sx={{
                mt: { xs: 2, sm: 5 },
                fontWeight: "700",
                fontSize: { xs: '18px', sm: "24px" },
              }}
            >
              Final step: Terms and condition
            </Box>
          </Box>
          <Box sx={{ lineHeight: "29px", fontSize: { xs: '14px', sm: "20px" } }} >
            <Box sx={{ mt: { xs: 2, sm: 3 } }}>
              Potential investors are strongly advised to consult their legal, tax
              and financial advisors before investing. The securities offered on
              this site are not offered in jurisdictions where public solicitation
              for offerings is not permitted; it is solely your responsibility to
              comply with the laws and regulations of your country of residence.
            </Box>
            <Box sx={{ mt: { xs: 2, sm: 3 } }}>
              WADIAA does not sell personal information. For all customer inquiries, please write to contact@wadiaa.com.
            </Box>
            <Box sx={{ mt: { xs: 2, sm: 3 } }}>
              I acknowledge that checking this box, represents an e-signature as outlined in WADIAA’s Terms of Use and confirm that I have read and understood the implications of the above statements and educational materials referred to. I acknowledge that the account and information provided will be saved for processing requests and further transactions on my account.
            </Box>
            <Box sx={{ mt: 2 }}>
              By clicking on ”Complete Investment”  you will agree to our terms & condition and privacy policy
            </Box>
          </Box>
        </Container>
        <Box className="step-bottom">
          <Container maxWidth="lg">
            <Box>
              <Button
                type="submit"
                sx={{
                  mr: 1, padding: { xs: '10px 20px', sm: "13px 91px" }, background: "#57C0F1", color: "#fff", fontSize: "17px", '&:hover': {
                    background: "#57C0F1",
                  },
                }}
                onClick={() => { navigate(Routes.INVEST_HOME) }}
              >
                Complete investment
              </Button>
            </Box>
          </Container>
        </Box>
      </Box>
    </Box>
  )
}

export default Request;
