/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import React from "react";
import PropTypes from "proptypes";
import Grid from "@material-ui/core/Grid";
import { RadioButtonChecked, Delete } from "@material-ui/icons";
import Input from "./Input";

function ListItem(props) {
  function onChange(event) {
    props.onChange(event);
  }

  const { onEditFinish, editable } = props;

  function onBlur(event) {
    if (onEditFinish && event.target.value !== undefined && event.target.value !== "" && editable) {
      onEditFinish();
    }
  }

  return (
    <React.Fragment>
      <Grid
        item
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        onClick={props.button ? props.onClick : props.onListClick}
        onBlur={onBlur}
        css={css`
          color: ${props.active ? "#83c6e2" : props.button ? "grey" : "inherit"};
          background: ${props.active && "rgba(59, 165, 209, 0.15)"};
          padding: 8px;
          cursor: ${props.button ? "text" : "pointer"};
          font-size: 14px;
          margin: 0 8px 4px 8px;
          max-width: 93%;

          .list {
            flex-grow: 1;
            max-width: 73%;
            height: 18px;
          }

          .radio-button {
            margin-left: 16px;
            text-overflow: ellipsis;
            overflow: hidden;
          }

          .input {
            border: none;
            color: white;
            margin: 0 0 0 16px;
            max-height: 24px;
            font-size: 14px;

            input {
              height: 0;
            }

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
          <Grid className="radio-button list">
            {!props.button ? `${props.title} (${props.count})` : `${props.title}`}
          </Grid>
        ) : (
          <Input
            autoFocus={true}
            className="input list"
            onChange={onChange}
            value={props.title}
            placeholder="Введите категорию"
          />
        )}
        {!props.button && <Delete className="trash-icon" onClick={props.onDelete} />}
      </Grid>
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
