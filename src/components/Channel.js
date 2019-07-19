/** @jsx jsx */

import React from "react";
import { jsx, css } from "@emotion/core";
import { useEffect } from "react";
import { Edit, Delete } from "@material-ui/icons";
import Input from "./Input";
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";

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
        <CardMedia component={"img"} image={props.url} style={{ height: "16px", width: "16px" }} />
        <ChannelTitle editable={props.editable} title={props.title} onChange={onChange} />
      </Grid>
      <ChannelLink editable={props.editable} link={props.link} onChange={onChange} />
      <div className="icons">
        <Edit className="edit-icon" onClick={props.onEditChannel} />
        <Delete className="trash-icon" onClick={props.onDelete} />
      </div>
    </div>
  );
}

function ChannelTitle(props) {
  return (
    <React.Fragment>
      {!props.editable ? (
        <Typography
          style={{
            fontSize: "14px",
            lineHeight: "20px",
            marginLeft: "8px",
            marginBottom: "6px",
            maxWidth: "160px",
            textOverflow: "ellipsis",
            overflow: "hidden"
          }}
        >
          {props.title}
        </Typography>
      ) : (
        <Input
          onChange={props.onChange}
          value={props.title}
          name="title"
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
          style={{ color: "rgba(0, 0, 0, 0.539261)", fontSize: "12px", maxWidth: "160px", textOverflow: "ellipsis", overflow: "hidden" }}
        >
          {props.link}
        </Typography>
      ) : (
        <Input
          onChange={props.onChange}
          value={props.link}
          name="link"
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
