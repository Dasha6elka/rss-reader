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
        />
      ))}
    </div>
  );
}

export default Channels;
