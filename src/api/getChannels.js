import { API_URL } from "./constants";

async function getChannels(categoryId) {
  const response = await fetch(`${API_URL}/channels/${categoryId}`);
  return response.json();
}

export default getChannels;
