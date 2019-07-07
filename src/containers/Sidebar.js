/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import React from "react";
import Button from "../components/Button";
import Logo from "../components/Logo";
import List from "../components/List";

function Sidebar() {
  return (
    <div
      css={css`
        background-color: #1d2027;
        height: 100%;
        color: white;
      `}
    >
        <div
            css={css`
              padding: 24px;
              display: flex;
              justify-content: center;
              align-items: center;
            `}
        >
            <Logo/>
        </div>
        <div
            css={css`
              padding: 0 24px 24px;
              display: flex;
              justify-content: center;
              align-items: center;
            `}
        >
            <Button/>
        </div>
      <List />
    </div>
  );
}

export default Sidebar;
