import { INCREMENT, DECREMENT, PRESCREENING_STATUS, USER_TYPE, DECODE, PRESCREENING_CONTENT } from "../Types";

export const incNumber = () => {
  return {
    type: INCREMENT
  }
}

export const decNumber = () => {
  return {
    type: DECREMENT
  }
}

export const getStatusOfPrescreening = (status) => {
  return {
    type: PRESCREENING_STATUS,
    payload: status
  }
}

export const getContentOfPrescreening = (content) => {
  return {
    type: PRESCREENING_CONTENT,
    payload: content
  }
}


export const getUserType = (userType) => {
  return {
    type: USER_TYPE,
    payload: userType
  }
}

export const notification = (notificationMessage) => {
  return {
    type: DECODE,
    payload: notificationMessage
  }
}

