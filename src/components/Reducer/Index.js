import commonState from './upDown'
import CampaignReducer from './CampaignReducer'
import InvestorReducer from './InvestorReducer'

import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  commonState: commonState,
  CampaignReducer: CampaignReducer,
  InvestorReducer: InvestorReducer,
})

export default rootReducer