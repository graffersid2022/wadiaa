import { INCREMENT, DECREMENT, PRESCREENING_STATUS, USER_TYPE, DECODE, PRESCREENING_CONTENT } from "../Types";
const initialState = {
  num: 0,
  preScreeningStatus: "",
  type: "INVESTOR",
  notificationMessage: "",
  preScreeningContent: []
}
const commonState = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT: return {
      ...state,
      num: state.num + 1
    }
    case DECREMENT: return {
      ...state,
      num: state.num - 1
    }
    case PRESCREENING_STATUS: return {
      ...state,
      preScreeningStatus: action.payload
    }
    case PRESCREENING_CONTENT: return {
      ...state,
      preScreeningContent: action.payload
    }
    case USER_TYPE: return {
      ...state,
      type: action.payload
    }
    case DECODE: return {
      ...state,
      notificationMessage: action.payload
    }
    default: return state;
  }
}
export default commonState