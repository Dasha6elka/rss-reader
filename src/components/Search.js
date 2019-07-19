/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import { Search as SearchIcon } from "@material-ui/icons";
import Input from "./Input";

function Search(props) {
  function onInputChange(value) {
    props.onSearchInputChange(value);
  }

  return (
    <div
      css={css`
        position: relative;
        padding: 16px 16px 16px 48px;
        background: #f6f6f9;
        border-bottom: 1px solid rgba(0, 0, 0, 0.24);
      `}
    >
      <SearchIcon
        css={css`
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 16px;
        `}
      />
      <Input
        onChange={event => onInputChange(event.target.value.toLowerCase())}
        css={css`
          width: 100%;
          background: #f6f6f9;
          overflow: hidden;
          text-overflow: ellipsis;
        `}
      />
    </div>
  );
}

export default Search;
