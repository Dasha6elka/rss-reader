/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";

function Post(props) {
  const date = new Date(props.date);

  const titleStyle = {
    fontSize: "24px",
    lineHeight: "32px",
    color: "rgba(41, 98, 147, 0.87)"
  };

  const postStatusStyle = {
    fontSize: "12px",
    lineHeight: "16px",
    paddingTop: "8px",
    color: "rgba(0, 0, 0, 0.539261)",
    textTransform: "uppercase"
  };

  const publicationDateStyle = {
    fontSize: "12px",
    lineHeight: "16px",
    color: "rgba(0, 0, 0, 0.539261)"
  };

  const arrowStyle = {
    position: "absolute",
    right: "0",
    padding: "16px",
    top: "0",
    transformOrigin: "top",
    cursor: "pointer"
  };

  return (
    <div
      css={css`
        font-family: Roboto, sans-serif;
        background: #f0f1f5;
        padding: 16px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.24);
        display: ${props.onInput === true && props.found === false && "none"};
      `}
    >
      <div
        css={css`
          position: relative;
          padding-bottom: ${props.visible ? "16px" : "0"};
        `}
      >
        <div css={titleStyle}>{props.title}</div>
        {props.visited && <div css={postStatusStyle}>Прочитано</div>}
        <div css={publicationDateStyle}>
          Дата публикации: {getFriendlyDate(date)} в {date.getHours()}:{date.getMinutes()}
        </div>
        {props.visible ? (
          <ExpandLess
            css={arrowStyle}
            onClick={props.onArrowClick}
          />
        ) : (
          <ExpandMore
            css={arrowStyle}
            onClick={props.onArrowClick}
          />
        )}
      </div>
      {props.visible && <div dangerouslySetInnerHTML={{ __html: props.description }} />}
    </div>
  );
}

export default Post;

function getFriendlyDate(date) {
  const day = normalizeDateNumber(date.getDate());
  const month = normalizeDateNumber(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

function normalizeDateNumber(number) {
  if (number.toString().length === 1) {
    return `0${number}`;
  }
  return number.toString();
}
