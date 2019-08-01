/** @jsx jsx */

import { css, jsx } from "@emotion/core";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

function Prompt(props) {
  return (
    <Grid container direction="column" alignItems="center">
      <img
        src={props.url}
        alt=""
        css={css`
          max-height: ${props.height};
          max-width: ${props.width};
          margin: 20px auto;
        `}
      />
      <Typography
        css={css`
          color: dimgrey;
        `}
      >
        {props.text}
      </Typography>
    </Grid>
  );
}

export default Prompt;
