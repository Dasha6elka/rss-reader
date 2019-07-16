/** @jsx jsx */

import { css, jsx } from "@emotion/core";
import React from "react";
import { Grid } from "@material-ui/core";
import ListItem from "./ListItem";

function List(props) {
  const { data, onChange, onFinish } = props;

  function onButtonClick() {
    if (data.some(value => value.editable === true)) {
      return;
    }
    onChange([...data, { title: "", editable: true, count: 0 }]);
  }

  function onListItemChange(event, index) {
    data[index].title = event.target.value;
    onChange([...data]);
  }

  function onListItemEditFinish() {
    onFinish([...data.map(value => ({ ...value, editable: false }))]);
  }

  function onListItemDelete(index) {
    if (data[index].count !== 0) {
      data[index].error = !data[index].error;
      onChange([...data]);
      return;
    }
    data.splice(index, 1);
    onChange([...data]);
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
        {data.map((value, index) => (
          <ListItem
            key={index}
            title={value.title}
            count={value.count}
            editable={value.editable}
            active={value.active}
            onChange={event => onListItemChange(event, index)}
            onEditFinish={onListItemEditFinish}
            onDelete={() => onListItemDelete(index)}
            errorMessage={value.error}
          />
        ))}
        <ListItem button title="Новая категория" onClick={onButtonClick} />
      </Grid>
    </React.Fragment>
  );
}

export default List;
