import {
  Box,
  Typography,
  Button,
} from "@mui/material";
import Success from "../../assets/images/success.png";

const PaymentSuccess = () => {
  return (
    <Box sx={{ height: "100vh" }} className="request-main">
      <Box sx={{ height: "100%" }} className='request-sec'>
        <Box sx={{
          height: "100%", display: { xs: 'block', md: "flex" }, alignItems: "center", justifyContent: "center"
        }}>
          <Box className='paysuccess'>
            <img src={Success} alt="image" className="RequsetIllutration" />
          </Box>
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography sx={{ color: "#fff", fontWeight: "900", fontSize: { xs: '31px', sm: "40px" } }}>
              Successful payment
            </Typography>
            <Typography sx={{ color: "#fff", mt: 3, marginRight: { xs: '0', md: "25%" } }}>
              Your payment was successful. Please check out our other investment opportunities.
            </Typography>
            <Button variant='contained' sx={{ background: "#57C0F1", padding: "13px 24px", mt: 2, borderRadius: "8px" }} >Explore Campaigns </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
export default PaymentSuccess