import React, { useState } from "react";
import { Box, IconButton, Typography, Container } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import COMMON from "../Configs/Common";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import moment from "moment";
import { ImArrowLeft2 } from "react-icons/im";
import ROUTES from "../Configs/Routes";

const PaymentHistory = () => {
  const [transectionHistory, setTransectionHistory] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  function createData(
    CompanyName,
    Investedamount,
    Status,
    Tenor,
    Date,
    Investmentstatus,
    Returns,
    Details
  ) {
    return {
      CompanyName,
      Investedamount,
      Status,
      Tenor,
      Date,
      Investmentstatus,
      Returns,
      Details,
    };
  }

  const getTransactionHistory = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_UAT_URL}/transaction`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...COMMON.SECURITY_HEADERS,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setTransectionHistory(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getTransactionHistory();
  }, []);

  return (
    <Box
      sx={{
        background: "#ffffff",
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mt: 20, ml: "15px", display: "flex", alignItems: "center" }}>
          <ImArrowLeft2 className="arrow-size" onClick={() => { navigate(ROUTES.DASHBOARD) }} /> <Typography sx={{ ml: 2, fontWeight: "700", fontSize: "24px" }}>
            Payment Transaction History
          </Typography>
        </Box>
        <Box
          sx={{
            mt: 5,
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "20px",
            padding: "25px",
          }}
        >
          <TableContainer>
            <Table sx={{ minWidth: 650, mt: 3 }} aria-label="caption table">
              <TableHead>
                <TableRow sx={{ background: "#F5F5F5", borderRadius: "20px" }}>
                  <TableCell
                    sx={{ color: "#999B9C", fontWeight: "700", fontSize: "18px" }}
                    align="center"
                  >
                    Invested amount
                  </TableCell>
                  <TableCell
                    sx={{ color: "#999B9C", fontWeight: "700", fontSize: "18px" }}
                    align="center"
                  >
                    Start Date
                  </TableCell>
                  <TableCell
                    sx={{ color: "#999B9C", fontWeight: "700", fontSize: "18px" }}
                    align="center"
                  >
                    Effective Date
                  </TableCell>
                  <TableCell
                    sx={{ color: "#999B9C", fontWeight: "700", fontSize: "18px" }}
                    align="center"
                  >
                    Transaction Type
                  </TableCell>
                  <TableCell
                    sx={{ color: "#999B9C", fontWeight: "700", fontSize: "18px" }}
                    align="center"
                  >
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  transectionHistory.length === 0 ?
                    <TableRow> <TableCell colSpan={7} sx={{ textAlign: "center" }}>No Records Found</TableCell> </TableRow> :
                    transectionHistory.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell align="center" >USD {row.amount}</TableCell>
                        <TableCell align="center" >{moment(row.startDate).format('DD-MM-YYYY')}</TableCell>
                        <TableCell align="center" >{moment(row.effectiveDate).format('DD-MM-YYYY')}</TableCell>
                        <TableCell align="center" >{row.transactionType}</TableCell>
                        <TableCell align="center" >{row.transactionStatus}</TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container >
    </Box >
  );
};
export default PaymentHistory;
