import { REQUEST_METHODS } from "../components/Configs/RequestMethods";
import { ROUTE_NAMES } from "../components/Configs/BackendUrls";
import { apiHandler } from "../Utils/ApiHandler";

/**
 *
 * @returns total invoice funded
 */
export const getUserProfile = async () => {
  try {
    const response = await apiHandler(
      REQUEST_METHODS.GET,
      ROUTE_NAMES.GET_PROFILE,
      {},
      {}
    );

    return response;
  } catch (error) {
    return error;
  }
};
  