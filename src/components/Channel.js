/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import EditIcon from "../icons/EditIcon";
import BigTrashIcon from "../icons/BigTrashIcon";

function Channel(props) {
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
      <a href={props.link}
        css={css`
          text-decoration: none;
          font-size: 12px;
          line-height: 16px;
          color: rgba(0, 0, 0, 0.539261);
        `}
      >
        {props.link}
      </a>
      <BigTrashIcon className="trash-icon" onClick={props.onDelete} />
      <EditIcon className="edit-icon" />
    </div>
  );
}

export default Channel;
