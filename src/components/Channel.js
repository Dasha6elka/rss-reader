/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import { useEffect } from "react";
import EditIcon from "../icons/EditIcon";
import BigTrashIcon from "../icons/BigTrashIcon";

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

        .icons {
          display: none;
        }

        &:hover {
          cursor: pointer;

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
          css={css`
            font-size: 14px;
            line-height: 20px;
            margin-left: 24px;
            margin-bottom: 6px;
            max-width: 160px;
            text-overflow: ellipsis;
            overflow: hidden;
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
            background-color: white;
            border: none;
            border-radius: 2px;
            padding: 0 8px;
          `}
        />
      )}
      {!props.editable ? (
        <a
          href={props.link}
          css={css`
            display: block;
            text-decoration: none;
            font-size: 12px;
            line-height: 16px;
            color: rgba(0, 0, 0, 0.539261);
            overflow: hidden;
            max-width: 160px;
            text-overflow: ellipsis;
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
            overflow: hidden;
            background-color: white;
            border-radius: 2px;
            border: none;
            padding: 0 8px;
          `}
        />
      )}
      <div className="icons">
        <EditIcon className="edit-icon" onClick={props.onEditChannel} />
        <BigTrashIcon className="trash-icon" onClick={props.onDelete} />
      </div>
    </div>
  );
}

export default Channel;
