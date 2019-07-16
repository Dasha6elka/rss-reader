import { API_URL } from "../constants";

async function getCategories() {
  const response = await fetch(`${API_URL}/categories`);
  return response.json();
}

export default getCategories;
