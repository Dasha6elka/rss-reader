import { API_URL } from "../constants";

async function deleteCategory(category_id) {
  const response = await fetch(`${API_URL}/category/${category_id}`, {
    method: "DELETE",
  });
  return response.text().then(function(text) {
    return text ? JSON.parse(text) : {}
  })
}

export default deleteCategory;