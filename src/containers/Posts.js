/** @jsx jsx */

import { jsx } from "@emotion/core";
import { useContext, useState } from "react";
import Search from "../components/Search";
import Post from "../components/Post";
import { Grid } from "@material-ui/core";
import AppContext from "../context";
import Prompt from "../components/Prompt";

function Posts() {
  const context = useContext(AppContext);

  const [enter, setEnter] = useState(false);

  function onArrowClick(index) {
    context.posts[index].visited = true;
    context.posts[index].visible = !context.posts[index].visible;
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
    <Grid item sm={7}>
      <Search onSearchInputChange={value => onChangePostsList({ value })} />
      {context.activeChannel.length !== 0 ? (
        context.posts.map((post, index) => (
          <Post
            key={index}
            title={post.title}
            visible={post.visible}
            visited={post.visited}
            date={post.pubDate}
            found={post.found}
            description={post.content || post["content:encoded"] || post.description}
            onArrowClick={() => onArrowClick(index)}
            onInput={enter}
          />
        ))
      ) : (
        <Prompt
          text="Нажмите на ленту, чтобы появились посты"
          url="https://millionstatusov.ru/pic/statpic/all2/59187bb0e3f45.jpg"
          height="353px"
          width="628px"
        />
      )}
    </Grid>
  );
}

export default Posts;
