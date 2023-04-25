const responseHandler = (response) => ({
  status: response.status || response.code || "",
  data: response.data || {},
  message: response.message || "",
  error: response.error || "",
});

export const HELPERS = {
  responseHandler,
};
