/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import { Input as MaterialInput } from "@material-ui/core";

function Input(props) {
  return (
    <MaterialInput
      autoFocus={props.autoFocus}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      css={css`
        :after {
          border-bottom: 2px solid #3ba5d1;
        }
      `}
      {...props}
    />
  );
}

export default Input;
