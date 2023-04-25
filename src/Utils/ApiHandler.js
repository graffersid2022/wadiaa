import axios from "axios";
import { ENV_CONSTANTS } from "../components/Configs/Constants";
import { RESPONSE_CODES } from "../components/Configs/ResponseCodes";
import { HELPERS } from "../Helpers";
import COMMON from "../components/Configs/Common";

const token = localStorage.getItem("token");
export const apiHandler = async (
  method,
  url,
  headers = {},
  requestBody = {}
) => {
  try {
    const Headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...COMMON.SECURITY_HEADERS,
      Authorization: `Bearer ${token}`,
    };
    const baseURL = `${ENV_CONSTANTS.API_SERVER_URL}${url}`;
    const data = {
      method,
      url: baseURL,
      headers: {
        ...Headers,
        ...headers,
      },
      data: JSON.stringify(requestBody),
    };
    return axios(data)
      .then((response) => response.data)
      .then((response) => {
        switch (response.code) {
          case RESPONSE_CODES.SUCCESS:
            return HELPERS.responseHandler(response);
          case RESPONSE_CODES.UNAUTHORIZED:
          case RESPONSE_CODES.BAD_REQUEST:
            return false;
          default:
            return HELPERS.responseHandler(response);
        }
      })
      .catch((error) => error);
  } catch (error) {
    return error;
  }
};
