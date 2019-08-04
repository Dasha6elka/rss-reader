/** @jsx jsx */

import React from "react";
import { jsx } from "@emotion/core";
import { useContext, useState } from "react";
import Search from "../components/Search";
import Post from "../components/Post";
import AppContext from "../context";
import Prompt from "../components/Prompt";
import loading from "../img/loading.png";
import noPosts from "../img/noPosts.png";
import LinearDeterminate from "../components/LinearDeterminate";

function Posts() {
  const context = useContext(AppContext);

  const [enter, setEnter] = useState(false);

  function onArrowClick(index) {
    context.posts[index].visited = true;
    context.posts[index].expanded = !context.posts[index].expanded;
    context.setPosts([...context.posts]);
  }

  function onChangePostsList(value) {
    setEnter(value.value.length !== 0);
    context.posts.forEach((post, index) => change(post, index, value));
    context.setPosts([...context.posts]);
  }

  function change(post, index, value) {
    const title = (post.title && (post.title._text || post.title._cdata));
    const titleInLowerCase = title.toLowerCase();
    post.found = titleInLowerCase.includes(value.value);
  }

  return (
    <React.Fragment>
      <Search
        snackbar={context.onSnackbarChange}
        loadingPosts={context.loadingPosts}
        activeChannel={context.activeChannel}
        onSearchInputChange={value => onChangePostsList({ value })}
      />
      {context.loadingPosts ? (
        <React.Fragment>
          <LinearDeterminate /> <Prompt text="Идёт загрузка данных" url={loading} height="353px" width="331px" />
        </React.Fragment>
      ) : context.activeCategory && context.activeChannel && context.activeChannel.length !== 0 ? (
        context.posts &&
        context.posts.map((post, index) => (
          <Post
            key={index}
            title={post.title && (post.title._text || post.title._cdata)}
            expanded={post.expanded}
            visited={post.visited}
            date={post.pubDate && (post.pubDate._text || post.pubDate._cdata)}
            found={post.found}
            description={
              (post.content && (post.content._text || post.content._cdata)) ||
              (post["content:encoded"] && (post["content:encoded"]._cdata || post["content:encoded"]._text)) ||
              (post.description && (post.description._text || post.description._cdata))
            }
            onArrowClick={() => onArrowClick(index)}
            onInput={enter}
          />
        ))
      ) : (
        <Prompt text="Нажмите на ленту, чтобы появились посты" url={noPosts} height="353px" width="353px" />
      )}
    </React.Fragment>
  );
}

export default Posts;
