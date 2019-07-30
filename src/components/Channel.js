/** @jsx jsx */

import React from "react";
import { jsx, css } from "@emotion/core";
import { useEffect, useState } from "react";
import { Edit, Delete } from "@material-ui/icons";
import Input from "./Input";
import { Button, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";

function Channel(props) {
  const [isDelete, setIsDelete] = useState(false);

  function onDeleteWindowChange() {
    setIsDelete(!isDelete);
    props.onDelete();
  }

  function onWindowChange() {
    setIsDelete(!isDelete);
  }

  function onTitleChange(event) {
    props.onTitleChange(event);
  }

  function onLinkChange(event) {
    props.onLinkChange(event);
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
    <React.Fragment>
      <Grid
        onClick={props.onChannelClick}
        css={css`
          padding: 16px 24px;
          border-bottom: ${!isDelete && "1px solid rgba(0, 0, 0, 0.12)"};
          position: relative;
          background: ${props.active && "#B2C4CD"};

          .icons {
            display: none;
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
          <ChannelTitle editable={props.editable} title={props.title} onChange={onTitleChange} />
        </Grid>
        <ChannelLink editable={props.editable} link={props.link} onChange={onLinkChange} />
        <Grid className="icons" onClick={event => event.stopPropagation()}>
          {!props.editable && (
            <IconButton onClick={props.onEditChannel}>
              <Edit />
            </IconButton>
          )}
          <IconButton onClick={onWindowChange}>
            <Delete className="trash-icon" />
          </IconButton>
        </Grid>
      </Grid>
      {isDelete && (
        <Grid
          container
          direction="row"
          justify="space-between"
          css={css`
            padding: 16px 24px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.12);
            align-items: center;
          `}
        >
          <Typography>Удалить ленту?</Typography>
          <Grid
            container
            direction="row"
            justify="flex-end"
            css={css`
              width: auto;

              button {
                color: #3ba5d1;
              }
            `}
          >
            <Button href="" variant="text" color="primary" onClick={onDeleteWindowChange}>
              Да
            </Button>
            <Button href="" variant="text" color="primary" onClick={onWindowChange}>
              Нет
            </Button>
          </Grid>
        </Grid>
      )}
    </React.Fragment>
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
