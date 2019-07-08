/** @jsx jsx */

import { jsx } from "@emotion/core";

function SearchIcon(props) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        opacity="0.54"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.3896 14H14.6489L14.3914 13.726C15.301 12.589 15.8542 11.115 15.8542 9.5C15.8542 5.91 13.1394 3 9.79009 3C6.44082 3 3.72595 5.91 3.72595 9.5C3.72595 13.09 6.44082 16 9.79009 16C11.2968 16 12.671 15.408 13.7318 14.434L13.9893 14.708V15.5L18.6521 20.491L20.0432 19L15.3896 14ZM9.79009 14C7.47079 14 5.59184 11.986 5.59184 9.5C5.59184 7.015 7.47079 5 9.79009 5C12.1085 5 13.9883 7.015 13.9883 9.5C13.9883 11.986 12.1085 14 9.79009 14Z"
        fill="black"
      />
    </svg>
  );
}

export default SearchIcon;
