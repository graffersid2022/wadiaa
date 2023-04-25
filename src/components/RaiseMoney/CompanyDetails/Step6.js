import React from "react";
import {
  Box, Grid, TextField, Button, Container, FormHelperText, FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import LeftArrow from "../../../assets/images/left-arrow.png";
import RightArrow from "../../../assets/images/right-arrow.png";
import COMMON from "../../Configs/Common";
import { useForm } from "react-hook-form";
import axios from "axios";
import Plus from "../../../assets/images/plus.png";
import Chip from '@mui/material/Chip';
import { toast } from "react-toastify";

function Step6({ handleNext, handleBack, activeStep, user6owner, user6member }) {
  const [ownerList, setOwnerList] = React.useState(user6owner || []);
  const [memberList, setMemberList] = React.useState(user6member || [])

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const token = localStorage.getItem("token");

  const onSubmit = (data) => {
    let passData = {
      owners: ownerList
    }

    axios({
      method: "PATCH",
      url: `${process.env.REACT_APP_UAT_URL}/${process.env.REACT_APP_TYPE_BUSINESS}/owners`,
      data: passData,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...COMMON.SECURITY_HEADERS
      },
    })
      .then((response) => {
        if (response.status === 200) {
        }
      })
      .catch((error) => {
        console.log(error)
        if (error.response.status === 400) {
          toast.error("Owner not added,Plese try again")
        }
      })

    let passData1 = {
      members:
        memberList
    }

    axios({
      method: "PATCH",
      url: `${process.env.REACT_APP_UAT_URL}/${process.env.REACT_APP_TYPE_BUSINESS}/members`,
      data: passData1,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Content-Type-Options": "nosniff",
        "Strict-Transport-Security": "max-age=max-age=63072000;includeSubDomains; preload",
        "X-Frame-Options": "SAMEORIGIN",
        "X-XSS-Protection": 1,
        Authorization: `Bearer ${token}`
      },
    })
      .then((response) => {
        console.log(response)
        if (response.status === 200) {
          handleNext();
        }
      })
      .catch((error) => {
        console.log(error)
        if (error.response.status === 400) {
          toast.error("Member not added,Plese try again")
        }
      })
  };

  const handleCLickOwner = () => {
    let obj = {
      percent: watch("percent"),
      address: watch("ownerAddress"),
      birthDate: watch("birthDate"),
      closeAssociate: watch("closeAssociate"),
      position: watch("position"),
      department: watch("department"),
      idNumber: watch("idNumber"),
      idType: watch("idType"),
      name: watch("ownerName"),
      nationality: watch("nationality"),
      residence: watch("residence"),
    }
    let key;
    for (let i = 0; i < Object.keys(obj).length; i++) {
      key = Object.keys(obj)[i];
      document.getElementById(key).value = "";
    }
    setOwnerList([...ownerList,
    {
      percent: obj.percent,
      person: {
        address: obj.address,
        birthDate: obj.birthDate,
        closeAssociate: obj.closeAssociate,
        government: {
          department: obj.department,
          position: obj.position
        },
        idNumber: obj.idNumber,
        idType: obj.idType,
        name: obj.name,
        nationality: obj.nationality,
        residence: obj.residence
      }
    }
    ])
  }

  const handleDeleteOwner = (index) => {
    setOwnerList(ownerList.filter((item, i) => i !== index))
  }

  const handleChangeOwner = (index) => {
    let obj = ownerList.find((item, i) => i === index)
    let newObj = {
      percent: obj.percent,
      address: obj.person.address,
      birthDate: obj.person.birthDate,
      closeAssociate: obj.person.closeAssociate,
      position: obj.person.government.position,
      department: obj.person.government.department,
      idNumber: obj.person.idNumber,
      idType: obj.person.idType,
      name: obj.person.name,
      nationality: obj.person.nationality,
      residence: obj.person.residence,
    }
    let key;
    for (let i = 0; i < Object.keys(newObj).length; i++) {
      key = Object.keys(newObj)[i];
      document.getElementById(key).value = newObj[key];
    }
    handleDeleteOwner(index)
  }

  const handleCLickMember = () => {
    let objMember = {
      memberAddress: watch("memberAddress"),
      memberBirthDate: watch("memberBirthDate"),
      memberPosition: watch("memberPosition"),
      memberIdNumber: watch("memberIdNumber"),
      memberIdtype: watch("memberIdtype"),
      memberName: watch("MemberName"),
      memberNationality: watch("memberNationality"),
      memberResidence: watch("memberResidence"),
    }
    let key;
    for (let i = 0; i < Object.keys(objMember).length; i++) {
      key = Object.keys(objMember)[i];
      document.getElementById(key).value = "";
    }
    setMemberList([...memberList,
    {
      person: {
        address: objMember.memberAddress,
        birthDate: objMember.memberBirthDate,
        closeAssociate: "string",
        government: {
          department: "string",
          position: "string"
        },
        idNumber: objMember.memberIdNumber,
        idType: objMember.memberIdtype,
        name: objMember.memberName,
        nationality: objMember.memberNationality,
        residence: objMember.memberResidence
      },
      position: objMember.memberPosition
    }
    ])
  }

  const handleDeleteMember = (index) => {
    setMemberList(memberList.filter((item, i) => i !== index))
  }

  const handleChangeMember = (index) => {
    let obj = memberList.find((item, i) => i === index)
    console.log(obj)
    let newObj = {
      memberAddress: obj.person.address,
      memberBirthDate: obj.person.birthDate,
      memberPosition: obj.position,
      memberIdNumber: obj.person.idNumber,
      memberIdtype: obj.person.idType,
      memberName: obj.person.name,
      memberNationality: obj.person.nationality,
      memberResidence: obj.person.residence,
    }
    let key;
    for (let i = 0; i < Object.keys(newObj).length; i++) {
      key = Object.keys(newObj)[i];
      document.getElementById(key).value = newObj[key];
    }
    handleDeleteMember(index)
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
            Ownership, Directors & Authorized Signatory
          </Box>
          <Grid container spacing={5}>
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                id="name"
                label="Full Name*"
                variant="filled"
                fullWidth
                className="step-input"
                helperText="Full Name of the Owner"
                {...register("ownerName", {
                  required: "Name is Required",
                })}
              // InputLabelProps={owner ? { shrink: true } : null}

              />
              <FormHelperText FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.ownerName ? errors?.ownerName?.message : null}</FormHelperText>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                id="address"
                label="Resenditial Address & P.O Box*"
                variant="filled"
                fullWidth
                className="step-input"
                helperText="Address with P.O Box of the Owner"
                {...register("ownerAddress", {
                  required: "Address is required"
                })}
              />
              <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.ownerAddress ? errors?.ownerAddress?.message : null}</FormHelperText>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                id="birthDate"
                label="Date of Birth*"
                variant="filled"
                fullWidth
                className="step-input"
                helperText="Date of Birth"
                type="date"
                inputProps={{
                  max: `${COMMON.TODAYDATE}`,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("birthDate", {
                  required: "Date Of Birth is Required",
                })}
              />
              <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.birthDate ? errors?.birthDate?.message : null}</FormHelperText>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <FormControl variant="filled" fullWidth>
                <InputLabel
                  id="demo-simple-select-filled-label"
                  className="dropdown-label"
                >
                  Country of Residence*
                </InputLabel>
                <Select
                  // defaultValue={user6owner?.content[0].person.residence}
                  labelId="demo-simple-select-filled-label"
                  id="residence"
                  className="raise-drop-down"
                  {...register("residence", {
                    required: "Country of Residence is Required",
                  })}
                >
                  {Object.keys(COMMON.COUNTRIES).map((key) => (
                    <MenuItem value={key} className="color-menu">{COMMON.COUNTRIES[key]}</MenuItem>
                  ))}
                </Select>
                <FormHelperText className="helper-text">
                  Country of Residence
                </FormHelperText>
                <FormHelperText sx={{ color: "#ff3e3e", m: 0 }}>
                  {errors?.residence
                    ? errors?.residence?.message
                    : null}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              {/* <TextField
                id="idType"
                label="Civil/Resident Type"
                variant="filled"
                fullWidth
                className="step-input"
                helperText="Enter the bank account number"
                {...register("idType", {
                  required: "Type is Required",
                })}
              />
              <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.idType ? errors?.idType?.message : null}</FormHelperText> */}
              <FormControl variant="filled" fullWidth>
                <InputLabel
                  className="dropdown-label"
                >
                 Residency Identification Type*
                </InputLabel>
                <Select
                  // defaultValue={user6member.content[0].person.residence}
                  labelId="demo-simple-select-filled-label"
                  id="idType"
                  className="raise-drop-down"
                  {...register("idType", {
                    required: "Choose type"
                  })}
                >
                  <MenuItem value="CARD_ID" className="color-menu">CARD</MenuItem>
                  <MenuItem value="PASSPORT" className="color-menu">PASSPORT</MenuItem>
                </Select>
                <FormHelperText className="helper-text">
                  Type of Residency
                </FormHelperText>
                <FormHelperText sx={{ color: "#ff3e3e", m: 0 }}>
                  {errors?.idType
                    ? errors?.idType?.message
                    : null}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                id="idNumber"
                label="Residency Card (or) Passport number*"
                variant="filled"
                fullWidth
                className="step-input"
                helperText="Number on the Resident Card (or) Passport number"
                {...register("idNumber", {
                  required: "Residency Card (or) Passport number",
                })}
              />
              <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.idNumber ? errors?.idNumber?.message : null}</FormHelperText>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                id="closeAssociate"
                label="Close Associate"
                variant="filled"
                fullWidth
                className="step-input"
                helperText="Alternate Contact Person's name (In case the Given person is not reachable)"
                {...register("closeAssociate")}
              />
              <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.closeAssociate ? errors?.closeAssociate?.message : null}</FormHelperText>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                id="department"
                label="Department"
                variant="filled"
                fullWidth
                className="step-input"
                helperText="Department they work in for the Company                "
                {...register("department")}
              />
              <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.department ? errors?.department?.message : null}</FormHelperText>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                id="position"
                label="Position*"
                variant="filled"
                fullWidth
                className="step-input"
                helperText="Position Title held in the Company"
                {...register("position", {
                  required: "Position is Required",
                })}
              />
              <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.position ? errors?.position?.message : null}</FormHelperText>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <TextField
                id="nationality"
                label="Nationality*"
                variant="filled"
                fullWidth
                className="step-input"
                helperText="Nationality of the Owner (Applicant)"
                {...register("nationality", {
                  required: "Nationality is Required",
                })}
              />
              <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.nationality ? errors?.nationality?.message : null}</FormHelperText>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                id="percent"
                label="Shareholding/Ownership Percentage(%)*"
                variant="filled"
                fullWidth
                className="step-input"
                helperText="Percentage of Ownership (%)"
                {...register("percent", {
                  required: "Percentage is Required",
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "Please enter a valid percentage",
                  },
                })}
              />
              <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.percent ? errors?.percent?.message : null}</FormHelperText>
            </Grid>
            <Grid item xs={12} lg={12}>
              {ownerList.map((item, index) => {
                return (
                  <Chip label={item.person.name} key={index} onDelete={() => handleDeleteOwner(index)} onClick={() => { handleChangeOwner(index) }} sx={{ mb: 1, mr: 2 }} />
                )
              })}
            </Grid>
          </Grid>
          <Button onClick={handleCLickOwner} sx={{ border: "1px solid #000", color: "#000", padding: "13px 24px", borderRadius: "10px" }}><img src={Plus} className="arrow-image" alt="image" />Confirm and add member of the company</Button>
          <Box
            sx={{
              color: "#000000",
              fontWeight: "700",
              fontSize: "16px",
              width: "100%",
              mt: 4
            }}
          >
            Directors, Authorized Signatory (s), Other Influential Parties
          </Box>
          <Grid container spacing={5}>
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                id="memberName"
                label="Full Name*"
                variant="filled"
                fullWidth
                className="step-input"
                helperText="Name of the Director (or) Authorized Signatory"
                {...register("MemberName", {
                  required: "Name is Required",
                })}
              />
              <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.MemberName ? errors?.MemberName?.message : null}</FormHelperText>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                id="memberPosition"
                label="Position*"
                variant="filled"
                fullWidth
                className="step-input"
                helperText="Position Title held in the Company"
                {...register("memberPosition", {
                  required: "Position is Required",
                })}
              />
              <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.memberPosition ? errors?.memberPosition?.message : null}</FormHelperText>
            </Grid>
            <Grid item xs={12} lg={12}>
              <TextField
                id="memberAddress"
                label="Address and P.O Box*"
                variant="filled"
                fullWidth
                className="step-input"
                helperText="Completed Residential Address & P.O Box"
                {...register("memberAddress", {
                  required: "Address is Required",
                })}
              />
              <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.memberAddress ? errors?.memberAddress?.message : null}</FormHelperText>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <FormControl variant="filled" fullWidth>
                <InputLabel
                  id="memberResidence"
                  className="dropdown-label"
                >
                  Country of Residence*
                </InputLabel>
                <Select
                  // defaultValue={user6member.content[0].person.residence}
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  className="raise-drop-down"
                  {...register("memberResidence",
                    {
                      required: "Country is Required"
                    }
                  )}
                >
                  {Object.keys(COMMON.COUNTRIES).map((key) => (
                    <MenuItem value={key} className="color-menu">{COMMON.COUNTRIES[key]}</MenuItem>
                  ))}
                </Select>
                <FormHelperText className="helper-text">
                  Current Country of Residence
                </FormHelperText>
                <FormHelperText sx={{ color: "#ff3e3e", m: 0 }}>
                  {errors?.memberResidence
                    ? errors?.memberResidence?.message
                    : null}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <FormControl variant="filled" fullWidth>
                <InputLabel
                  id="memberIdtype"
                  className="dropdown-label"
                >
                  Residency Identification Type*
                </InputLabel>
                <Select
                  // defaultValue={user6member.content[0].person.residence}
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  className="raise-drop-down"
                  {...register("memberIdtype", {
                    required: "Choose type"
                  })}
                >
                  <MenuItem value="CARD_ID" className="color-menu">CARD</MenuItem>
                  <MenuItem value="PASSPORT" className="color-menu">PASSPORT</MenuItem>
                </Select>
                <FormHelperText className="helper-text">
                  Type of Residency
                </FormHelperText>
                <FormHelperText sx={{ color: "#ff3e3e", m: 0 }}>
                  {errors?.memberIdtype
                    ? errors?.memberIdtype?.message
                    : null}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <TextField
                id="memberIdNumber"
                label="Residency Card (or) Passport number*"
                variant="filled"
                fullWidth
                className="step-input"
                helperText="Number on the Resident Card (or) Passport number"
                {...register("memberIdNumber", {
                  required: "Civil/Resident Card Number is Required",
                })}
              />
              <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.memberIdNumber ? errors?.memberIdNumber?.message : null}</FormHelperText>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                id="memberBirthDate"
                label="DOB*"
                variant="filled"
                fullWidth
                className="step-input"
                helperText="Enter the bank account number"
                type="date"
                inputProps={{
                  max: `${COMMON.TODAYDATE}`,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("memberBirthDate", {
                  required: "Date Of Birth is Required",
                })}
              />
              <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.memberBirthDate ? errors?.memberBirthDate?.message : null}</FormHelperText>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                id="memberNationality"
                label="Nationality*"
                variant="filled"
                fullWidth
                className="step-input"
                helperText="Nationality of the Director (or) Authorized Signatory"
                {...register("memberNationality", {
                  required: "Nationality is Required",
                })}
              />
              <FormHelperText sx={{ color: "#ff3e3e" }}>{errors?.memberNationality ? errors?.memberNationality?.message : null}</FormHelperText>
            </Grid>
            <Grid item xs={12} lg={12}>
              {memberList.map((item, index) => {
                return (
                  <Chip label={item.person.name} key={index} onDelete={() => handleDeleteMember(index)} onClick={() => { handleChangeMember(index) }} sx={{ mb: 1, mr: 2 }} />
                )
              })}
            </Grid>
          </Grid>
          <Button onClick={handleCLickMember} sx={{ border: "1px solid #000", color: "#000", padding: "13px 24px", borderRadius: "10px" }}><img src={Plus} className="arrow-image" alt="image" />Confirm and add member of the company </Button>

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
    </Box >
  );
}

export default Step6;
