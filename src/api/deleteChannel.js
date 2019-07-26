import { API_URL, RETURN_RESPONSE_TEXT } from "../constants";

async function deleteChannel(channelId) {
  const response = await fetch(`${API_URL}/channel/${channelId}`, {
    method: "DELETE",
  });
  RETURN_RESPONSE_TEXT(response);
}

export default deleteChannel;