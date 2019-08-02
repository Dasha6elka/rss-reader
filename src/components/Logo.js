/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

function Logo() {
  return (
    <Grid container direction="column">
      <Typography
        variant="h4"
        css={css`
          line-height: 32px;
          font-family: "Alegreya SC", serif;
          user-select: none;
        `}
      >
        RSS Reader
      </Typography>
      <Grid
        css={css`
          width: 26px;
          height: 2px;
          background-color: #3ba5d1;
          border-radius: 2px;
        `}
      />
    </Grid>
  );
}

export default Logo;
