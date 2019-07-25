/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import { Button } from "@material-ui/core";
import useForm from "../hooks/useForm";
import FormControl from "./FormControl";
import { useState } from "react";

function Form(props) {
  const stateSchema = {
    name: { value: "", error: "" },
    link: { value: "", error: "" }
  };

  const validationStateSchema = {
    name: {
      required: true,
      validator: {
        regEx: /^[\d\D]{1,40}$/,
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

  const { state, handleOnChange, handleOnSubmit, disable } = useForm(stateSchema, validationStateSchema);

  const [valuesForm, setValuesForm] = useState({ title: "", rssUrl: "", logoUrl: "", categoryId: 0 });

  const [selected, setSelected] = useState(false);

  function onChange(event, name) {
    name !== "category" && handleOnChange(event);
    if (name === "name") {
      valuesForm.title = event.target.value;
    }
    if (name === "link") {
      valuesForm.rssUrl = event.target.value;
    }
    if (name === "category") {
      setSelected(true);
      valuesForm.categoryId = event.target.value;
    }
    setValuesForm(valuesForm);
  }

  function onSubmit(event) {
    if (selected === true && props.categories.length !== 0) {
      handleOnSubmit(event);
      event.preventDefault(event);
      props.onSubmit(valuesForm);
    } else {
      event.preventDefault(event);
    }
  }

  return (
    <form>
      <FormControl
        firstControl={true}
        name="name"
        title="Имя ленты"
        value={state.name.value}
        error={state.name.error}
        onChange={event => onChange(event, "name")}
      />
      <FormControl
        name="link"
        title="Ссылка на RSS"
        value={state.link.value}
        error={state.link.error}
        onChange={event => onChange(event, "link")}
      />
      <FormControl
        select={true}
        name="category"
        title="Категория"
        onChange={event => onChange(event, "category")}
        categories={props.categories}
      />
      <Button
        css={css`
          padding: 6px 16px;
          background-color: #3ba5d1;
          color: white;
          text-align: center;
          width: 100%;
          margin-top: 16px;

          :hover {
            background-color: #49c8fc;
          }
        `}
        name="submit"
        disabled={disable}
        onClick={event => onSubmit(event)}
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
