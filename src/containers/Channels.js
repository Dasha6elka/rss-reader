/** @jsx jsx */

import { jsx } from "@emotion/core";
import React, { useContext } from "react";
import Channel from "../components/Channel";
import AppContext from "../context";
import Prompt from "../components/Prompt";

function Channels() {
  const context = useContext(AppContext);

  function onChannelDelete(index) {
    const channelToDelete = context.channels[index];
    context.categories.forEach(category => {
      if (category.id === channelToDelete.categoryId) {
        category.count--;
      }
    });
    if (context.activeChannel && channelToDelete.id === context.activeChannel.id) {
      context.onActiveChannelChange(null);
    }
    context.onChannelDelete(channelToDelete.id);
    context.channels.splice(index, 1);
  }

  function onTitleChange(index, event) {
    const channelToChange = context.channels[index];
    channelToChange.title = event.target.value;
    context.onChannelsChange([...context.channels]);
  }

  function onLinkChange(index, event) {
    const channelToChange = context.channels[index];
    channelToChange.rssUrl = event.target.value;
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

  function onClick(id, rssUrl) {
    context.channels.forEach(item => {
      if (item.id === id) {
        item.active = true;
      } else if (context.activeChannel && item.id === context.activeChannel.id) {
        item.active = false;
      }
    });
    context.onChannelsChange([...context.channels]);
    context.onActiveChannelChange({ id: id, rssUrl: rssUrl });
    context.onLoadingChange(true);
  }

  return (
    <React.Fragment>
      {context.activeCategory && context.activeCategory.count > 0 ? (
        context.channels.map((channel, index) => (
          <Channel
            key={index}
            title={channel.title}
            link={channel.rssUrl}
            editable={channel.editable}
            url={channel.logoUrl}
            active={channel.active}
            onDelete={() => onChannelDelete(index)}
            onTitleChange={event => onTitleChange(index, event)}
            onLinkChange={event => onLinkChange(index, event)}
            onEditFinish={() => onChannelItemEditFinish()}
            onEditChannel={() => onEdit(index)}
            onChannelClick={() => onClick(channel.id, channel.rssUrl)}
          />
        ))
      ) : (
        <React.Fragment>
          {context.activeCategory && context.activeCategory.count === 0 ? (
            <Prompt
              text="В категории нет лент"
              url="https://vk.com/images/stickers/6055/512.png"
              height="353px"
              width="282px"
            />
          ) : (
            <Prompt
              text="Нажмите на категорию, чтобы появились ленты"
              url="https://avatanplus.com/files/resources/mid/58e0ccb473a4915b2e1fa0fa.png"
              height="353px"
              width="282px"
            />
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default Channels;
