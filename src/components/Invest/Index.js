import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Box,
  Grid,
  Typography,
  Container
} from "@mui/material";
import Individual from "../../../src/assets/images/Individual.png";
import Business from "../../../src/assets/images/Business.png";
import ROUTES from "../Configs/Routes";
import axios from "axios";
import COMMON from "../Configs/Common";
import { useDispatch } from "react-redux";
import { investorType } from "../Actions/InvestorAction";


function Index() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  useEffect(() => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_UAT_URL}/${process.env.REACT_APP_TYPE_INVESTOR}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...COMMON.SECURITY_HEADERS
      },
    })
      .then((response) => {
        if (response.status === 200) {
          dispatch(investorType(response.data?.type))
          if (response.data?.type) {
            navigate(ROUTES.INVEST_HOME);
          } else {
            navigate(ROUTES.INVEST.BUSINESS);
          }
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, []);

  return (
    <Box >
      <Box sx={{ textAlign: "center", pt: 20 }}>
        <Typography
          sx={{ fontSize: { xs: '30px', sm: "40px" }, fontWeight: "700", color: "#ffffff", marginBottom: { xs: '13%', md: '10%' } }}
        >
          Investor Registration
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }} className='invest'>
          <Box
            sx={{
              padding: "50px",
              background: "rgb(37 71 120)",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
              borderRadius: "30px",
              m: 5,
              width: { xs: '300px', md: "325px" },
              position: "relative",
            }}
            className="individual"
            onClick={() => {
              navigate(ROUTES.INVEST.INDIVIDUAL);
            }}
          >
            <img src={Individual} alt="image" className="invest-img" />
            <Typography sx={{ fontSize: "32px", color: "#ffffff", mt: 5 }}>
              Individuals
            </Typography>
          </Box>
          <Box
            sx={{
              padding: "50px",
              background: "rgb(37 71 120)",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
              borderRadius: "30px",
              m: 5,
              width: { xs: '300px', md: "325px" },
              position: "relative",
            }}
            className="business"
            onClick={() => {
              navigate(ROUTES.INVEST.BUSINESS);
            }}
          >
            <img src={Business} alt="image" className="invest-img" />
            <Typography sx={{ fontSize: "32px", color: "#ffffff", mt: 5 }}>
              Business
            </Typography>
          </Box>
        </Box>
      </Box>
      <Container maxWidth="lg" >
        <Box sx={{ mt: 15, mx: 3, color: "#fff" }}>
          <Typography >
            www.wadiaa.com is a website owned and operated by AL WADIAA FOR COMMERCIAL OPERATIONS
            (“WADIAA”), a company formed under the commercial laws of the Sultanate of Oman and offering a
            crowdfunding marketplace, regulated by the Capital Markets Authority (CMA) of Oman.
          </Typography>
          <Typography sx={{ mt: 1 }}>
            By accessing this site and any pages on this site, you agree to be bound by our Terms of Use and Privacy
            Policy, as may be amended from time to time without notice or liability.
          </Typography>
          <Typography sx={{ mt: 1, fontWeight: "700" }}>
            Investments on WADIAA are speculative, illiquid and involve a high degree of risk, including the
            possible loss of your entire investment. Potential Investors must therefore ensure that you clearly
            understand the high risk involved and ensure that you are in a financial position to bear the loss of the
            entire amount of your investment. You must also ensure that you are within the regulatory limits for
            this type of crowdfunding as per your country of residence.
          </Typography>
          <Typography sx={{ mt: 1 }}>
            All investment opportunities made available on WADIAA’ s online marketplace is offered directly from
            the Fundraiser/ Issuer to the Investor. All securities listed on this site are being offered by the Issuer and
            all information included on this site is the responsibility of the Issuer of such securities.
          </Typography>
          <Typography sx={{ mt: 1 }}>
            Any securities offered on this website have not been recommended or approved by any government
            body or regulatory authority. WADIAA is neither an investment advisor, nor a registered broker-dealer.
            WADIAA and its affiliates do not provide any investment advice or recommendation and do not provide
            any legal or tax advice with respect to any securities.
          </Typography>
          <Typography sx={{ mt: 1, fontWeight: "700" }}>
            Investors, while making their investment decision, must rely on their own thorough examination of
            the Fundraiser/ Issuer, the risks and merits involved, as well as the terms of the offering.
          </Typography>
          <Typography sx={{ mt: 1 }}>
            The Fundraiser/ Issuer is fully responsible for the accuracy and completeness of information provided to
            WADIAA as well as the information displayed on the Campaign pages. Although WADIAA does conduct
            its own due diligence to ensure the most genuine and best investment opportunities are offered to our
            investors. This is by no means comprehensive.  Hence, WADIAA does not verify the adequacy, accuracy,
            or completeness of any information. Neither WADIAA nor any of its agents, employees, officers, or
            directors makes any warranty, express or implied, of any kind whatsoever related to the adequacy,
            accuracy, or completeness of any information on this site or the use of information on this site.
          </Typography>
          <Typography sx={{ mt: 1, fontWeight: "700" }}>
            Fundraisers
          </Typography>
          <Typography sx={{ mt: 1 }}>
            Potential fundraisers are strongly advised to consult their legal, tax and financial advisors before
            fundraising on WADIAA. The securities that you wish to offer must comply with the legal and regulatory
            requirements in the jurisdiction of registration of the company. You must also ensure that the jurisdiction
            does not have any restriction to acceptance of funds from the Sultanate of Oman; it is solely your
            responsibility to comply with the laws and regulations of your company’s jurisdiction as well as that of
            the Sultanate of Oman.
          </Typography>
          <Typography sx={{ mt: 1, fontWeight: "700" }}>
            Investors
          </Typography>
          <Typography sx={{ mt: 1 }}>
            Potential investors are strongly advised to consult their legal, tax and financial advisors before investing.
            The securities offered on this site are not offered in jurisdictions where public solicitation for offerings is
            not permitted; it is solely your responsibility to comply with the laws and regulations of your country of
            residence.
          </Typography>
          <Typography sx={{ mt: 1 }}>
            WADIAA does not sell personal information. For all customer inquiries, please write to
            contact@wadiaa.com.
            I acknowledge that checking this box, represents an e-signature as outlined in WADIAA’s Terms of Use
            and confirm that I have read and understood the implications of the above statements and educational
            materials referred to. I acknowledge that the account and information provided will be saved for
            processing requests and further transactions on my account.
          </Typography>

        </Box>
      </Container>
    </Box>
  );
}

export default Index;
