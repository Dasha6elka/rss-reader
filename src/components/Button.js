/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import PropTypes from "proptypes";

function Button(props) {
  return (
    <button
      css={css`
        text-transform: uppercase;
        background: #3ba5d1;
        color: white;
        border: none;
        font-size: 14px;
        text-align: center;
        line-height: 16px;
        padding: 8px 16px;
        border-radius: 2px;
        cursor: pointer;

        &:hover {
          background-color: #3bc0d1;
        }
      `}
      {...props}
    >
      {props.title}
    </button>
  );
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default Button;
