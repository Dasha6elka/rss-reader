/** @jsx jsx */

import { css, jsx } from "@emotion/core";
import { Grid } from "@material-ui/core";

function Prompt(props) {
  return (
    <Grid container>
      <img
        src={props.url}
        alt=""
        css={css`
          width: 100%;
          height: 100%;
          max-height: ${props.height};
          max-width: ${props.width};
          margin: 20px auto;
        `}
      />
      <Grid
        container
        justify="center"
        alignItems="center"
        css={css`
          color: dimgrey;
          text-align: center;
        `}
      >
        {props.text}
      </Grid>
    </Grid>
  );
}

export default Prompt;
