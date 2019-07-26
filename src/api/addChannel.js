import { API_URL, HEADERS, RETURN_RESPONSE_TEXT } from "../constants";

async function addChannel(channel) {
  const response = await fetch(`${API_URL}/channel`, {
    method: "PUT",
    body: JSON.stringify(channel),
    headers: HEADERS
  });
  RETURN_RESPONSE_TEXT(response);
}

export default addChannel;