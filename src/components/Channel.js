/** @jsx jsx */

import React from "react";
import { jsx, css } from "@emotion/core";
import { useEffect } from "react";
import { Edit, Delete } from "@material-ui/icons";
import Input from "./Input";
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

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
    <Grid onClick={props.onChannelClick}
      css={css`
        padding: 16px 24px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.12);
        position: relative;
        background: ${props.active && "#B2C4CD"};

        .icons {
          display: none;
        }

        .div {
          max-width: 160px;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        &:hover {
          cursor: pointer;
          background: #cad7dd;

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
      <Grid container direction="row">
        <img
          src={props.url}
          alt=""
          css={css`
            height: 16px;
            width: 16px;
          `}
        />
        <ChannelTitle editable={props.editable} title={props.title} onChange={onChange} />
      </Grid>
      <ChannelLink editable={props.editable} link={props.link} onChange={onChange} />
      <Grid className="icons" onClick={(event => event.stopPropagation())}>
        <Edit className="edit-icon" onClick={props.onEditChannel} />
        <Delete className="trash-icon" onClick={props.onDelete} />
      </Grid>
    </Grid>
  );
}

function ChannelTitle(props) {
  return (
    <React.Fragment>
      {!props.editable ? (
        <Typography
          css={css`
            font-size: 14px;
            line-height: 20px;
            margin-left: 8px;
            margin-bottom: 8px;
            max-width: 160px;
            text-overflow: ellipsis;
            overflow: hidden;
          `}
        >
          {props.title}
        </Typography>
      ) : (
        <Input
          onChange={props.onChange}
          value={props.title}
          type="text"
          name="title"
          autoComplete="off"
          css={css`
            font-size: 14px;
            margin-left: 8px;
            max-height: 20px;
          `}
        />
      )}
    </React.Fragment>
  );
}

function ChannelLink(props) {
  return (
    <React.Fragment>
      {!props.editable ? (
        <Typography
          css={css`
            color: rgba(0, 0, 0, 0.539261);
            font-size: 12px;
            max-width: 160px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          `}
        >
          {props.link}
        </Typography>
      ) : (
        <Input
          onChange={props.onChange}
          value={props.link}
          type="text"
          name="link"
          autoComplete="off"
          css={css`
            display: block;
            font-size: 12px;
            color: rgba(0, 0, 0, 0.539261);
            max-width: 188px;
          `}
        />
      )}
    </React.Fragment>
  );
}

export default Channel;
