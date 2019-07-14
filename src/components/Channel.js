/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import { useEffect } from "react";
import { Edit, Delete } from "@material-ui/icons";
import Input from "./Input";

function Channel(props) {
  function onChange(event) {
    props.onChange(event);
  }

  function onEnterPress(event) {
    const code = event.keyCode ? event.keyCode : event.which;
    if (code === 13) {
      props.onEditFinish();
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", onEnterPress);
    return () => window.removeEventListener("keydown", onEnterPress);
  });

  return (
    <div
      css={css`
        padding: 16px 24px;
        font-family: Roboto, sans-serif;
        border-bottom: 1px solid rgba(0, 0, 0, 0.12);
        position: relative;
        background: ${props.active && "#B2C4CD"};

        .icons {
          display: none;
        }

        .div {
          max-width: 160px;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        &:hover {
          cursor: pointer;
          background: #CAD7DD;

          .icons {
            display: block;
            float: right;
            position: absolute;
            right: 16px;
            top: 50%;
            transform: translateY(-50%);
          }

          .edit-icon {
            padding-right: 15px;
          }

          .trash-icon {
            padding-right: 0;
          }
        }
      `}
    >
      <div
        className="div"
        css={css`
          content: "";
          background-image: url(${props.url});
          position: absolute;
          width: 16px;
          height: 16px;
          background-color: black;
          background-size: cover;
        `}
      />
      {!props.editable ? (
        <div
          className="div"
          css={css`
            font-size: 14px;
            line-height: 20px;
            margin-left: 24px;
            margin-bottom: 6px;
          `}
        >
          {props.title}
        </div>
      ) : (
        <Input onChange={onChange} value={props.title} />
      )}
      {!props.editable ? (
        <a
          href={props.link}
          css={css`
            display: block;
            pointer-events: none;
            text-decoration: none;
            font-size: 12px;
            line-height: 16px;
            color: rgba(0, 0, 0, 0.539261);
          `}
        >
          {props.link}
        </a>
      ) : (
        <Input onChange={onChange} value={props.link} />
      )}
      <div className="icons">
        <Edit className="edit-icon" onClick={props.onEditChannel} />
        <Delete className="trash-icon" onClick={props.onDelete} />
      </div>
    </div>
  );
}

export default Channel;
