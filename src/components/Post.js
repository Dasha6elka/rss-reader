/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";

function Post(props) {
  const date = new Date(props.date);

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
        <div
          css={css`
            font-size: 24px;
            line-height: 32px;
            color: rgba(41, 98, 147, 0.87);
          `}
        >
          {props.title}
        </div>
        {props.visited && (
          <div
            css={css`
              padding-top: 8px;
              text-transform: uppercase;
              font-size: 12px;
              line-height: 16px;
              color: rgba(0, 0, 0, 0.539261);
            `}
          >
            Прочитано
          </div>
        )}
        <div
          css={css`
            font-size: 12px;
            line-height: 16px;
            color: rgba(0, 0, 0, 0.539261);
          `}
        >
          Дата публикации: {getFriendlyDate(date)} в {date.getHours()}:{date.getMinutes()}
        </div>
        {props.visible ? (
          <ExpandLess
            css={css`
              position: absolute;
              right: 0;
              top: 0;
              padding: 16px;
              transform-origin: top;
              cursor: pointer;
            `}
            onClick={props.onArrowClick}
          />
        ) : (
          <ExpandMore
            css={css`
              position: absolute;
              right: 0;
              top: 0;
              padding: 16px;
              transform-origin: top;
              cursor: pointer;
            `}
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
