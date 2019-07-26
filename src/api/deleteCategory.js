import { API_URL } from "../constants";

async function deleteCategory(categoryId) {
  const response = await fetch(`${API_URL}/category/${categoryId}`, {
    method: "DELETE",
  });
  return response.text().then(function(text) {
    return text ? JSON.parse(text) : {}
  })
}

export default deleteCategory;