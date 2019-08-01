/** @jsx jsx */

import { css, jsx } from "@emotion/core";
import React from "react";
import { Grid } from "@material-ui/core";
import ListItem from "./ListItem";

function List(props) {
  const {
    items,
    onChange,
    onFinish,
    onDelete,
    activeCategory,
    onActiveCategoryChange,
    onActiveChannelChange,
    onLoadingLogoUrlChange
  } = props;

  function onButtonClick() {
    onChange([...items, { title: "", editable: true, active: false, count: 0 }]);
  }

  function onClick(id, editable, count) {
    items.forEach(item => {
      if (!editable) {
        if (item.id === id) {
          item.active = true;
        } else if (activeCategory && item.id === activeCategory.id) {
          item.active = false;
        }
      }
    });
    onChange([...items]);
    if (editable) {
      return;
    }
    onActiveCategoryChange({ id: id, count: count });
    onActiveChannelChange(null);
    onLoadingLogoUrlChange(true);
  }

  function onListItemChange(event, index) {
    items[index].title = event.target.value;
    onChange([...items]);
  }

  function onListItemEditFinish() {
    let isSameCategory = false;
    items.forEach(item => {
      if (item.title === items[items.length - 1].title && item !== items[items.length - 1]) {
        isSameCategory = true;
      }
    });
    if (isSameCategory) {
      return;
    }
    onFinish([...items.map(item => ({ ...item, editable: false }))]);
  }

  function onListItemDelete(index, id) {
    if (activeCategory && id === activeCategory.id) {
      onActiveCategoryChange(null);
    }
    items.splice(index, 1);
    onDelete(id);
    onChange([...items]);
  }

  return (
    <React.Fragment>
      <div
        css={css`
          width: 100%;
          border: 1px solid #0a0a0a;
          margin: 12px 0;
        `}
      />

      <Grid container direction="column" spacing={2}>
        {items.map((item, index) => (
          <ListItem
            key={index}
            title={item.title}
            count={item.count}
            editable={item.editable}
            active={item.active}
            onChange={event => onListItemChange(event, index)}
            onEditFinish={onListItemEditFinish}
            onDelete={event => {
              event.stopPropagation();
              onListItemDelete(index, item.id);
            }}
            errorMessage={item.error}
            onListClick={() => onClick(item.id, item.editable, item.count)}
          />
        ))}
        {(!items.some(item => item.editable) || !items) && (
          <ListItem button title="Новая категория" onClick={onButtonClick} />
        )}
      </Grid>
    </React.Fragment>
  );
}

export default List;
