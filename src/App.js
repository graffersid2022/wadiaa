import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import "./assets/css/style.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-phone-input-2/lib/material.css';
import ROUTES from "./components/Configs/Routes";
import Layout from './Layout';
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Otp from "./components/auth/Otp";
import RaiseHome from "./components/Homes/RaiseHome";
import Home from "./components/Homes/Landing"
import InvestHome from "./components/Homes/InvestHome";
import RaiseMoney from "./components/RaiseMoney/CompanyDetails";
import Campaign from "./components/RaiseMoney/Campaign";
import Preview from "./components/Preview/Index";
import PreScreening from "./components/RaiseMoney/PreScreening";
import Request from './components/RaiseMoney/PreScreening/PreScreeningRequest';
import Picth from './components/Preview/Pitch'
import Review from './components/Preview/Review'
import Update from './components/Preview/Update'
import Discussion from './components/Preview/Discussion'
import Invest from './components/Invest/Index'
import CreateIndivudual from "./components/Invest/Individual/Index"
import CreateLegal from "./components/Invest/Legal/Index"
import Investment from "./components/Invest/Investment/Index";
import Mydashboard from './components/Dashboard/MyDashboard';
import RaiseDashboard from './components/Dashboard/RaiseDashboard/Index';
import Notification from './components/Dashboard/Notification';
import AccreditationIndividual from './components/Invest/Accreditation/Individual';
import AccreditationLegal from './components/Invest/Accreditation/Legal';
import TermsCondition from './components/Invest/Individual/Request';
import Contact from './components/ContactUs';
import Learn from './components/Learn';
import PaymentDetails from './components/payment/PaymentDetails'
import PaymentSuccess from './components/payment/PaymentSuccess'
import PaymentFailed from './components/payment/PaymentFailed'
import PaymentInitiate from './components/payment/PaymentInitiate'
import PaymentHistory from './components/payment/PaymentHistory'
import Faq from './components/Preview/Faq';
import Teams from './components/Preview/Teams';
import ProfileInvestor from './components/Dashboard/Profile';
import axios from "axios";
import { RxStomp } from '@stomp/rx-stomp';
import jwt_decode from "jwt-decode";
import { useDispatch } from 'react-redux';
import { notification } from "./components/Actions/Index"
import COMMON from './components/Configs/Common';
import PaymentMenual from './components/payment/PaymentMenual';
import EmailVerification from './components/VerificationPage/index';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import UpdatePassword from './components/auth/UpdatePassword';
import ModalBox from './components/Common/ModalBox';
import MobileVerify from './components/auth/MobileVerify';

