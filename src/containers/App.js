/** @jsx jsx */

import { jsx, css, Global } from "@emotion/core";
import React from "react";
import Sidebar from "./Sidebar";
import Channels from "./Channels";
import Posts from "./Posts";

function App() {
  return (
    <React.Fragment>
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
      <div
        css={css`
          height: 100%;
          display: grid;
          grid-template-columns: minmax(240px, 1fr) minmax(320px, 1.5fr) 6fr;
        `}
      >
        <Sidebar />
        <Channels />
        <Posts />
      </div>
    </React.Fragment>
  );
}

export default App;
