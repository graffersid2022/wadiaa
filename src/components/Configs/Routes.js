const HOME = '/';
const SIGN_UP = '/signup';
const LOGIN = '/signin';
const FORGORPASSWORD='/forgotpassword'
const RESETPASSWORD = '/resetpassword'
const UPDATEPASSWORD='/updatepassword'
const INVEST_HOME = '/invest-home';
const RAISE_HOME = "/raisemoney/home"
const OTP = '/otp';
const MOBILE_VERIFY = '/mobileverify' 

const PREVIEW = {
  PITCH: '/preview/pitch',
  REVIEW: '/preview/review',
  UPDATE: '/preview/update',
  DISCUSSION: '/preview/discussion',
  FAQ: '/preview/faq',
  TERMS: '/preview/terms',
  CAMPAIGN_PITCH: "/preview/pitch/:campaignId",
  CAMPAIGN_REVIEW: "/preview/review/:campaignId",
  CAMPAIGN_UPDATE: '/preview/update/:campaignId',
  CAMPAIGN_DISCUSSION: '/preview/discussion/:campaignId',
  CAMPAIGN_FAQ: '/preview/faq/:campaignId',
  CAMPAIGN_TERMS: '/preview/terms/:campaignId',

};

const RAISEMONEY = {
  COMPANY_DETAILS: '/raisemoney/company-details',
  CAMPAIGN: '/raisemoney/campaign',
  PRE_SCREENING: '/raisemoney/pre-screening',
  REQUEST: '/raisemoney/pre-screening/request',
}
const INVEST = {
  INVEST: '/invest',
  INDIVIDUAL: '/invest/individual',
  BUSINESS: '/invest/legal',
  TERMS_CONDITION: '/invest/terms-condition',
}

const INVESTMENT = {
  INDIVIDUAl_ACCREDITATION: '/investment/accreditation/individual',
  LEGAL_ACCREDITATION: '/investment/accreditation/legal',
  INVESTMENT: '/investment/:id',
}
const DASHBOARD = '/dashboard';
const PROFILE_PAGE = '/profile';
const RAISEDASHBOARD = "/raisedashboard"
const NOTIFICATION = '/notification';
const CONTACT = '/contact';
const LEARN = '/learn';
const INVESTMENT_PAGE = '/investment';

const PAYDETAILS = '/paydetails'
const PAYHISTORY = '/payhistory'
const PAYINITIATE = '/payinitiate'
const PAYSUCCESS = '/paysuccess'
const PAYFAILURE = "/payfailure"
const PAYMENUAL = '/paymanual'

const EMAIL_VARIFICATION_SUCCESS = '/email-verification';
const EMAIL_VARIFICATION_UNSUCCESS = '/email-verification-unsuccess';
const PASSWORD_RECOVERY_SUCCESS = '/password-recovery';
const PASSWORD_RECOVERY_UNSUCCESS = '/password-recovery-unsuccess';
const LINK_EXPIRED = '/link-expired'


const ROUTES = {
  HOME,
  SIGN_UP,
  LOGIN,
  FORGORPASSWORD,
  RESETPASSWORD,
  UPDATEPASSWORD,
  INVEST_HOME,
  OTP,
  PREVIEW,
  RAISEMONEY,
  INVEST,
  INVESTMENT,
  DASHBOARD,
  NOTIFICATION,
  CONTACT,
  LEARN,
  PAYDETAILS,
  PAYHISTORY,
  PAYINITIATE,
  PAYSUCCESS,
  PAYMENUAL,
  PAYFAILURE,
  RAISEDASHBOARD,
  PROFILE_PAGE,
  RAISE_HOME,
  INVESTMENT_PAGE,
  EMAIL_VARIFICATION_SUCCESS,
  EMAIL_VARIFICATION_UNSUCCESS,
  PASSWORD_RECOVERY_SUCCESS,
  PASSWORD_RECOVERY_UNSUCCESS,
  LINK_EXPIRED,
  MOBILE_VERIFY
};

export default ROUTES;
