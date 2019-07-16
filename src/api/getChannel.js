import { API_URL } from "../constants";

async function getChannel(url) {
  const response = await fetch(`${API_URL}/fetch/${url}`);
  return response.json();
}

export default getChannel;
