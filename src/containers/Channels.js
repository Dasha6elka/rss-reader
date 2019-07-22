/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import { useContext } from "react";
import Channel from "../components/Channel";
import Grid from "@material-ui/core/Grid";
import AppContext from "../context";

function Channels() {
  const context = useContext(AppContext);

  function onChannelDelete(index, id) {
    if (context.channels[index].editable === true) {
      return;
    }
    context.onChannelDelete(id);
    context.channels.splice(index, 1);
    context.onChannelsChange([...context.channels]);
  }

  function onChannelItemChange(event, index) {
    context.channels[index].editable = true;
    if (event.target.name === "title") {
      context.channels[index].title = event.target.value;
    } else {
      context.channels[index].rssUrl = event.target.value;
    }
    context.onChannelsChange([...context.channels]);
  }

  function onChannelItemEditFinish(id) {
    context.onChannelsChange(context.channels.map(channel => ({ ...channel, editable: false })));
    context.onChannelsEditFinish(id);
  }

  function onEdit(index) {
    context.channels[index].editable = true;
    context.onChannelsChange([...context.channels]);
  }

  function onClick(id,rss_url) {
    context.channels.forEach(item => {
      if (item.id === id) {
        item.active = true;
      }
      if (item.id === context.activeChannel.id) {
        item.active = false;
      }
    });
    context.onChannelsChange([...context.channels]);
    context.setActiveChannel({id: id, rss_url: rss_url});
  }

  return (
    <Grid item sm={3}
      css={css`
        background-color: #dae3e7;
      `}
    >
      {context.channels.map((channel, index) => (
        <Channel
          key={index}
          title={channel.title}
          link={channel.rss_url}
          editable={channel.editable}
          url={channel.logo_url}
          active={channel.active}
          onDelete={() => onChannelDelete(index, channel.id)}
          onChange={event => onChannelItemChange(event, index)}
          onEditFinish={() => onChannelItemEditFinish(channel.id)}
          onEditChannel={() => onEdit(index)}
          onChannelClick={() => onClick(channel.id, channel.rss_url)}
        />
      ))}
    </Grid>
  );
}

export default Channels;
