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
import { Grid, Snackbar } from "@material-ui/core";
import updateChannel from "../api/updateChannel";
import transformChannelToCamelCase from "../helpers/transformChannelToCamelCase";
import { CORS_PROXY } from "../constants";
import Overflowable from "../components/Overflowable";
import withFullHeight from "../HoCs/withFullHeight";
import getLogoUrl from "../api/getLogoUrl";

const Parser = require("rss-parser");
const parser = new Parser();

const GridWithFullHeight = withFullHeight(Grid);

function App() {
  const [categories, setCategories] = useState([]);
  const [channels, setChannels] = useState([]);
  const [posts, setPosts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeChannel, setActiveChannel] = useState(null);
  const [snackbar, setSnackbar] = useState({ flag: false, message: "" });
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [error, setError] = useState([]);
  const [loadingLogoUrl, setLoadingLogoUrl] = useState(true);

  function onErrorChange(change) {
    setError(change);
  }

  function onLoadingLogoUrlChange(change) {
    setLoadingLogoUrl(change);
  }

  function onLoadingPostsChange(change) {
    setLoadingPosts(change);
  }

  function onDisabledInputClick(change) {
    setSnackbar(change);
  }

  function onCategoriesChange(change) {
    setCategories(change);
  }

  function onChannelsChange(change) {
    setChannels(change);
  }

  function onActiveCategoryChange(change) {
    setActiveCategory(change);
  }

  function onActiveChannelChange(change) {
    setActiveChannel(change);
  }

  function onCategoryAdd(categories) {
    setCategories(categories);
    addCategory(categories[categories.length - 1])
      .then(() => getCategories())
      .then(json => {
        json.categories[json.categories.length - 1].active = true;
        setCategories(json.categories);
        setActiveCategory(json.categories[json.categories.length - 1]);
        setActiveChannel(null);
      })
      .catch(console.error);
  }

  function onChannelAdd(channels) {
    const lastChannel = channels[channels.length - 1];
    if (activeCategory && lastChannel.categoryId === activeCategory.id) {
      onLoadingLogoUrlChange(true);
      setChannels([...channels]);
    }
    getLogoUrl(encodeURIComponent(lastChannel.rssUrl)).then(json => {
      lastChannel.logoUrl = json;
      addChannel(lastChannel)
        .then(() => getChannels(activeCategory && activeCategory.id))
        .then(json => setChannels(json.channels.map(transformChannelToCamelCase)))
        .catch(console.error);
    });
  }

  function onChannelsEditFinish(channelId) {
    let isValid = true;
    channels.forEach(channel => {
      if (channel.id === channelId) {
        error.forEach(err => {
          if ((err.id === channelId && err.title) || err.link) {
            isValid = false;
          }
        });
      }
    });
    if (!isValid) {
      return;
    }
    channels.forEach(channel => {
      if (channel.id === channelId) {
        getLogoUrl(encodeURIComponent(channel.rssUrl)).then(json => {
          let item = {
            title: channel.title,
            rssUrl: channel.rssUrl,
            logoUrl: json,
            categoryId: channel.categoryId
          };
          updateChannel(item, channelId)
            .then(() => getChannels(channel.categoryId))
            .then(json => {
              setChannels(
                json.channels.map(channel => ({
                  ...transformChannelToCamelCase(channel, activeChannel && activeChannel.id)
                }))
              );
              if (activeChannel.id === channel.id) {
                parser
                  .parseURL(CORS_PROXY + channel.rssUrl)
                  .then(feed => {
                    setPosts(feed.items);
                    setLoadingPosts(false);
                  })
                  .catch(console.error);
              }
            })
            .catch(console.error);
        });
      }
    });
  }

  function onCategoryDelete(categoryId) {
    deleteCategory(categoryId)
      .then(() => getCategories())
      .then(json =>
        setCategories(
          json.categories.map(category => ({
            ...category,
            active: activeCategory && category.id === activeCategory.id
          }))
        )
      )
      .catch(console.error);
  }

  function onChannelDelete(channelId) {
    deleteChannel(channelId)
      .then(() => getChannels(activeCategory.id))
      .then(json => setChannels(json.channels.map(transformChannelToCamelCase)))
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
      .then(json => {
        setChannels(json.channels.map(transformChannelToCamelCase));
      })
      .catch(console.error);
  }, [activeCategory]);

  useEffect(() => {
    if (!activeChannel || !activeChannel.rssUrl) {
      return;
    }
    let isError = false;
    error.forEach(err => {
      if (err.id === activeChannel.id) {
        if (err.title) {
          setSnackbar({ flag: true, message: "Невалидное имя ленты" });
          isError = true;
        } else if (err.link) {
          setSnackbar({ flag: true, message: "Невалидная ссылка" });
          isError = true;
        } else if (err.title && err.link) {
          setSnackbar({ flag: true, message: "Невалидные значения ленты" });
          isError = true;
        }
      }
    });
    if (isError) {
      return;
    }
    parser
      .parseURL(CORS_PROXY + activeChannel.rssUrl)
      .then(feed => {
        setPosts(feed.items);
        setLoadingPosts(false);
      })
      .catch(console.error);
  }, [activeChannel]);

  return (
    <AppContext.Provider
      value={{
        categories,
        onCategoriesChange,
        onCategoryAdd,
        onCategoryDelete,
        channels,
        onChannelsChange,
        onChannelAdd,
        onChannelsEditFinish,
        onChannelDelete,
        posts,
        setPosts,
        activeCategory,
        activeChannel,
        onActiveCategoryChange,
        onActiveChannelChange,
        onDisabledInputClick,
        loadingPosts,
        onLoadingPostsChange,
        error,
        onErrorChange,
        loadingLogoUrl,
        onLoadingLogoUrlChange
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
        <GridWithFullHeight
          item
          xs={2}
          css={css`
            background-color: #1d2027;
            color: white;
          `}
        >
          <Overflowable>
            <Sidebar />
          </Overflowable>
        </GridWithFullHeight>
        <GridWithFullHeight
          item
          sm={3}
          css={css`
            background-color: #dae3e7;
          `}
        >
          <Overflowable>
            <Channels />
          </Overflowable>
        </GridWithFullHeight>
        <GridWithFullHeight item sm={7}>
          <Overflowable>
            <Posts />
          </Overflowable>
        </GridWithFullHeight>
      </Grid>
      <Snackbar
        message={snackbar && snackbar.message}
        open={snackbar && snackbar.flag}
        onClose={() => setSnackbar({ flag: false, message: "" })}
        autoHideDuration={3000}
      />
    </AppContext.Provider>
  );
}

export default App;
