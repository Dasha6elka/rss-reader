/** @jsx jsx */

import { css, jsx } from "@emotion/core";
import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import ListItem from "./ListItem";

function List(props) {
  const { data, onChange, onFinish, onDelete, activeCategory, setActiveCategory } = props;
  const [isButton, setIsButton] = useState(true);

  function onButtonClick() {
    if (data.some(value => value.editable === true)) {
      return;
    }
    onChange([...data, { title: "", editable: true, active: false, count: 0 }]);
    setIsButton(false);
  }

  function onClick(id, editable, count) {
    data.forEach(item => {
      if (item.id === id && !editable) {
        item.active = true;
      }
      if (activeCategory && item.id === activeCategory.id && item.id !== id && !editable) {
        item.active = false;
      }
    });
    onChange([...data]);
    if (editable) {
      return;
    }
    setActiveCategory({ id: id, count: count });
  }

  function onListItemChange(event, index) {
    data[index].title = event.target.value;
    onChange([...data]);
  }

  function onListItemEditFinish() {
    let isSameCategory = false;
    data.forEach(item => {
      if (item.title === data[data.length - 1].title && item !== data[data.length - 1]) {
        isSameCategory = true;
      }
    });
    if (isSameCategory) {
      return;
    }
    onFinish([...data.map(value => ({ ...value, editable: false }))]);
    setIsButton(true);
  }

  function onListItemDelete(index, id) {
    if (data[index].count > 0) {
      data[index].error = !data[index].error;
      onChange([...data]);
      return;
    }
    if (activeCategory && id === activeCategory.id) {
      setActiveCategory(null);
    }
    data.splice(index, 1);
    onDelete(data, id);
    onChange([...data]);
  }

  return (
    <React.Fragment>
      <Grid
        css={css`
          width: 100%;
          border: 1px solid #0a0a0a;
          margin: 12px 0;
        `}
      />

      <Grid container direction="column" spacing={2}>
        {data.map((value, index) => (
          <ListItem
            key={index}
            title={value.title}
            count={value.count}
            editable={value.editable}
            active={value.active}
            onChange={event => onListItemChange(event, index)}
            onEditFinish={onListItemEditFinish}
            onDelete={event => {
              event.stopPropagation();
              onListItemDelete(index, value.id);
            }}
            errorMessage={value.error}
            onListClick={() => onClick(value.id, value.editable, value.count)}
          />
        ))}
        {isButton && <ListItem button title="Новая категория" onClick={onButtonClick} />}
      </Grid>
    </React.Fragment>
  );
}

export default List;
