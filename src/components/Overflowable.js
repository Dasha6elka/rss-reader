/** @jsx jsx */

import { jsx, css } from "@emotion/core";

function Overflowable(props) {
  return (
    <div
      css={css`
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
      `}
    >
      {props.children}
    </div>
  );
}

export default Overflowable;
