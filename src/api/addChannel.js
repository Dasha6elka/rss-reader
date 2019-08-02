import { API_URL, HEADERS, returnResponseText } from "../constants";

async function addChannel(channel) {
  const response = await fetch(`${API_URL}/channel`, {
    method: "PUT",
    body: JSON.stringify(channel),
    headers: HEADERS
  });
  returnResponseText(response);
}

export default addChannel;
