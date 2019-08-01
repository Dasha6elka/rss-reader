/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import { Search as SearchIcon } from "@material-ui/icons";
import { Grid, InputAdornment, TextField } from "@material-ui/core";

function Search(props) {
  function onInputChange(value) {
    props.onSearchInputChange(value);
  }

  function onDisabledInputClick() {
    if (!props.activeChannel) {
      props.snackbar({ flag: true, message: "Выберите ленту" });
    }
  }

  return (
    <Grid
      css={css`
        padding: 8px 16px;
        background: #f6f6f9;
        border-bottom: 1px solid rgba(0, 0, 0, 0.24);
      `}
    >
      <TextField
        css={css`
          .MuiInput-underline:after {
            border-bottom: 2px solid #3ba5d1;
          }
        `}
        fullWidth
        onClick={onDisabledInputClick}
        disabled={!props.activeChannel}
        placeholder="Поиск по названиям постов"
        onChange={event => onInputChange(event.target.value.toLowerCase())}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon
                css={css`
                  opacity: 0.54;
                `}
              />
            </InputAdornment>
          )
        }}
      />
    </Grid>
  );
}

export default Search;
