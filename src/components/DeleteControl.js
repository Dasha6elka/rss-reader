/** @jsx jsx */

import { css, jsx } from "@emotion/core";
import { Button, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

function DeleteControl(props) {
  return (
    <Grid
      container
      wrap="nowrap"
      direction="row"
      justify="space-between"
      alignItems="center"
      css={css`
        padding: 16px 24px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.12);

        .question {
          width: 100%;
          font-size: 14px;
        }
      `}
    >
      <Typography className="question">Удалить ленту?</Typography>
      <Grid
        item
        container
        direction="row"
        justify="flex-end"
        css={css`
          button {
            color: #3ba5d1;
          }
        `}
      >
        <Grid>
          <Button variant="text" color="primary" onClick={event => props.onDeleteWindowChange(event)}>
            Да
          </Button>
        </Grid>
        <Grid>
          <Button variant="text" color="primary" onClick={props.onWindowChange}>
            Нет
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default DeleteControl;
