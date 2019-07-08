/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import { useState, useEffect } from "react";
import EditIcon from "../icons/EditIcon";
import BigTrashIcon from "../icons/BigTrashIcon";

function Channel(props) {
  const [edit, setEdit] = useState(false);

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

  function onEdtIconClick() {
    setEdit(!edit);
  }

  return (
    <div
      css={css`
        padding: 16px 24px;
        font-family: Roboto, sans-serif;
        border-bottom: 1px solid rgba(0, 0, 0, 0.12);

        .edit-icon,
        .trash-icon {
          display: none;
        }

        &:hover {
          cursor: pointer;

          .edit-icon,
          .trash-icon {
            display: inline-block;
            float: right;
            text-align: center;
            transform: translateY(-75%);
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
        css={css`
          position: absolute;
          width: 16px;
          height: 16px;
          background-color: black;
        `}
      />
      {!edit ? (
        <div
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
        <input
          defaultValue={props.title}
          onChange={onChange}
          name="name"
          css={css`
            font-size: 14px;
            line-height: 20px;
            margin-left: 24px;
            margin-bottom: 6px;
          `}
        />
      )}
      {!edit ? (
        <a
          href={props.link}
          css={css`
            text-decoration: none;
            font-size: 12px;
            line-height: 16px;
            color: rgba(0, 0, 0, 0.539261);
          `}
        >
          {props.link}
        </a>
      ) : (
        <input
          defaultValue={props.link}
          onChange={onChange}
          name="link"
          css={css`
            text-decoration: none;
            font-size: 12px;
            line-height: 16px;
            color: rgba(0, 0, 0, 0.539261);
          `}
        />
      )}
      <BigTrashIcon className="trash-icon" onClick={props.onDelete} />
      <EditIcon className="edit-icon" onClick={onEdtIconClick} />
    </div>
  );
}

export default Channel;
