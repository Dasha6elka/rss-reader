import { API_URL } from "../constants";

async function deleteChannel(channel_id) {
  const response = await fetch(`${API_URL}/channel/${channel_id}`, {
    method: "DELETE",
  });
  return response.text().then(function(text) {
    return text ? JSON.parse(text) : {}
  })
}

export default deleteChannel;