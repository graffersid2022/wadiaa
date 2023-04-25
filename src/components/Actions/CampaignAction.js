import { CAMPAIGN_CONTENT, CAMPAIGN_ID, CAMPIAGN_SINGLEDATA } from "../Types";

export const getCampaignAllData = (campaignData) => {
  return {
    type: CAMPAIGN_CONTENT,
    payload: campaignData
  }
}

export const getCampaignId = (campaignId) => {
  return {
    type: CAMPAIGN_ID,
    payload: campaignId
  }
}

export const getSingleData = (payload) => {
  return {
    type: CAMPIAGN_SINGLEDATA,
    payload: payload
  }
}


