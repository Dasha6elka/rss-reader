/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import React, { useEffect } from "react";
import ListIcon from "../icons/ListIcon";
import TrashIcon from "../icons/TrashIcon";
import PropTypes from "proptypes";
import Input from "@material-ui/core/Input";

function ListItem(props) {
  function onChange(event) {
    props.onChange(event);
  }

  function onEnterPress(event) {
    const code = event.keyCode ? event.keyCode : event.which;
    if (code === 13 && event.target.value !== undefined && event.target.value !== "") {
      props.onEditFinish();
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", onEnterPress);
    return () => window.removeEventListener("keydown", onEnterPress);
  });

  const inputStyle = {
    border: "none",
    borderRadius: "2px",
    padding: "2px 4px",
    backgroundColor: "white",
    color: "black",
    flexGrow: "1",
    margin: "0",
    marginLeft: "16px",
    minWidth: "0",
    maxHeight: "24px"
  };

  return (
    <React.Fragment>
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
          <Input className="input" onChange={onChange} value={props.title} style={inputStyle} />
        )}
        {!props.button && <TrashIcon className="trash-icon" onClick={props.onDelete} />}
      </div>
      {errorMessage(props)}
    </React.Fragment>
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

function errorMessage(props) {
  return (
    <div
      css={css`
        display: ${props.errorMessage ? "block" : "none"};
        font-family: Roboto, sans-serif;
        font-size: 12px;
        line-height: 16px;
        padding: 4px 8px 4px 16px;
        color: darkred;
      `}
    >
      Нельзя удалить категорию с ненулевым количеством лент
    </div>
  );
}
