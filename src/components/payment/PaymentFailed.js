import {
  Box,
  Typography,
  Button
} from "@mui/material";
import Fail from "../../assets/images/failurs.png";

const PaymentFailure = () => {
  return (
    <Box sx={{ height: "100vh" }} className="request-main">
      <Box sx={{ height: "100%" }} className='request-sec'>
        <Box sx={{
          height: "100%", display: { xs: 'block', md: "flex" }, alignItems: "center", justifyContent: "center"
        }}>
          <Box className='paysuccess' >
            <img src={Fail} alt="image" className="RequsetIllutration" />
          </Box>
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography sx={{ color: "#fff", fontWeight: "900", fontSize: { xs: '35px', sm: "40px" } }}>
              Payment failed
            </Typography>
            <Typography sx={{ color: "#fff", mt: 3, marginRight: { xs: '0', md: "25%" } }}>
              Your payment did not go through on our Bank's Payment Gateway for some reason. Please try again later or contact our Wadiaa investor helpdesk
            </Typography>
            <Button variant='contained' sx={{ background: "#57C0F1", padding: "13px 24px", mt: 2, borderRadius: "8px" }} >Contact support</Button>
            <Button variant="outlined" sx={{ border: "1px solid #57C0F1", padding: "13px 24px", mt: 2, borderRadius: "8px", ml: 2, color: "#57C0F1" }}>Back to home page</Button>
          </Box>
        </Box>
      </Box>
    </Box >
  )
}
export default PaymentFailure