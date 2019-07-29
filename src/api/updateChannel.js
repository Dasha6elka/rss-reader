import { API_URL, HEADERS, returnResponseText } from "../constants";

async function updateChannel(channel, channelId) {
  const response = await fetch(`${API_URL}/channel/${channelId}`, {
    method: "POST",
    body: JSON.stringify(channel),
    headers: HEADERS
  });
  returnResponseText(response);
}

export default updateChannel;