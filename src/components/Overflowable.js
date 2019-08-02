/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import Grid from "@material-ui/core/Grid";

function Overflowable(props) {
  return (
    <Grid
      css={css`
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
      `}
    >
      {props.children}
    </Grid>
  );
}

export default Overflowable;
