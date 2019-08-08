/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import React, { useEffect, useCallback, useState } from "react";
import { RadioButtonChecked, Delete, Done } from "@material-ui/icons";
import PropTypes from "proptypes";
import Grid from "@material-ui/core/Grid";
import Input from "./Input";
import DeleteControl from "./DeleteControl";

function ListItem(props) {
  const [isDelete, setIsDelete] = useState(false);

  function onDeleteWindowChange(event) {
    setIsDelete(!isDelete);
    props.onDelete(event);
  }

  function onWindowChange() {
    setIsDelete(!isDelete);
  }

  function onChange(event) {
    props.onChange(event);
  }

  const { onEditFinish, editable } = props;
  const onEnterPress = useCallback(
    event => {
      if (!onEditFinish) {
        return;
      }
      const code = event.keyCode ? event.keyCode : event.which;
      if (code === 13 && event.target.value !== undefined && event.target.value !== "" && editable) {
        onEditFinish();
      }
    },
    [onEditFinish, editable]
  );

  useEffect(() => {
    window.addEventListener("keydown", onEnterPress);
    return () => {
      window.removeEventListener("keydown", onEnterPress);
    };
  }, [onEnterPress]);

  function onEditFinishCategory(event) {
    if (onEditFinish && event.target.value !== undefined && event.target.value !== "" && editable) {
      onEditFinish();
    }
  }

  return (
    <React.Fragment>
      <Grid
        item
        wrap="nowrap"
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        onClick={props.button ? props.onClick : props.onListClick}
        onBlur={onEditFinishCategory}
        css={css`
          color: ${props.active ? "#83c6e2" : props.button ? "grey" : "inherit"};
          background: ${props.active && "rgba(59, 165, 209, 0.15)"};
          cursor: ${props.button ? "text" : "pointer"};
          font-size: 14px;
          margin: 0 8px 4px 8px;
          max-width: 93%;

          .list {
            flex-grow: 1;
            height: 18px;
            margin-left: 16px;
          }

          .radio-button {
            text-overflow: ellipsis;
            overflow: hidden;
            max-width: 73%;
          }

          .input {
            color: white;
            font-size: 14px;
            max-width: 90%;

            input {
              height: 0;
            }

            :hover:before {
              border-bottom: 2px solid white !important;
            }
          }

          .hover-icons {
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

            .hover-icons {
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
        {!props.button && (
          <Grid
            container
            wrap="nowrap"
            direction="row"
            css={css`
              width: ${props.editable ? "22%" : "0"};
            `}
            onClick={event => event.stopPropagation()}
          >
            {props.editable && <Done className="hover-icons" onClick={onEditFinishCategory} />}
            <Delete className="hover-icons" onClick={onWindowChange} />
          </Grid>
        )}
      </Grid>
      {isDelete && (
        <DeleteControl onDeleteWindowChange={onDeleteWindowChange} onWindowChange={onWindowChange}/>
      )}
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
