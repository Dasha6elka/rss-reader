/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import { useState } from "react";
import Logo from "../components/Logo";
import List from "../components/List";
import Form from "../components/Form";
import Button from "@material-ui/core/Button";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

function Sidebar() {
  const [formVisible, setFormVisible] = useState(false);

  function onButtonClick() {
    setFormVisible(!formVisible);
  }

  const theme = createMuiTheme({
    palette: {
      primary: { 500: "#3ba5d1" }
    }
  });

  const divStyle = {
    justifyContent: "center",
    alignItems: "center"
  };

  return (
    <div
      css={css`
        background-color: #1d2027;
        height: 100%;
        color: white;
      `}
    >
      <div
        style={divStyle}
        css={css`
          padding: 24px;
        `}
      >
        <Logo />
      </div>
      <div
        style={divStyle}
        css={css`
          padding: 0 24px 24px;
        `}
      >
        {!formVisible ? (
          <MuiThemeProvider theme={theme}>
            <Button styledbutton="true" type="submit" onClick={onButtonClick} href="" variant="text" color="primary">
              Добавить ленту
            </Button>
          </MuiThemeProvider>
        ) : (
          <Form onClick={onButtonClick} />
        )}
      </div>
      <List />
    </div>
  );
}

export default Sidebar;
