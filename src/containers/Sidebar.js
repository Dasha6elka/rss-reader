/** @jsx jsx */

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

  function onButtonClick() {
    setFormVisible(!formVisible);
  }

  function onFormButtonClick() {
    setFormVisible(!formVisible);
    context.onChannelFinish(context.channels);
  }

  return (
    <Grid
      item
      xs={2}
      css={css`
        background-color: #1d2027;
        color: white;
      `}
    >
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
            onClick={onButtonClick}
            variant="text"
          >
            Добавить ленту
          </Button>
        ) : (
          <Form
            categories={context.categories}
            channels={context.channels}
            onClick={onFormButtonClick}
            onChange={context.onChannelsChange}
          />
        )}
      </Grid>
      <List
        activeCategory={context.activeCategory}
        setActiveCategory={context.setActiveCategory}
        data={context.categories}
        onChange={context.onCategoriesChange}
        onFinish={context.onCategoriesFinish}
        onDelete={context.onCategoryDelete}
        channels={context.channels}
      />
    </Grid>
  );
}

export default Sidebar;
