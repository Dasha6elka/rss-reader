/** @jsx jsx */

import React from "react";
import { jsx, css } from "@emotion/core";
import { useState } from "react";
import { Edit, Delete } from "@material-ui/icons";
import { Button, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Input from "./Input";

function Channel(props) {
  const [isDelete, setIsDelete] = useState(false);
  const [error, setError] = useState([]);
  const [loadingLogoUrl, setLoadingLogoUrl] = useState(true);

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
      let isTitle, isLink;
      if (props.title) {
        isTitle = !props.title.match(/^[\d\D]{1,28}$/);
      }
      if (props.link) {
        isLink = !props.link.match(/(http|https):\/\/(\S+)\.([a-z]{2,}?)(.*?)( |,|$|\.)/);
      }
      if (isTitle === undefined) {
        isTitle = true;
      }
      if (isLink === undefined) {
        isLink = true;
      }
      if (error.length === 0) {
        setError([{ id: props.id, title: isTitle, link: isLink }]);
      }
      let newId = true;
      error.forEach(err => {
        if (err.id === props.id) {
          err.title = isTitle;
          err.link = isLink;
          newId = false;
          setError([...error]);
        }
      });
      if (newId) {
        error.push({ id: props.id, title: isTitle, link: isLink });
        setError([...error]);
      }
      let isError = false;
      console.log(error);
      error.forEach(err => {
        if (err.id === props.id) {
          if (err.title) {
            props.onSnackbarChange({ flag: true, message: "Невалидное название" });
            isError = true;
          } else if (err.link) {
            props.onSnackbarChange({ flag: true, message: "Невалидная ссылка" });
            isError = true;
          }
        }
      });
      if (isError) {
        return;
      }
      props.onEditFinish();
    }
  }

  function onClick() {
    if (!props.editable) {
      props.onChannelClick();
    }
  }

  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <Grid>
        <Grid
          container
          direction="row"
          onClick={onClick}
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
          <Grid container direction="column">
            <Grid container direction="row">
              <CircularProgress
                className="site-icon"
                css={css`
                  display: ${loadingLogoUrl ? "block" : "none"};
                `}
              />
              <img
                src={`${props.url}?v=${new Date().getTime()}`}
                alt=""
                className="site-icon"
                css={css`
                  display: ${loadingLogoUrl ? "none" : "block"};
                `}
                onLoad={() => {
                  setLoadingLogoUrl(false);
                }}
              />
              <ChannelTitle editable={props.editable} title={props.title} onChange={onTitleChange} />
            </Grid>
            <ChannelLink editable={props.editable} link={props.link} onChange={onLinkChange} />
          </Grid>
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
            wrap="nowrap"
            direction="row"
            justify="space-between"
            alignItems="center"
            css={css`
              padding: 16px 24px;
              border-bottom: 1px solid rgba(0, 0, 0, 0.12);

              .question {
                width: 100%;
              }
            `}
          >
            <Typography className="question">Удалить ленту?</Typography>
            <Grid
              item
              container
              direction="row"
              justify="flex-end"
              css={css`
                button {
                  color: #3ba5d1;
                }
              `}
            >
              <Grid>
                <Button variant="text" color="primary" onClick={onDeleteWindowChange}>
                  Да
                </Button>
              </Grid>
              <Grid>
                <Button variant="text" color="primary" onClick={onWindowChange}>
                  Нет
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </ClickAwayListener>
  );
}

function ChannelTitle(props) {
  return (
    <Grid
      css={css`
        margin-left: 8px;
      `}
    >
      {!props.editable ? (
        <Typography
          variant="body2"
          css={css`
            min-height: 20px;
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
            max-height: 20px;
            font-size: 14px;
          `}
        />
      )}
    </Grid>
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
            margin-left: 0.1px;
            max-width: 241px;
            text-overflow: ellipsis;
            overflow: hidden;
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
