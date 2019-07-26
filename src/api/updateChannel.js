import { API_URL, HEADERS, RETURN_RESPONSE_TEXT } from "../constants";

async function updateChannel(channel, channelId) {
  const response = await fetch(`${API_URL}/channel/${channelId}`, {
    method: "POST",
    body: JSON.stringify(channel),
    headers: HEADERS
  });
  RETURN_RESPONSE_TEXT(response);
}

export default updateChannel;