function App() {

  const dispatch = useDispatch();
  const interval = () => {
    const refToken = localStorage?.getItem("refToken");
    const token = localStorage?.getItem("token");

    let passData = {
      refreshToken: refToken
    }

    if (token) {
      axios({
        method: "POST",
        url: `${process.env.REACT_APP_UAT_URL}/auth/refresh`,
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
            localStorage.setItem('token', response.data.idToken)
            localStorage.setItem('refToken', response.data.refreshToken)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  useEffect(() => {
    setInterval(
      interval
      , 1000 * 60 * 15)
  }, [])


  useEffect(() => {
    if (localStorage?.getItem("token")) {
      const decode = jwt_decode(localStorage?.getItem("token"))
      const stompClient = new RxStomp();
      stompClient.configure({
        brokerURL: 'wss://funding-api-uat.hesfintech.dev/ws',
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });
      stompClient.activate();
      stompClient.watch(`/exchange/notifications/${decode.sub}.notification`).subscribe((message) => {
        dispatch(notification(message.body))
      }
      )
    }
  }, [])

  return (
    <div className="main-div">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route exact path={ROUTES.HOME} element={<Home />} />
            <Route exact path='/modal' element={<ModalBox />} />
            <Route exact path={ROUTES.MOBILE_VERIFY} element={<MobileVerify/>}/>
            <Route exact path={ROUTES.INVEST_HOME} element={<InvestHome />} />
            <Route exact path={ROUTES.RAISE_HOME} element={<RaiseHome />} />
            <Route exact path={ROUTES.LOGIN} element={<SignIn />} />
            <Route exact path={ROUTES.FORGORPASSWORD} element={<ForgotPassword />} />
            <Route exact path={ROUTES.RESETPASSWORD} element={<ResetPassword />} />
            <Route exact path={ROUTES.UPDATEPASSWORD} element={<UpdatePassword />} />
            <Route exact path={ROUTES.SIGN_UP} element={<SignUp />} />
            <Route exact path={ROUTES.OTP} element={<Otp />} />
            <Route exact path={ROUTES.RAISEMONEY.COMPANY_DETAILS} element={<RaiseMoney />} />
            <Route exact path={ROUTES.RAISEMONEY.CAMPAIGN} element={<Campaign />} />
            <Route exact path={ROUTES.RAISEMONEY.PRE_SCREENING} element={<PreScreening />} />
            <Route exact path={ROUTES.RAISEMONEY.REQUEST} element={<Request />} />
            <Route exact path={ROUTES.INVEST.INVEST} element={<Invest />} />
            <Route exact path={ROUTES.INVEST.INDIVIDUAL} element={<CreateIndivudual />} />
            <Route exact path={ROUTES.INVEST.BUSINESS} element={<CreateLegal />} />
            {/* <Route exact path={ROUTES.INVEST.CREATE_INDIVIDUAL} element={<CreateIndivudual />} />
            <Route exact path={ROUTES.INVEST.CREATE_LEGAL} element={<CreateLegal />} /> */}
            <Route exact path={ROUTES.INVEST.TERMS_CONDITION} element={<TermsCondition />} />
            <Route exact path={ROUTES.INVESTMENT.INVESTMENT} element={<Investment />} />
            <Route exact path={ROUTES.INVESTMENT.INDIVIDUAl_ACCREDITATION} element={<AccreditationIndividual />} />
            <Route exact path={ROUTES.INVESTMENT.LEGAL_ACCREDITATION} element={<AccreditationLegal />} />
            <Route exact path={ROUTES.DASHBOARD} element={<Mydashboard />} />
            <Route exact path={ROUTES.RAISEDASHBOARD} element={<RaiseDashboard />} />
            <Route exact path={ROUTES.NOTIFICATION} element={<Notification />} />
            <Route exact path={ROUTES.CONTACT} element={<Contact />} />
            <Route exact path={ROUTES.LEARN} element={<Learn />} />
            <Route exact path={ROUTES.PAYDETAILS} element={<PaymentDetails />} />
            <Route exact path={ROUTES.PAYHISTORY} element={<PaymentHistory />} />
            <Route exact path={ROUTES.PAYSUCCESS} element={<PaymentSuccess />} />
            <Route exact path={ROUTES.PAYFAILURE} element={<PaymentFailed />} />
            <Route exact path={ROUTES.PAYINITIATE} element={<PaymentInitiate />} />
            <Route exact path={ROUTES.PAYMENUAL} element={<PaymentMenual />} />
            <Route exact path={ROUTES.PROFILE_PAGE} element={<ProfileInvestor />} />
          </Route>
        </Routes>
        <Routes >
          <Route element={<Preview />}>
            <Route exact path={ROUTES.PREVIEW.PITCH} element={<Picth />} />
            <Route exact path={ROUTES.PREVIEW.CAMPAIGN_PITCH} element={<Picth />} />
            <Route exact path={ROUTES.PREVIEW.REVIEW} element={<Review />} />
            <Route exact path={ROUTES.PREVIEW.CAMPAIGN_REVIEW} element={<Review />} />
            <Route exact path={ROUTES.PREVIEW.UPDATE} element={<Update />} />
            <Route exact path={ROUTES.PREVIEW.CAMPAIGN_UPDATE} element={<Update />} />
            <Route exact path={ROUTES.PREVIEW.DISCUSSION} element={<Discussion />} />
            <Route exact path={ROUTES.PREVIEW.CAMPAIGN_DISCUSSION} element={<Discussion />} />
            <Route exact path={ROUTES.PREVIEW.FAQ} element={<Faq />} />
            <Route exact path={ROUTES.PREVIEW.CAMPAIGN_FAQ} element={<Faq />} />
            <Route exact path={ROUTES.PREVIEW.TERMS} element={<Teams />} />
            <Route exact path={ROUTES.PREVIEW.CAMPAIGN_TERMS} element={<Teams />} />
          </Route>
          <Route exact path={ROUTES.EMAIL_VARIFICATION_SUCCESS} element={<EmailVerification />} />
          <Route exact path={ROUTES.EMAIL_VARIFICATION_UNSUCCESS} element={<EmailVerification />} />
          <Route exact path={ROUTES.PASSWORD_RECOVERY_SUCCESS} element={<EmailVerification />} />
          <Route exact path={ROUTES.PASSWORD_RECOVERY_UNSUCCESS} element={<EmailVerification />} />
          <Route exact path={ROUTES.LINK_EXPIRED} element={<EmailVerification />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-center"
      />
    </div >
  );
}

export default App;
