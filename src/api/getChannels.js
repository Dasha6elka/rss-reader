import { API_URL } from "../constants";

async function getChannels(category_id) {
  const response = await fetch(`${API_URL}/channels/${category_id}`);
  return response.json();
}

export default getChannels;