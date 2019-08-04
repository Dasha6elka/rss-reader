import { API_URL } from "./constants";

async function getPosts(url) {
  const response = await fetch(`${API_URL}/fetch/${url}`);
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return response.text();
}

export default getPosts;
