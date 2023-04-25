import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Chip from '@mui/material/Chip';
import {
  Box,
  Grid,
  TextField,
  FormHelperText,
  Button,
  Container,
} from "@mui/material";
import LeftArrow from "../../../assets/images/left-arrow.png";
import RightArrow from "../../../assets/images/right-arrow.png";
import COMMON from "../../Configs/Common";

function Step4({ handleNext, handleBack, activeStep, user4, setUser4 }) {
  const [buyer, setBuyer] = React.useState(user4?.topCompanyBuyers || []);
  const [supplier, setSupplier] = React.useState(user4?.topCompanySuppliers || []);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm(
    {
      defaultValues: {
        providedProducts: user4?.providedProducts,
      }
    }
  )
  const token = localStorage.getItem("token");

  const onSubmit = (data) => {
    let passData = {
      topCompanyBuyers: buyer?.length === 0 ? [data.topCompanyBuyers] : buyer,
      providedProducts:  typeof data.providedProducts === "object"?data.providedProducts:[data.providedProducts],
      topCompanySuppliers: supplier?.length === 0 ? [data.topCompanySuppliers] : supplier
    }
    axios({
      method: "PATCH",
      url: `${process.env.REACT_APP_UAT_URL}/${process.env.REACT_APP_TYPE_BUSINESS}/commerce`,
      data: passData,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...COMMON.SECURITY_HEADERS
      },
    })
      .then((response) => {
        console.log(response)
        if (response.status === 200) {
          handleNext();
          getData();
        }
      })
      .catch((error) => {
        console.log(error)
      })
  };

  const handleBuyer = () => {
    let buyerArr = []
    buyerArr.push(watch("topCompanyBuyers"))
    setBuyer([...buyerArr, ...buyer])
    document.getElementById("buyer").value = ""
  }

  const handleSupplier = () => {
    let supplierArr = []
    supplierArr.push(watch("topCompanySuppliers"))
    setSupplier([...supplierArr, ...supplier])
    document.getElementById("supplier").value = ""
  }

  const handleDeleteBuyer = (index) => {
    setBuyer(buyer.filter((item, i) => i !== index))
  };
  const handleDeleteSupplier = (index) => {
    setSupplier(supplier.filter((item, i) => i !== index))
  };

  const getData = async () => {
    await axios({
      method: "GET",
      url: `${process.env.REACT_APP_UAT_URL}/${process.env.REACT_APP_TYPE_BUSINESS}/commerce`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...COMMON.SECURITY_HEADERS
      },
    })
      .then((response) => {
        console.log(response.data)
        if (response.status === 200) {
          setUser4({ ...user4, ...response.data })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }



  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container maxWidth="lg">
          <Box
            sx={{
              color: "#000000",
              fontWeight: "700",
              fontSize: "16px",
              width: "100%",
              mt: 4
            }}
          >
            Company's Top Buyers (Name,Country)
          </Box>
          <Grid container spacing={5} >
            <Grid item xs={12} lg={4} md={6}>
              <TextField
                id="buyer"
                label="Company's Top Buyers"
                variant="filled"
                fullWidth
                className="step-input"
                helperText="Provide the Name & Country of the Buyer"
                {
                ...register("topCompanyBuyers",
                  buyer.length === 0 && {
                    required: "Top Company Buyers is Required",
                  }
                )}
              />
              <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.topCompanyBuyers ? errors?.topCompanyBuyers?.message : null}</FormHelperText>
              {buyer.map((item, index) => {
                return (
                  <div key={index}>
                    <Chip label={item} onDelete={() => handleDeleteBuyer(index)} sx={{ mb: 1 }} />
                  </div>
                )
              })}
            </Grid>
            <Grid item xs={12} lg={4} sx={{ textAlign: "center" }} md={6}>
              <Button variant="contained"
                sx={{
                  background: "transparent",
                  color: "#151515",
                  padding: "13px 49px",
                  border: "2px solid #808080",
                  fontSize: "17px",
                  borderRadius: "10px",
                }}

                onClick={handleBuyer}
              >
                Add Buyer
              </Button>
            </Grid>

          </Grid>
          <Box
            sx={{
              color: "#000000",
              fontWeight: "700",
              fontSize: "16px",
              width: "100%",
              mt: 4
            }}
          >
            Company's Top Suppliers (Name,Country)
          </Box>
          <Grid container spacing={5}>
            <Grid item xs={12} lg={4} md={6}>
              <TextField
                id="supplier"
                label="Company's Top Suppliers"
                variant="filled"
                fullWidth
                className="step-input"
                helperText="Provide the Name & Country of the Supplier"
                {...register("topCompanySuppliers",
                  supplier.length === 0 && {
                    required: "Top Company Supplier is Required",
                  })}
              />
              <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.topCompanySuppliers ? errors?.topCompanySuppliers?.message : null}</FormHelperText>
              {supplier.map((item, index) => {
                return (
                  <div key={index}>
                    <Chip label={item} onDelete={() => handleDeleteSupplier(index)} sx={{ mb: 1 }} />
                  </div>
                )
              })}
            </Grid>
            <Grid item xs={12} lg={4} sx={{ textAlign: "center" }} md={6}>
              <Button variant="contained" sx={{
                background: "transparent",
                color: "#151515",
                padding: "13px 49px",
                border: "2px solid #808080",
                fontSize: "17px",
                borderRadius: "10px",
              }}
                onClick={handleSupplier}
              >
                Add Supplier
              </Button>
            </Grid>
            <Grid item xs={12} lg={4}>
            </Grid>
            <Grid item xs={12} lg={4}>
              <TextField
                id="filled-basic"
                label="Company's Key Products/Services"
                variant="filled"
                fullWidth
                className="step-input"
                helperText="Name of Key Products/Services provided by the Company"
                {...register("providedProducts", {
                  required: "Provided Products is Required",
                })}
              />
              <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.providedProducts ? errors?.providedProducts?.message : null}</FormHelperText>
            </Grid>
          </Grid>
        </Container>
        <Box sx={{ pt: 2 }} className="step-bottom">
          <Container maxWidth="lg" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box sx={{ color: "#235AAC", borderBottom: "1px solid", cursor: "pointer" }}>
              Back To Dashboard
            </Box>
            <Box>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
                className="back-btn"
              >
                <img src={LeftArrow} alt="leftArrow" className='arrow-image' />
                Previous
              </Button>
              <Button
                type="submit"
                sx={{ mr: 1 }} className="next-btn">
                Save & Proceed
                <img src={RightArrow} alt="rightarrow" className='arrow-image' />
              </Button>
            </Box>
          </Container>
        </Box>
      </form>
    </Box>
  );
}

export default Step4;
