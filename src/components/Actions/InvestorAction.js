import { INVESTOR_CONTENT, INVESTOR_TYPE } from "../Types";

export const investorContent = (data) => {
  return {
    type: INVESTOR_CONTENT,
    payload: data,
  };
}

export const investorType = (type) => {
  return {
    type: INVESTOR_TYPE,
    payload: type,
  };
}


