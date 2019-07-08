/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import { useState } from "react";
import Channel from "../components/Channel";

function Channels() {
  const [channels, setChannels] = useState([
    { title: "Habr", link: "https://habr.com/ru/", category: "Программирование" },
    { title: "Medium", link: "https://medium.com/", category: "Программирование" }
  ]);

  function onChannelDelete(index) {
    channels.splice(index, 1);
    setChannels([...channels]);
  }

  function onChannelItemChange(event, index) {
    const name = event.target.name;
    {
      name === "name" ? (channels[index].title = event.target.value) : (channels[index].link = event.target.value);
    }
    setChannels([...channels]);
  }

  function onChannelItemEditFinish() {
    setChannels([...channels.map(channel => ({ ...channel }))]);
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
          onDelete={() => onChannelDelete(index)}
          onChange={event => onChannelItemChange(event, index)}
          onEditFinish={onChannelItemEditFinish}
        />
      ))}
    </div>
  );
}

export default Channels;
