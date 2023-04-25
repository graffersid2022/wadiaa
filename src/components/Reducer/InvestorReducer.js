import { INVESTOR_CONTENT, INVESTOR_TYPE } from "../Types";

const initialState = {
  data: [],
  type: ""
}

const InvestorReducer = (state = initialState, action) => {
  switch (action.type) {
    case INVESTOR_CONTENT: return {
      ...state,
      data: action.payload
    }
    case INVESTOR_TYPE: return {
      ...state,
      type: action.payload
    }
    default:
      return state;
  }
}

export default InvestorReducer