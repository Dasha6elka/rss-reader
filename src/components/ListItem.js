/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import { useEffect } from "react";
import ListIcon from "../icons/ListIcon";
import TrashIcon from "../icons/TrashIcon";
import PropTypes from "proptypes";

function ListItem(props) {
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
        display: flex;
        align-items: center;
        color: ${props.button ? "grey" : "inherit"};
        padding: 8px 8px 8px 8px;
        position: relative;
        cursor: ${props.button ? "text" : "pointer"};
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
            margin-left: 16px;
          }
        }
      `}
    >
      <ListIcon className="list-icon" />
      {!props.editable ? (
        <div
          css={css`
            flex-grow: 1;
            margin-left: 16px;
          `}
          onClick={props.button && props.onClick}
        >
          {!props.button ? `${props.title} (${props.count})` : `${props.title}`}
        </div>
      ) : (
        <input
          value={props.title}
          className="input"
          css={css`
            border: none;
            background-color: #1d2027;
            color: grey;
            flex-grow: 1;
            margin-left: 16px;
            min-width: 0;
          `}
          onChange={onChange}
        />
      )}
      {!props.button && <TrashIcon className="trash-icon" onClick={props.onDelete} />}
    </div>
  );
}

ListItem.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number,
  editable: PropTypes.bool,
  onChange: PropTypes.func,
  onEditFinish: PropTypes.func,
  onDelete: PropTypes.func
};

export default ListItem;
