/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { Grid, IconButton } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

function Post(props) {
  const date = new Date(props.date);

  return (
    <Grid
      css={css`
        background: #f0f1f5;
        padding: 16px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.24);
        display: ${props.onInput === true && props.found === false && "none"};
      `}
    >
      <Grid container wrap={"nowrap"}>
        <Grid item container direction="column">
          <Typography
            variant="h5"
            css={css`
              color: rgba(41, 98, 147, 0.87);
            `}
          >
            {props.title}
          </Typography>
          <Grid
            container
            direction={"column"}
            css={css`
              padding-top: 8px;
            `}
          >
            {props.visited && (
              <Typography
                variant="caption"
                css={css`
                  color: rgba(0, 0, 0, 0.539261);
                `}
              >
                ПРОЧИТАНО
              </Typography>
            )}
            {props.date && (
              <Typography
                variant="caption"
                css={css`
                  color: rgba(0, 0, 0, 0.539261);
                `}
              >
                Дата публикации: {formatDate(date)}
              </Typography>
            )}
          </Grid>
        </Grid>
        <Grid item>
          <IconButton onClick={props.onArrowClick}>{props.expanded ? <ExpandLess /> : <ExpandMore />}</IconButton>
        </Grid>
      </Grid>
      {props.expanded && (
        <Grid
          dangerouslySetInnerHTML={{ __html: htmlDecode(props.description) }}
          css={css`
            margin-top: 16px;

            img {
              width: 100%;
            }
          `}
        />
      )}
    </Grid>
  );
}

export default Post;

function formatDate(date) {
  const minutes = date
    .getMinutes()
    .toString()
    .padStart(2, "0");
  const hours = date
    .getHours()
    .toString()
    .padStart(2, "0");
  const day = date
    .getDate()
    .toString()
    .padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year} в ${hours}:${minutes}`;
}

function htmlDecode(input) {
  const doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
}
