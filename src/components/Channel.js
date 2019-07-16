/** @jsx jsx */

import React from "react";
import { jsx, css } from "@emotion/core";
import { useEffect } from "react";
import { Edit, Delete } from "@material-ui/icons";
import Input from "./Input";

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
      <div
        className="div"
        css={css`
          content: "";
          background-image: url(${props.url});
          position: absolute;
          width: 16px;
          height: 16px;
          background-color: black;
          background-size: cover;
        `}
      />
      <ChannelTitle editable={props.editable} title={props.title} onChange={props.onChange} />
      <ChannelLink editable={props.editable} link={props.link} onChange={props.onChange} />
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
        <div
          className="div"
          css={css`
            font-size: 14px;
            line-height: 20px;
            margin-left: 24px;
            margin-bottom: 6px;
          `}
        >
          {props.title}
        </div>
      ) : (
        <Input
          onChange={props.onChange}
          value={props.title}
          name="title"
          css={css`
            font-size: 14px;
            line-height: 20px;
            margin-left: 24px;
            border: none;
            border-radius: 2px;
            max-height: 20px;
            padding: 0 8px 0 0;
            margin-bottom: 0;
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
        <a
          href={props.link}
          css={css`
            display: block;
            pointer-events: none;
            text-decoration: none;
            font-size: 12px;
            line-height: 16px;
            color: rgba(0, 0, 0, 0.539261);
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 184px;
          `}
        >
          {props.link}
        </a>
      ) : (
        <Input
          onChange={props.onChange}
          value={props.link}
          name="link"
          css={css`
            display: block;
            text-decoration: none;
            font-size: 12px;
            line-height: 16px;
            color: rgba(0, 0, 0, 0.539261);
            margin-left: 0;
            margin-bottom: 0;
            padding-left: 0;
            max-width: 195px;
          `}
        />
      )}
    </React.Fragment>
  );
}

export default Channel;
