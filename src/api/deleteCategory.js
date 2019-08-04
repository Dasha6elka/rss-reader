import { API_URL, returnResponseText } from "./constants";

async function deleteCategory(categoryId) {
  const response = await fetch(`${API_URL}/category/${categoryId}`, {
    method: "DELETE"
  });
  returnResponseText(response);
}

export default deleteCategory;
