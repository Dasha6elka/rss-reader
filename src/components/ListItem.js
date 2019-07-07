/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import React from "react";
import ListIcon from "../icons/ListIcon";
import TrashIcon from "../icons/TrashIcon";

function ListItem(props) {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        color: ${props.button ? "grey" : "inherit"};
        padding: 8px 8px 8px 8px;
        position: relative;
        cursor: pointer;
        font-size: 14px;
        line-height: 16px;

        .trash-icon {
          display: none;
        }

        &:hover {
          background: rgba(59, 165, 209, 0.15);
          color: #83c6e2;

          .list-icon path {
            fill: #83c6e2;
          }

          .trash-icon {
            display: block;
          }
        }
      `}
    >
      <ListIcon className="list-icon" />
      <div
        css={css`
          flex-grow: 1;
          margin-left: 16px;
        `}
      >
        {props.title}
      </div>
      {!props.button && <TrashIcon className="trash-icon" />}
    </div>
  );
}

export default ListItem;
