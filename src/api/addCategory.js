import { API_URL, HEADERS, returnResponseText } from "../constants";

async function addCategory(category) {
  const response = await fetch(`${API_URL}/category`, {
    method: "PUT",
    body: JSON.stringify(category),
    headers: HEADERS
  });
  returnResponseText(response);
}

export default addCategory;
