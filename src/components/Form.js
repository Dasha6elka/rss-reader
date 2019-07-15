/** @jsx jsx */

import { jsx } from "@emotion/core";
import useForm from "./useForm";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import { Button, createMuiTheme } from "@material-ui/core";
import { MuiThemeProvider } from "@material-ui/core/styles";


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

  const labelStyle = {
    color: "#fff"
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <FormControl fullWidth={true}>
        <InputLabel htmlFor="name" style={labelStyle}>
          Имя ленты
        </InputLabel>
        <Input
          type="text"
          name="name"
          id="name"
          onChange={handleOnChange}
          value={state.name.value}
          required
        />
        {state.name.error && <FormHelperText style={errorStyle}>{state.name.error}</FormHelperText>}
      </FormControl>
      <FormControl fullWidth={true}>
        <InputLabel htmlFor="link" style={labelStyle}>
          Ссылка на RRS
        </InputLabel>
        <Input
          type="text"
          name="link"
          id="link"
          onChange={handleOnChange}
          value={state.link.value}
          required
        />
        {state.link.error && <FormHelperText style={errorStyle}>{state.link.error}</FormHelperText>}
      </FormControl>
      <FormControl fullWidth={true}>
        <InputLabel htmlFor="category" style={labelStyle}>
          Категория
        </InputLabel>
        <Input
          type="text"
          name="category"
          id="category"
          onChange={handleOnChange}
          value={state.category.value}
          required
        />
        {state.category.error && <FormHelperText style={errorStyle}>{state.category.error}</FormHelperText>}
      </FormControl>
      <MuiThemeProvider theme={theme}>
        <Button
          style={buttonStyle}
          name="submit"
          disabled={disable}
          onClick={props.onClick}
          StyledButton
          type="submit"
          href=""
          variant="text"
          color="primary"
        >
          Добавить
        </Button>
      </MuiThemeProvider>
    </form>
  );
}

export default Form;
