import { API_URL } from "./constants";

async function getPosts(url) {
  const response = await fetch(`${API_URL}/fetch/${url}`);
  return response.text();
}

export default getPosts;
