import { API_URL } from "../constants";
import getChannels from "./getChannels";

async function getCategories() {
  const response = await fetch(`${API_URL}/categories`);
  const json = await response.json();
  const counters = await Promise.all(
    json.categories.map(async ({ id: categoryId }) => {
      const channels = await getChannels(categoryId);
      return { id: categoryId, channels: channels.channels };
    })
  );
  return {
    categories: json.categories.map(category => {
      const countersForCategory = counters.find(counter => counter.id === category.id);
      if (!countersForCategory) {
        return { ...category, count: 0 };
      }
      return {
        ...category,
        count: countersForCategory.channels.length
      };
    })
  };
}

export default getCategories;
