/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import ArrowIcon from "../icons/ArrowIcon";

function Post(props) {
  const date = new Date(props.date);

  return (
    <div
      css={css`
        font-family: Roboto, sans-serif;
        background: #f0f1f5;
        padding: 16px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.24);
        border-top: ${props.first ? "1px solid rgba(0, 0, 0, 0.24)" : "none"};
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
              font-size: 12px;
              line-height: 16px;
              padding-top: 8px;
              color: rgba(0, 0, 0, 0.539261);
              text-transform: uppercase;
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
        <ArrowIcon
          css={css`
            position: absolute;
            right: 0;
            padding: 16px;
            top: 50%;
            transform: ${props.visible ? "" : "rotate(180deg)"} translateY(-50%);
            transform-origin: top;
            cursor: pointer;
          `}
          onClick={props.onArrowClick}
        />
      </div>
      {props.visible && <div dangerouslySetInnerHTML={{ __html: props.description }} />}
    </div>
  );
}

export default Post;

function getFriendlyDate(date) {
  const day = normilizeDateNumber(date.getDate());
  const month = normilizeDateNumber(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

function normilizeDateNumber(number) {
  if (number.toString().length === 1) {
    return `0${number}`;
  }
  return number.toString();
}
