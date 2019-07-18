/** @jsx jsx */

import { css, Global, jsx } from "@emotion/core";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Channels from "./Channels";
import Posts from "./Posts";
import getCategories from "../api/getCategories";
import AppContext from "../context";
import addCategory from "../api/addCategory";
import deleteCategory from "../api/deleteCategory";

function App() {
  const [categories, setCategories] = useState([]);

  function onCategoriesChange(change) {
    setCategories(change);
  }

  function onCategoriesFinish(categories) {
    setCategories(categories);
    addCategory(categories[categories.length - 1])
      .then(() => getCategories())
      .then(json => setCategories(json.categories))
      .catch(console.error);
  }

  function onCategoryDelete(categories, category_id) {
    setCategories(categories);
    deleteCategory(category_id)
      .then(() => getCategories())
      .then(json => setCategories(json.categories))
      .catch(console.error);
  }

  useEffect(() => {
    getCategories()
      .then(json => setCategories(json.categories))
      .catch(console.error);
  }, []);

  return (
    <AppContext.Provider
      value={{
        categories,
        onCategoriesChange,
        onCategoriesFinish,
        onCategoryDelete
      }}
    >
      <Global
        styles={css`
          html,
          body,
          #root {
            width: 100%;
            height: 100%;
          }

          html {
            font-family: "Roboto", sans-serif;
          }
        `}
      />
      <div
        css={css`
          height: 100%;
          display: grid;
          grid-template-columns: minmax(240px, 1fr) minmax(320px, 1.5fr) 6fr;
        `}
      >
        <Sidebar/>
        <Channels/>
        <Posts/>
      </div>
    </AppContext.Provider>
  );
}

export default App;
