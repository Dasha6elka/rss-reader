/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import { useState } from "react";
import Channel from "../components/Channel";

function Channels() {
  const [channels, setChannels] = useState([
    { title: "Habr", link: "https://habr.com/ru/", category: "Программирование", editable: false, active: true, url: "https://habr.com/images/logo.png" },
    { title: "Medium", link: "https://medium.com/", category: "Программирование", editable: false, active: false, url: ""}
  ]);

  function onChannelDelete(index) {
    if (channels[index].editable === true) {
      return;
    }
    channels.splice(index, 1);
    setChannels([...channels]);
  }

  function onChannelItemChange(event, index) {
    channels[index].editable = true;
    const name = event.target.name;
    name === "name" ? (channels[index].title = event.target.value) : (channels[index].link = event.target.value);
    setChannels([...channels]);
  }

  function onChannelItemEditFinish() {
    setChannels([...channels.map(channel => ({ ...channel, editable: false }))]);
  }

  function onEdit(index) {
    channels[index].editable = true;
    setChannels([...channels]);
  }

  return (
    <div
      css={css`
        background-color: #dae3e7;
        height: 100%;
      `}
    >
      {channels.map((channel, index) => (
        <Channel
          key={index}
          title={channel.title}
          link={channel.link}
          category={channel.category}
          editable={channel.editable}
          url={channel.url}
          active={channel.active}
          onDelete={() => onChannelDelete(index)}
          onChange={event => onChannelItemChange(event, index)}
          onEditFinish={onChannelItemEditFinish}
          onEditChannel={() => onEdit(index)}
        />
      ))}
    </div>
  );
}

export default Channels;
