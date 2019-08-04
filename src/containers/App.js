/** @jsx jsx */

import { css, Global, jsx } from "@emotion/core";
import { useEffect, useState } from "react";
import { Grid, Snackbar } from "@material-ui/core";
import AppContext from "../context";
import Sidebar from "./Sidebar";
import Channels from "./Channels";
import Posts from "./Posts";
import getCategories from "../api/getCategories";
import addCategory from "../api/addCategory";
import deleteCategory from "../api/deleteCategory";
import getChannels from "../api/getChannels";
import addChannel from "../api/addChannel";
import deleteChannel from "../api/deleteChannel";
import updateChannel from "../api/updateChannel";
import transformChannelToCamelCase from "../helpers/transformChannelToCamelCase";
import Overflowable from "../components/Overflowable";
import withFullHeight from "../HoCs/withFullHeight";
import getLogoUrl from "../api/getLogoUrl";
import getPosts from "../api/getPosts";

const convert = require("xml-js");

const GridWithFullHeight = withFullHeight(Grid);

function App() {
  const [categories, setCategories] = useState([]);
  const [channels, setChannels] = useState([]);
  const [posts, setPosts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeChannel, setActiveChannel] = useState(null);
  const [snackbar, setSnackbar] = useState({ flag: false, message: "" });
  const [loadingPosts, setLoadingPosts] = useState(false);

  function onLoadingPostsChange(change) {
    setLoadingPosts(change);
  }

  function onSnackbarChange(change) {
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
              if (activeChannel && activeChannel.id === channel.id) {
                getPosts(encodeURIComponent(channel.rssUrl))
                  .then(xml => {
                    const result = convert.xml2js(xml, { compact: true, spaces: 4 });
                    check(result);
                    setLoadingPosts(false);
                  })
                  .catch(() => {
                    setSnackbar({ flag: true, message: "Невалидная ссылка" });
                    console.log("Error");
                  });
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
    setPosts([]);
    if (!activeChannel || !activeChannel.rssUrl) {
      return;
    }
    getPosts(encodeURIComponent(activeChannel.rssUrl))
      .then(xml => {
        const result = convert.xml2js(xml, { compact: true, spaces: 4 });
        check(result);
        setLoadingPosts(false);
      })
      .catch(() => {
        setSnackbar({ flag: true, message: "Невалидная ссылка" });
        console.log("Error");
      });
  }, [activeChannel]);

  function check(result) {
    const rss = result.rss && result.rss.channel && result.rss.channel.item && Array.isArray(result.rss.channel.item);
    const rdf = result["rdf:RDF"] && result["rdf:RDF"].item && Array.isArray(result["rdf:RDF"].item);
    if (rss) {
      setPosts(result.rss.channel.item);
    } else if (rdf) {
      setPosts(result["rdf:RDF"].item);
    }
  }

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
        onLoadingPostsChange,
        loadingPosts,
        onSnackbarChange
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
