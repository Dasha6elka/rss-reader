/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import React  from "react";

function ErrorMessage(props) {
  return (
    <div
      css={css`
        display: ${props.errorMessage ? "block" : "none"};
        font-family: Roboto, sans-serif;
        font-size: 12px;
        line-height: 16px;
        padding: 4px 8px 4px 16px;
        color: darkred;
      `}
    >
      Нельзя удалить категорию с ненулевым количеством лент
    </div>
  );
}

export default ErrorMessage;