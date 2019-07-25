/** @jsx jsx */

import { css, jsx } from "@emotion/core";
import { Grid } from "@material-ui/core";

function Prompt(props) {
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      css={css`
        padding-top: 20px;
        color: dimgrey;
      `}
    >
      {props.text}
    </Grid>
  );
}

export default Prompt;
