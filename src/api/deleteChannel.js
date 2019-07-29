import { API_URL, returnResponseText } from "../constants";

async function deleteChannel(channelId) {
  const response = await fetch(`${API_URL}/channel/${channelId}`, {
    method: "DELETE",
  });
  returnResponseText(response);
}

export default deleteChannel;