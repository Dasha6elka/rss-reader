/** @jsx jsx */

import { css, jsx } from "@emotion/core";
import { useContext, useState } from "react";
import Logo from "../components/Logo";
import List from "../components/List";
import Form from "../components/Form";
import Button from "@material-ui/core/Button";
import AppContext from "../context";

function Sidebar() {
  const context = useContext(AppContext);
  const [formVisible, setFormVisible] = useState(false);

  function onButtonClick() {
    setFormVisible(!formVisible);
  }

  return (
    <div
      css={css`
        background-color: #1d2027;
        height: 100%;
        color: white;

        .div {
          justify-content: center;
          align-items: center;
        }
      `}
    >
      <div
        className="div"
        css={css`
          padding: 24px;
        `}
      >
        <Logo />
      </div>
      <div
        className="div"
        css={css`
          padding: 0 24px 24px;
        `}
      >
        {!formVisible ? (
          <Button
            type="submit"
            css={css`
              color: #3ba5d1;
            `}
            onClick={onButtonClick}
            variant="text"
          >
            Добавить ленту
          </Button>
        ) : (
          <Form data={context.categories} onClick={onButtonClick} />
        )}
      </div>
      <List data={context.categories} onChange={context.onCategoriesChange} onFinish={context.onCategoriesFinish} />
    </div>
  );
}

export default Sidebar;
