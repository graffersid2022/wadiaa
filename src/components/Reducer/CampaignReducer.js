import { CAMPAIGN_CONTENT, CAMPAIGN_ID, CAMPIAGN_SINGLEDATA } from "../Types";


const initialState = {
  campaignId: "",
  data: {},
  singleData: []
}



const CampaignReducer = (state = initialState, action) => {
  switch (action.type) {
    case CAMPAIGN_CONTENT: return {
      ...state,
      data: {
        ...state.data,
        ...action.payload
      }
    }
    case CAMPAIGN_ID: return {
      ...state,
      campaignId: action.payload
    }
    case CAMPIAGN_SINGLEDATA: return {
      ...state,
      singleData: action.payload
    }
    default: return state;
  }
}
export default CampaignReducer


