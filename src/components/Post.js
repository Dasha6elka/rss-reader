/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { Grid } from "@material-ui/core";
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
      <Grid
        css={css`
          position: relative;
          padding-bottom: ${props.expanded ? "16px" : "0"};

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
        <Typography
          css={css`
            width: 90%;
            font-size: 24px;
            line-height: 32px;
            color: rgba(41, 98, 147, 0.87);
          `}
        >
          {props.title}
        </Typography>
        {props.visited && (
          <Typography
            css={css`
              padding-top: 8px;
              text-transform: uppercase;
              font-size: 12px;
              line-height: 16px;
              color: rgba(0, 0, 0, 0.539261);
            `}
          >
            Прочитано
          </Typography>
        )}
        <Typography
          css={css`
            font-size: 12px;
            line-height: 16px;
            color: rgba(0, 0, 0, 0.539261);
          `}
        >
          Дата публикации: {formatDate(date)}
        </Typography>
        {props.expanded ? (
          <ExpandLess className="expand" onClick={props.onArrowClick} />
        ) : (
          <ExpandMore className="expand" onClick={props.onArrowClick} />
        )}
      </Grid>
      {props.expanded && (
        <Grid
          dangerouslySetInnerHTML={{ __html: props.description }}
          css={css`
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
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year} в ${hours}:${minutes}`;
}
