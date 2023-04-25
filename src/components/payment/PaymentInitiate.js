import React, { useEffect } from "react"
import { TYPES } from "@babel/types"
import { Box, Button, IconButton, TextField, Typography, Container, Link } from "@mui/material"
import RightArrow from "../../assets/images/right-arrow.png"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Routes from "../Configs/Routes"
import COMMON from "../Configs/Common"
import { toast } from "react-toastify"
const PaymentInitiate = () => {
  const [paymentData, setPaymentData] = React.useState({});
  const [transactionData, setTransactionData] = React.useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token")

  const transactionDetails = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_UAT_URL}/transaction`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...COMMON.SECURITY_HEADERS
      },
    })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data)
          setTransactionData(response.data)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  } 

  const handleProcess = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_UAT_URL}/transaction/${transactionData[transactionData.length - 1].id}/payment-data`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...COMMON.SECURITY_HEADERS
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setPaymentData(response.data)
        }
      })
      .catch((error) => {
        toast.error(error.response.data.detail)
      })
  }

  useEffect(() => {
    transactionDetails()
  }, []);


  return (
    <Box sx={{ background: "#fff" }}>
      <Container maxWidth="lg">
        <Box sx={{ mt: 20 }}>
          <Box sx={{ fontSize: "24px", fontWeight: "700", margin: { xs: '10px', sm: '0' } }}>Payment for Investor Registration</Box>
          <Box sx={{ mt: 3, background: "#F5F5F5", borderRadius: "10px", padding: "30px", margin: { xs: '10px', sm: '0' } }}>
            <Typography sx={{ fontSize: "24px" }}>Payable Amount</Typography>
            <Typography sx={{ fontSize: "24px", fontWeight: "700", mt: 2 }}>USD {transactionData[transactionData.length - 1]?.amount}</Typography>
          </Box>
          <Box sx={{
            background: "rgba(255, 255, 255, 0.05)",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: '30px',
            mt: 5,
            padding: "30px"
          }}>
            <Typography sx={{
              fontWeight: "700",
              fontSize: "24px",
            }}>Payment Gateway</Typography>
            <Typography sx={{ color: "#193D71", mt: 2 }}>To proceed with payment please double click on the button below which will redirect you the respective page</Typography>
            <form action={paymentData?.url} method="POST">
              <div>
                <input type="text" id="accress_code" name="access_code" value={paymentData?.accessCode} hidden />
              </div>
              <div>
                <textarea id="enc_request" name="enc_request" rows="18" cols="33" hidden placeholder="enter enc req..." value={paymentData?.encRequest}></textarea>
              </div>
              {/* <div>
                <button id="payment">payment</button>
              </div> */}
              {paymentData?.url ?
                <button
                  style={{
                    background: "#57C0F1",
                    borderRadius: "8px",
                    marginTop: "24px",
                    padding: "13px 24px",
                    cursor: "pointer",
                    border: "none",
                    alignItems: "center",
                    display: "flex",
                    color: "#fff",
                    alignItems: "center",
                  }}
                >Confirm transaction
                  <img src={RightArrow} alt="image" className="arrow-image" />
                </button>
                :
                <Button variant="contained"
                  onClick={handleProcess}
                  sx={{
                    background: "#57C0F1",
                    borderRadius: "8px",
                    mt: 3,
                    padding: "13px 24px"
                  }}
                >Confirm transaction
                  <img src={RightArrow} alt="image" className="arrow-image" />
                </Button>
              }



            </form>

          </Box>
        </Box>
      </Container >

    </Box >
  )
}
export default PaymentInitiate  