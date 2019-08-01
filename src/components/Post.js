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

        .typography {
          color: rgba(0, 0, 0, 0.539261);
        }

        .expand {
          position: absolute;
          right: 0;
          top: 0;
          padding: 16px;
          transform-origin: top;
          cursor: pointer;
        }
      `}
    >
      <Grid
        css={css`
          position: relative;
        `}
      >
        <Typography
          variant="h5"
          css={css`
            width: 90%;
            color: rgba(41, 98, 147, 0.87);
          `}
        >
          {props.title}
        </Typography>
        <Grid container direction="column">
          {props.visited && (
            <Typography
              variant="overline"
              className="typography"
              css={css`
                padding-top: 8px;
                line-height: 16px;
              `}
            >
              Прочитано
            </Typography>
          )}
          <Typography variant="caption" className="typography">
            Дата публикации: {formatDate(date)}
          </Typography>
        </Grid>
        {props.expanded ? (
          <IconButton className="expand" onClick={props.onArrowClick}>
            <ExpandLess />
          </IconButton>
        ) : (
          <IconButton className="expand" onClick={props.onArrowClick}>
            <ExpandMore />
          </IconButton>
        )}
      </Grid>
      {props.expanded && (
        <div
          dangerouslySetInnerHTML={{ __html: props.description }}
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
