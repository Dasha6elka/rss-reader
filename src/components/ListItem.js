/* eslint-disable react-hooks/exhaustive-deps */
/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import React, { useEffect } from "react";
import PropTypes from "proptypes";
import Grid from "@material-ui/core/Grid";
import { RadioButtonChecked, Delete } from "@material-ui/icons";
import ErrorMessage from "./ErrorMessage";
import Input from "./Input";

function ListItem(props) {
  function onChange(event) {
    props.onChange(event);
  }

  function onEnterPress(event) {
    if (!props.onEditFinish) {
      return;
    }
    const code = event.keyCode ? event.keyCode : event.which;
    if (code === 13 && event.target.value !== undefined && event.target.value !== "" && props.editable) {
      props.onEditFinish();
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", onEnterPress);
    return () => {
      window.removeEventListener("keydown", onEnterPress);
    };
  }, []);

  return (
    <React.Fragment>
      <Grid
        item
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        onClick={props.onListClick}
        css={css`
          color: ${props.button ? "grey" : "inherit"};
          background: ${props.active && "rgba(59, 165, 209, 0.15)"};
          color: ${props.active && "#83c6e2"};
          padding: 8px;
          cursor: ${props.button ? "text" : "pointer"};
          font-size: 14px;
          margin: 0 8px 4px 8px;
          max-width: 93%;

          .radio-button {
            flex-grow: 1;
            margin-left: 16px;
            text-overflow: ellipsis;
            overflow: hidden;
            max-width: 73%;
          }

          .input {
            border: none;
            border-radius: 2px;
            padding: 2px 4px;
            color: white;
            flex-grow: 1;
            margin: 0 0 0 16px;
            max-height: 24px;
            max-width: 73%;

            :hover:before {
              border-bottom: 2px solid white !important;
            }
          }

          .trash-icon {
            display: none;
          }

          .list-icon {
            font-size: 12px;
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
              font-size: 16px;
            }
          }
        `}
      >
        <RadioButtonChecked className="list-icon" />
        {!props.editable ? (
          <Grid className="radio-button" onClick={props.button && props.onClick}>
            {!props.button ? `${props.title} (${props.count})` : `${props.title}`}
          </Grid>
        ) : (
          <Input className="input" onChange={onChange} value={props.title} />
        )}
        {!props.button && <Delete className="trash-icon" onClick={props.onDelete} />}
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
