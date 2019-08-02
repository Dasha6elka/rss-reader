import { API_URL } from "../constants";

async function getLogoUrl(url) {
  const response = await fetch(`${API_URL}/fetch_icon/${url}`);

  return response.json();
}

export default getLogoUrl;