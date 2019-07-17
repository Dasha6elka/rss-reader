/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import { Button } from "@material-ui/core";
import useForm from "../hooks/useForm";
import FormControl from "./FormControl";

function Form(props) {
  const stateSchema = {
    name: { value: "", error: "" },
    link: { value: "", error: "" }
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
    }
  };

  function onSubmitForm(state) {
    alert(JSON.stringify(state, null, 2));
  }

  const { state, handleOnChange, handleOnSubmit, disable } = useForm(stateSchema, validationStateSchema, onSubmitForm);

  const buttonStyle = {
    textAlight: "center",
    width: "100%",
    marginTop: "16px"
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <FormControl
        firstControl={true}
        name={"name"}
        title="Имя ленты"
        value={state.name.value}
        error={state.name.error}
        onChange={handleOnChange}
      />
      <FormControl
        name={"link"}
        title="Ссылка на RSS"
        value={state.link.value}
        error={state.link.error}
        onChange={handleOnChange}
      />
      <FormControl
        select={true}
        name={"link"}
        title="Ссылка на RSS"
        onChange={handleOnChange}
      />
      <Button
        css={css`
          color: #3ba5d1;

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
    </form>
  );
}

export default Form;
