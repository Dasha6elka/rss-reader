import { API_URL } from "../constants";

async function addCategory(category) {
  const response = await fetch(`${API_URL}/category`, {
    method: "PUT",
    body: category,
    headers: {
      "Content-Type": "application/json"
    }
  });
  return response.json();
}

export default addCategory;
