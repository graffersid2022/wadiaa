import React, { useEffect } from 'react'
import { Box, Button } from '@mui/material'
import HalfRight from "../assets/images/half-right.png"
import { useNavigate, useLocation } from "react-router"
import { useSelector } from "react-redux"
import ROUTES from './Configs/Routes'

function StapHeader() {

  const navigate = useNavigate()
  const location = useLocation()

  const myState = useSelector((state) => state.commonState.preScreeningStatus);
  const button = [
    {
      id: 1,
      name: "Pre screening",
      navigate: ROUTES.RAISEMONEY.PRE_SCREENING,
    }, {
      id: 2,
      name: "Company  Details",
      navigate: ROUTES.RAISEMONEY.COMPANY_DETAILS
    }, {
      id: 3,
      name: "Campaign creation",
      navigate: ROUTES.RAISEMONEY.CAMPAIGN
    }]

  return (
    <Box sx={{ display: "flex" }}>
      {myState === "RECEIVED" || myState === "REVIEWED" || myState === "" ? button.splice(0, 1).map((item, index) => {
        return (
          <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
            <Button key={item.id} className={location?.pathname === `${item.navigate}` ? "step-header-active" : "step-header"} onClick={() => { navigate(`${item.navigate}`) }}  >{item.name}</Button>
            {index < 2 ? <img src={HalfRight} className="stepHeader-img" alt="half-right" /> : null}
          </Box>
        )
      }) : button.map((item, index) => {
        return (
          <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
            <Button key={item.id}
              className={index === 0 ? "step-header-success" : location?.pathname === `${item.navigate}` ? "step-header-active" : "step-header"}
              onClick={() => { navigate(`${item.navigate}`) }}  >{item.name}</Button>
            {index < 2 ? <img src={HalfRight} className="stepHeader-img" alt="half-right" /> : null}
          </Box>
        )
      }
      )}
    </Box >
  )
}

export default StapHeader