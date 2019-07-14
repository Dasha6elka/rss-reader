/** @jsx jsx */

import { jsx, css } from "@emotion/core";

function Logo() {
  return (
      <div
          css={css`
          position: relative;
          box-sizing: border-box;
          padding-right: 20px;
          font-family: "Alegreya SC", serif;
          font-size: 30px;
          user-select: none;

          &:after {
            position: absolute;
            display: block;
            content: "";
            width: 26px;
            height: 2px;
            top: calc(90%);
            color: #3ba5d1;
            background-color: #3BA5D1;
            border-radius: 2px;
          }
        `}
      >
        RSS Reader
      </div>
  );
}

export default Logo;
