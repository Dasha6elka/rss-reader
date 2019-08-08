/** @jsx jsx */

import React from "react";
import { css, jsx } from "@emotion/core";
import { useContext, useState } from "react";
import Logo from "../components/Logo";
import List from "../components/List";
import Form from "../components/Form";
import Button from "@material-ui/core/Button";
import AppContext from "../context";
import { Grid } from "@material-ui/core";

function Sidebar() {
  const context = useContext(AppContext);
  const [formVisible, setFormVisible] = useState(false);

  function onAddFeedButtonClick() {
    setFormVisible(!formVisible);
  }

  function onAddFeedFormButtonClick(channel) {
    setFormVisible(!formVisible);
    context.channels.push(channel);
    context.categories.forEach(category => {
      if (category.id === channel.categoryId) {
        category.count++;

        if (category.id === context.activeCategory.id) {
          context.activeCategory.count = category.count;
        }
      } 
    });
    context.onChannelAdd(context.channels);
  }

  return (
    <React.Fragment>
      <Grid
        css={css`
          padding: 24px;
        `}
      >
        <Logo />
      </Grid>
      <Grid
        container
        justify="center"
        css={css`
          padding: 0 24px 24px;
        `}
      >
        {!formVisible ? (
          <Button
            type="submit"
            css={css`
              padding: 6px 16px;
              background-color: #3ba5d1;
              color: white;

              :hover {
                background-color: #49c8fc;
              }
            `}
            onClick={onAddFeedButtonClick}
            variant="text"
          >
            Добавить ленту
          </Button>
        ) : (
          <Form categories={context.categories} channels={context.channels} onSubmit={onAddFeedFormButtonClick} />
        )}
      </Grid>
      <List
        activeCategory={context.activeCategory}
        onActiveCategoryChange={context.onActiveCategoryChange}
        onActiveChannelChange={context.onActiveChannelChange}
        items={context.categories}
        onChange={context.onCategoriesChange}
        onFinish={context.onCategoryAdd}
        onDelete={context.onCategoryDelete}
      />
    </React.Fragment>
  );
}

export default Sidebar;
