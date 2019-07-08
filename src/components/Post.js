/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import ArrowIcon from "../icons/ArrowIcon";

function Post(props) {
  const date = new Date(props.date);

  return (
    <div
      css={css`
        background: #f0f1f5;
        padding: 16px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.24);
        border-top: ${props.first ? "1px solid rgba(0, 0, 0, 0.24)" : "none"};
      `}
    >
      <div
        css={css`
          position: relative;
        `}
      >
        <div>{props.title}</div>
        <div>
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
