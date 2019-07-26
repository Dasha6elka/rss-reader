export const API_URL = "http://localhost:3001";
export const HEADERS = {
  Accept: "application/json, text/plain, */*",
  "Content-Type": "application/json"
};
export const RETURN_RESPONSE_TEXT = (response) => {
  return response.text().then(function(text) {
    return text ? JSON.parse(text) : {};
  });
};
