/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import Button from "./Button";

function Form(props) {
  function onSubmit(event) {
    event.preventDefault();
  }

  return (
    <form
      css={css`
        width: 100%;
        display: flex;
        flex-direction: column;

        .list-item {
          margin-top: 16px;
          display: flex;
          flex-direction: column;

          &:first-of-type {
            margin-top: 0;
          }

          label {
            font-size: 12px;
          }

          input {
            border-radius: 2px;
            border: none;
            font-size: 16px;
            padding: 4px 2px;
          }
        }
      `}
      onSubmit={onSubmit}
    >
      <ul
        css={css`
          display: contents;
          padding: 0;
          margin: 16px 0;
          list-style: none;
        `}
      >
        <li className="list-item">
          <label>Имя ленты</label>
          <input />
        </li>
        <li className="list-item">
          <label>Ссылка на RSS</label>
          <input />
        </li>
        <li className="list-item">
          <label>Категория</label>
          <input />
        </li>
      </ul>
      <Button
        type="submit"
        title="Добавить"
        onClick={props.onClick}
        css={css`
          margin-top: 16px;
        `}
      />
    </form>
  );
}

export default Form;
