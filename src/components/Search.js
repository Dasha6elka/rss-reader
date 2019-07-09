/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import SearchIcon from "../icons/SearchIcon";

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
        transition: box-shadow 0.3s ease-in-out;
        border-bottom: 1px solid rgba(0, 0, 0, 0.24);

        &:hover {
          box-shadow: 0 2px 2px rgba(0, 0, 0, 0.24), 0 0 2px rgba(0, 0, 0, 0.12);
        }
      `}
    >
      <SearchIcon
        css={css`
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 16px;
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
        `}
      />
      <input
        type="text"
        onChange={event => onInputChange(event.target.value.toLowerCase())}
        css={css`
          width: 100%;
          border: none;
          background: #f6f6f9;
          outline: none;
          overflow: hidden;
          text-overflow: ellipsis;
        `}
      />
    </div>
  );
}

export default Search;
