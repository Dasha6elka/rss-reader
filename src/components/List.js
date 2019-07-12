/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import React, { useState } from "react";
import ListItem from "./ListItem";
import { Grid } from "@material-ui/core";

function List() {
  const [categories, setCategories] = useState([
    { title: "Программирование", count: 2, editable: false, error: false },
    { title: "Дизайн", count: 0, editable: false, error: false },
    { title: "Смешнявки", count: 0, editable: false, error: false }
  ]);

  function onButtonClick() {
    if (categories.some(category => category.editable === true)) {
      return;
    }
    setCategories([...categories, { title: "", editable: true, count: 0 }]);
  }

  function onListItemChange(event, index) {
    categories[index].title = event.target.value;
    setCategories([...categories]);
  }

  function onListItemEditFinish() {
    setCategories([...categories.map(category => ({ ...category, editable: false }))]);
  }

  function onListItemDelete(index) {
    if (categories[index].count !== 0) {
      categories[index].error = !categories[index].error;
      setCategories([...categories]);
      return;
    }
    categories.splice(index, 1);
    setCategories([...categories]);
  }

  return (
    <React.Fragment>
      <div
        css={css`
          border: 1px solid #0a0a0a;
          margin: 12px 0;
        `}
      />

      <Grid container direction="column" justify="center" alignItems="stretch">
        {categories.map((category, index) => (
          <ListItem
            key={index}
            title={category.title}
            count={category.count}
            editable={category.editable}
            onChange={event => onListItemChange(event, index)}
            onEditFinish={onListItemEditFinish}
            onDelete={() => onListItemDelete(index)}
            errorMessage={category.error}
          />
        ))}
        <ListItem button title="Новая категория" onClick={onButtonClick} />
      </Grid>

      <div
        css={css`
          border: 1px solid rgba(255, 255, 255, 0.12);
          margin: 8px 32px;
        `}
      />
    </React.Fragment>
  );
}

export default List;
