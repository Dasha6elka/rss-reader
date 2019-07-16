/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import useForm from "../hooks/useForm";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import { Button, createMuiTheme } from "@material-ui/core";
import { MuiThemeProvider } from "@material-ui/core/styles";
import Input from "./Input";

const theme = createMuiTheme({
  palette: {
    primary: { 500: "#3ba5d1" }
  }
});

function Form(props) {
  const stateSchema = {
    name: { value: "", error: "" },
    link: { value: "", error: "" },
    category: { value: "", error: "" }
  };

  const validationStateSchema = {
    name: {
      required: true,
      validator: {
        regEx: /^[а-яА-Яa-zA-Z]+$/,
        error: "Невалидное имя ленты."
      }
    },
    link: {
      required: true,
      validator: {
        regEx: /(http|https):\/\/(\S+)\.([a-z]{2,}?)(.*?)( |,|$|\.)/,
        error: "Невалидная ссылка."
      }
    },
    category: {
      required: true,
      validator: {
        regEx: /^[а-яА-Яa-zA-Z]+$/,
        error: "Невалидная категория."
      }
    }
  };

  function onSubmitForm(state) {
    alert(JSON.stringify(state, null, 2));
  }

  const { state, handleOnChange, handleOnSubmit, disable } = useForm(stateSchema, validationStateSchema, onSubmitForm);

  const errorStyle = {
    color: "darkred",
    fontSize: "12px",
    lineHeight: "16px",
    margin: "6px 0"
  };

  const buttonStyle = {
    textAlight: "center",
    width: "100%",
    marginTop: "16px"
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <FormControl fullWidth={true}>
        <InputLabel
          css={css`
            color: white !important;
          `}
          htmlFor="name"
        >
          Имя ленты
        </InputLabel>
        <Input
          type="text"
          name="name"
          autoComplete="off"
          id="name"
          onChange={handleOnChange}
          value={state.name.value}
          required
          css={css`
            margin-left: 0;
            margin-bottom: 0;
            color: white;

            :hover:before {
              border-bottom: 2px solid white !important;
            }
          `}
        />
        {state.name.error && <FormHelperText style={errorStyle}>{state.name.error}</FormHelperText>}
      </FormControl>
      <FormControl
        fullWidth={true}
        css={css`
          margin-top: 16px !important;
        `}
      >
        <InputLabel
          htmlFor="link"
          css={css`
            color: white !important;
          `}
        >
          Ссылка на RRS
        </InputLabel>
        <Input
          type="text"
          name="link"
          autoComplete="off"
          id="link"
          onChange={handleOnChange}
          value={state.link.value}
          required
          css={css`
            margin-left: 0;
            margin-bottom: 0;
            color: white;

            :hover:before {
              border-bottom: 2px solid white !important;
            }
          `}
        />
        {state.link.error && <FormHelperText style={errorStyle}>{state.link.error}</FormHelperText>}
      </FormControl>
      <FormControl
        fullWidth={true}
        css={css`
          margin-top: 16px !important;
        `}
      >
        <InputLabel
          htmlFor="category"
          css={css`
            color: white !important;
          `}
        >
          Категория
        </InputLabel>
        <Input
          type="text"
          name="category"
          autoComplete="off"
          id="category"
          onChange={handleOnChange}
          value={state.category.value}
          required
          css={css`
            margin-left: 0;
            margin-bottom: 0;
            color: white;

            :hover:before {
              border-bottom: 2px solid white !important;
            }
          `}
        />
        {state.category.error && <FormHelperText style={errorStyle}>{state.category.error}</FormHelperText>}
      </FormControl>
      <MuiThemeProvider theme={theme}>
        <Button
          css={css`
            :disabled {
              color: #3ba5d1;
              background-color: rgba(59, 165, 209, 0.08);
            }
          `}
          style={buttonStyle}
          name="submit"
          disabled={disable}
          onClick={props.onClick}
          type="submit"
          href=""
          variant="text"
          color="primary"
          classes={{ disabled: "disabled" }}
        >
          Добавить
        </Button>
      </MuiThemeProvider>
    </form>
  );
}

export default Form;
