import { API_URL } from "../constants";

async function addChannel(channel) {
  const response = await fetch(`${API_URL}/channel`, {
    method: "PUT",
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

export default addChannel;