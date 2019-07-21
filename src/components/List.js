/** @jsx jsx */

import { css, jsx } from "@emotion/core";
import React from "react";
import { Grid } from "@material-ui/core";
import ListItem from "./ListItem";

function List(props) {
  const { data, onChange, onFinish, onDelete, activeCategory, setActiveCategory, channels } = props;

  function onButtonClick() {
    if (data.some(value => value.editable === true)) {
      return;
    }
    onChange([...data, { title: "", editable: true, active: false, count: 0 }]);
  }

  function onClick(id) {
    data.forEach(item => {
      if (item.id === id) {
        item.active = true;
      }
      if (item.id === activeCategory) {
        item.active = false;
      }
    });
    onChange([...data]);
    setActiveCategory(id);
  }

  function onListItemChange(event, index) {
    data[index].title = event.target.value;
    onChange([...data]);
  }

  function onListItemEditFinish() {
    onFinish([...data.map(value => ({ ...value, editable: false }))]);
  }

  function onListItemDelete(index) {
    // if (data[index].count > 0 || data[index].count !== undefined) {
    //   data[index].error = !data[index].error;
    //   onChange([...data]);
    //   return;
    // }
    data.splice(index, 1);
    onDelete(data, index);
    onChange([...data]);
  }

  function getCount(value) {
    let count = 0;
    channels.forEach(channel => {
      if (channel.id_category === value.id) {
        count++;
      }
    });
    return count;
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
            count={getCount(value)}
            editable={value.editable}
            active={value.active}
            onChange={event => onListItemChange(event, index)}
            onEditFinish={onListItemEditFinish}
            onDelete={() => onListItemDelete(value.id)}
            errorMessage={value.error}
            onListClick={() => onClick(value.id)}
          />
        ))}
        <ListItem button title="Новая категория" onClick={onButtonClick} />
      </Grid>
    </React.Fragment>
  );
}

export default List;
