/** @jsx jsx */

import { jsx, css } from "@emotion/core";

function withFullHeight(Component) {
  return function WithFullHeight({ children, ...props }) {
    return (
      <Component
        css={css`
          height: 100%;
        `}
        {...props}
      >
        {children}
      </Component>
    );
  };
}

export default withFullHeight;
