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
    const title = post.title.toLowerCase();
    post.found = title.includes(value.value);
  }

  return (
    <React.Fragment>
      <Search
        snackbar={context.onDisabledInputClick}
        activeChannel={context.activeChannel}
        onSearchInputChange={value => onChangePostsList({ value })}
      />
      {context.loadingPosts ? (
        <Prompt text="Идёт загрузка данных" url={loading} height="353px" width="331px" />
      ) : context.activeCategory && context.activeChannel && context.activeChannel.length !== 0 ? (
        context.posts.map((post, index) => (
          <Post
            key={index}
            title={post.title}
            expanded={post.expanded}
            visited={post.visited}
            date={post.pubDate}
            found={post.found}
            description={post.content || post["content:encoded"] || post.description}
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
