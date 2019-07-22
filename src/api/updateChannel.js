import { API_URL } from "../constants";

async function updateChannel(channel, channel_id) {
  const response = await fetch(`${API_URL}/channel/${channel_id}`, {
    method: "POST",
    body: JSON.stringify(channel),
    headers: {
      'Accept': 'application/json, text/plain, */*',
      "Content-Type": "application/json"
    }
  });
  return response.text().then(function(text) {
    return text ? JSON.parse(text) : {}
  })
}

export default updateChannel;