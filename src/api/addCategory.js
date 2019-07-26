import { API_URL, HEADERS, RETURN_RESPONSE_TEXT } from "../constants";

async function addCategory(category) {
  const response = await fetch(`${API_URL}/category`, {
    method: "PUT",
    body: JSON.stringify(category),
    headers: HEADERS
  });
  RETURN_RESPONSE_TEXT(response);
}

export default addCategory;
