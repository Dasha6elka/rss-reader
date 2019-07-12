/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import { Input as MaterialInput } from "@material-ui/core";

function Input(props) {
  return (
    <MaterialInput
      value={props.value}
      onChange={props.onChange}
      css={css`
        font-size: 14px;
        line-height: 20px;
        margin-left: 24px;
        margin-bottom: 6px;
        border: none;
        border-radius: 2px;
        padding: 0 8px;
        max-height: 20px;
      `}
    />
  );
}

export default Input;
