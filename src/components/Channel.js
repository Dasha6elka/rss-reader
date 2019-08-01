/** @jsx jsx */

import React from "react";
import { jsx, css } from "@emotion/core";
import { useState } from "react";
import { Edit, Delete } from "@material-ui/icons";
import Input from "./Input";
import { Button, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

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

  function onClickAway() {
    if (props.editable) {
      props.onEditFinish();
    }
  }

  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <Grid>
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

            .site-icon {
              height: 16px !important;
              width: 16px !important;
            }

            &:hover {
              cursor: pointer;
              background: #cad7dd;

              .icons {
                display: block;
                position: absolute;
                right: 16px;
                top: 50%;
                transform: translateY(-50%);
              }
            }
          `}
        >
          <Grid container direction="row">
            <CircularProgress
              className="site-icon"
              css={css`
                display: ${props.loadingLogoUrl ? "block" : "none"};
              `}
            />
            <img
              src={props.url}
              alt=""
              className="site-icon"
              css={css`
                display: ${props.loadingLogoUrl ? "none" : "block"};
              `}
              onLoad={() => props.onLoadingLogoUrlChange(false)}
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
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
        {isDelete && (
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            css={css`
              padding: 16px 24px;
              border-bottom: 1px solid rgba(0, 0, 0, 0.12);
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
      </Grid>
    </ClickAwayListener>
  );
}

function ChannelTitle(props) {
  return (
    <React.Fragment>
      {!props.editable ? (
        <Typography
          variant="body2"
          css={css`
            min-height: 20px;
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
          variant="caption"
          css={css`
            color: rgba(0, 0, 0, 0.539261);
            min-height: 20px;
            margin-left: 0.1px;
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
