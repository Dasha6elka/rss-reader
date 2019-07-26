import { API_URL, RETURN_RESPONSE_TEXT } from "../constants";

async function deleteCategory(categoryId) {
  const response = await fetch(`${API_URL}/category/${categoryId}`, {
    method: "DELETE",
  });
  RETURN_RESPONSE_TEXT(response);
}

export default deleteCategory;