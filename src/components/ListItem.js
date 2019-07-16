/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import React, { useEffect } from "react";
import PropTypes from "proptypes";
import Input from "@material-ui/core/Input";
import Grid from "@material-ui/core/Grid";
import { RadioButtonChecked, Delete } from "@material-ui/icons";
import ErrorMessage from "./ErrorMessage";

function ListItem(props) {
  function onChange(event) {
    props.onChange(event);
  }

  function onEnterPress(event) {
    if (!props.onEditFinish) {
      return;
    }
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
    color: "black",
    flexGrow: "1",
    margin: "0",
    marginLeft: "16px",
    minWidth: "0",
    maxHeight: "24px",
    maxWidth: "73%"
  };

  const fontStyleRadioButton = {
    fontSize: "12px"
  };

  const fontStyleTrashButton = {
    fontSize: "16px"
  };

  return (
    <React.Fragment>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        css={css`
          color: ${props.button ? "grey" : "inherit"};
          background: ${props.active && "rgba(59, 165, 209, 0.15)"};
          color: ${props.active && "#83c6e2"};
          padding: 8px;
          position: relative;
          cursor: ${props.button ? "text" : "pointer"};
          font-size: 14px;
          line-height: 16px;
          margin: 0 8px 4px 8px;
          max-width: 93%;

          .radio-button {
            flex-grow: 1;
            margin-left: 16px;
            text-overflow: ellipsis;
            overflow: hidden;
            max-width: 160px;
          }

          .trash-icon {
            display: none;
          }

          .list-icon path {
            fill: ${props.active && "#83c6e2"};
          }

          &:hover {
            background: rgba(255, 255, 255, 0.15);
            color: white;

            .list-icon path {
              fill: white;
            }

            .trash-icon {
              display: block;
              margin-left: 10px;
            }
          }
        `}
      >
        <RadioButtonChecked className="list-icon" style={fontStyleRadioButton} />
        {!props.editable ? (
          <div className="radio-button" onClick={props.button && props.onClick}>
            {!props.button ? `${props.title} (${props.count})` : `${props.title}`}
          </div>
        ) : (
          <Input className="input" onChange={onChange} value={props.title} css={inputStyle} />
        )}
        {!props.button && <Delete className="trash-icon" style={fontStyleTrashButton} onClick={props.onDelete} />}
      </Grid>
      <ErrorMessage errorMessage={props.errorMessage} />
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
