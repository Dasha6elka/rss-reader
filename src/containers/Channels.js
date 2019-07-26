/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import React, { useContext } from "react";
import Channel from "../components/Channel";
import Grid from "@material-ui/core/Grid";
import AppContext from "../context";
import Prompt from "../components/Prompt";

function Channels() {
  const context = useContext(AppContext);

  function onChannelDelete(index, id) {
    if (context.channels[index].editable === true) {
      return;
    }
    context.categories.forEach(category => {
      if (category.id === context.channels[index].id_category) {
        category.count--;
      }
    });
    if (context.activeChannel && id === context.activeChannel.id) {
      context.onActiveChannelChange(null);
    }
    context.onChannelDelete(id);
    context.channels.splice(index, 1);
    context.onChannelsChange([...context.channels]);
  }

  function onChannelItemChange(event, index) {
    context.channels[index].editable = true;
    if (event.target.name === "title") {
      context.channels[index].title = event.target.value;
    }
    if (event.target.name === "link") {
      context.channels[index].rss_url = event.target.value;
    }
    context.onChannelsChange([...context.channels]);
  }

  function onChannelItemEditFinish() {
    context.onChannelsChange(context.channels.map(channel => ({ ...channel, editable: false })));
    context.channels.forEach(channel => {
      if (channel.editable) {
        context.onChannelsEditFinish(channel.id);
      }
    });
  }

  function onEdit(index) {
    context.channels[index].editable = true;
    context.onChannelsChange([...context.channels]);
  }

  function onClick(id, rss_url) {
    context.channels.forEach(item => {
      if (item.id === id) {
        item.active = true;
      }
      if (context.activeChannel && item.id === context.activeChannel.id && item.id !== id) {
        item.active = false;
      }
    });
    context.onChannelsChange([...context.channels]);
    context.onActiveChannelChange({ id: id, rss_url: rss_url });
  }

  return (
    <Grid
      item
      sm={3}
      css={css`
        background-color: #dae3e7;
      `}
    >
      {context.activeCategory && context.activeCategory.count > 0 ? (
        context.channels.map((channel, index) => (
          <Channel
            key={index}
            title={channel.title}
            link={channel.rss_url || channel.rssUrl}
            editable={channel.editable}
            url={channel.logo_url || channel.logoUrl}
            active={channel.active}
            onDelete={() => onChannelDelete(index, channel.id)}
            onChange={event => onChannelItemChange(event, index)}
            onEditFinish={() => onChannelItemEditFinish()}
            onEditChannel={() => onEdit(index)}
            onChannelClick={() => onClick(channel.id, channel.rss_url)}
          />
        ))
      ) : (
        <React.Fragment>
          {context.activeCategory && context.activeCategory.count === 0 ? (
            <Prompt
              text="В категории нет лент"
              url="https://pp.userapi.com/c849032/v849032376/11dc50/Er3YfHV1QKA.jpg"
              height="353px"
              width="300px"
            />
          ) : (
            <Prompt
              text="Нажмите на категорию, чтобы появились ленты"
              url="https://zabavnik.club/wp-content/uploads/2018/07/Kartinki_pro_ozhidanie_3_13040747.jpg"
              height="353px"
              width="282px"
            />
          )}
        </React.Fragment>
      )}
    </Grid>
  );
}

export default Channels;
