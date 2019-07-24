/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import Typography from "@material-ui/core/Typography";

function ErrorMessage(props) {
  return (
    <Typography
      css={css`
        display: ${props.errorMessage ? "block" : "none"};
        font-size: 12px;
        line-height: 16px;
        padding: 4px 8px 4px 16px;
        color: darkred;
      `}
    >
      Нельзя удалить категорию с ненулевым количеством лент
    </Typography>
  );
}

export default ErrorMessage;