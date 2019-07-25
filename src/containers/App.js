/** @jsx jsx */

import { css, Global, jsx } from "@emotion/core";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Channels from "./Channels";
import Posts from "./Posts";
import getCategories from "../api/getCategories";
import AppContext from "../context";
import addCategory from "../api/addCategory";
import deleteCategory from "../api/deleteCategory";
import getChannels from "../api/getChannels";
import addChannel from "../api/addChannel";
import deleteChannel from "../api/deleteChannel";
import { Grid } from "@material-ui/core";
import updateChannel from "../api/updateChannel";

const Parser = require("rss-parser");
const parser = new Parser();
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

function App() {
  const [categories, setCategories] = useState([]);
  const [channels, setChannels] = useState([]);
  const [posts, setPosts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeChannel, setActiveChannel] = useState([]);

  function onCategoriesChange(change) {
    setCategories(change);
  }

  function onChannelsChange(change) {
    setChannels(change);
  }

  function onCategoriesFinish(categories) {
    setCategories(categories);
    addCategory(categories[categories.length - 1])
      .then(() => getCategories())
      .then(json => setCategories(json.categories))
      .catch(console.error);
  }

  function onChannelFinish(channels) {
    setChannels(channels);
    parser.parseURL(CORS_PROXY + channels[channels.length - 1].rssUrl).then(feed => {
      channels[channels.length - 1].logoUrl = feed.image.url;
      addChannel(channels[channels.length - 1])
        .then(() => getChannels())
        .then(json => setChannels(json.channels))
        .catch(console.error);
    });
  }

  function onChannelsEditFinish(channel_id) {
    setChannels(channels);
    channels.forEach(channel => {
      parser.parseURL(CORS_PROXY + channel.rss_url).then(feed => {
        if (channel.id === channel_id) {
          let item = {
            title: channel.title,
            rssUrl: channel.rss_url,
            logoUrl: feed.image.url,
            categoryId: channel.id_category
          };
          updateChannel(item, channel_id)
            .then(() => getChannels(channel.id_category))
            .then(json => setChannels(json.channels))
            .catch(console.error);
        }
      });
    });
  }

  function onCategoryDelete(categories, category_id) {
    setCategories(categories);
    deleteCategory(category_id)
      .then(() => getCategories())
      .then(json => setCategories(json.categories))
      .catch(console.error);
  }

  function onChannelDelete(channel_id) {
    setChannels(channels);
    deleteChannel(channel_id)
      .then(() => getChannels(activeCategory.id))
      .then(json => setChannels(json.channels))
      .catch(console.error);
  }

  useEffect(() => {
    getCategories()
      .then(json => setCategories(json.categories))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!activeCategory) {
      return;
    }
    getChannels(activeCategory.id)
      .then(json =>
        setChannels(
          json.channels.map(channel => ({
            ...channel,
            editable: false,
            active: false
          }))
        )
      )
      .catch(console.error);
  }, [activeCategory]);

  useEffect(() => {
    if (!activeChannel.rss_url) {
      return;
    }
    parser
      .parseURL(CORS_PROXY + activeChannel.rss_url)
      .then(feed => setPosts(feed.items))
      .catch(console.error);
  }, [activeChannel]);

  return (
    <AppContext.Provider
      value={{
        categories,
        onCategoriesChange,
        onCategoriesFinish,
        onCategoryDelete,
        channels,
        onChannelsChange,
        onChannelFinish,
        onChannelsEditFinish,
        onChannelDelete,
        activeCategory,
        setActiveCategory,
        activeChannel,
        setActiveChannel,
        posts,
        setPosts
      }}
    >
      <Global
        styles={css`
          html,
          body,
          #root {
            width: 100%;
            height: 100%;
          }

          html {
            font-family: "Roboto", sans-serif;
          }
        `}
      />
      <Grid
        container
        direction="row"
        alignItems="stretch"
        css={css`
          height: 100vh;
        `}
      >
        <Sidebar />
        <Channels />
        <Posts />
      </Grid>
    </AppContext.Provider>
  );
}

export default App;
