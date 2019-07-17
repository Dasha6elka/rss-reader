import { API_URL } from "../constants";

async function addCategory(category) {
  const response = await fetch(`${API_URL}/category`, {
    method: "PUT",
    body: JSON.stringify(category),
    headers: {
      'Accept': 'application/json, text/plain, */*',
      "Content-Type": "application/json"
    }
  });
  return response.text().then(function(text) {
    return text ? JSON.parse(text) : {}
  })
}

export default addCategory;
