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

function App() {
  const [categories, setCategories] = useState([]);

  const [channels, setChannels] = useState([]);

  const [activeCategory, setActiveCategory] = useState(0);

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
    addChannel(channels[channels.length - 1])
      .then(() => getChannels())
      .then(json => setChannels(json.channels))
      .catch(console.error);
  }

  function onChannelsEditFinish(channels) {

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
      .then(() => getChannels())
      .then(json => setChannels(json.channels))
      .catch(console.error);
  }

  useEffect(() => {
    getCategories()
      .then(json => setCategories(json.categories))
      .catch(console.error);
  }, []);

  useEffect(() => {
    getChannels(activeCategory)
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
        setActiveChannel
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
