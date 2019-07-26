import { API_URL } from "../constants";

async function deleteChannel(channelId) {
  const response = await fetch(`${API_URL}/channel/${channelId}`, {
    method: "DELETE",
  });
  return response.text().then(function(text) {
    return text ? JSON.parse(text) : {}
  })
}

export default deleteChannel;