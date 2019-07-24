/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import Typography from "@material-ui/core/Typography";

function Logo() {
  return (
      <Typography
          css={css`
          position: relative;
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
            background-color: #3BA5D1;
            border-radius: 2px;
          }
        `}
      >
        RSS Reader
      </Typography>
  );
}

export default Logo;
