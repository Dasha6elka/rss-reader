/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import useForm from "./useForm";
import Button from "./Button";

function Form(props) {

  const stateSchema = {
    name: { value: '', error: '' },
    link: { value: '', error: '' },
    category: { value: '', error: '' },
  };

  const validationStateSchema = {
    name: {
      required: true,
      validator: {
        regEx: /^[а-яА-Яa-zA-Z]+$/,
        error: 'Invalid name format.',
      },
    },
    link: {
      required: true,
      validator: {
        regEx: /(http|https):\/\/(\S+)\.([a-z]{2,}?)(.*?)( |\,|$|\.)/,
        error: 'Invalid link format.',
      },
    },
    category: {
      required: true,
      validator: {
        regEx: /^[а-яА-Яa-zA-Z]+$/,
        error: 'Invalid category format.',
      },
    },
  };

  function onSubmitForm(state) {
    alert(JSON.stringify(state, null, 2));
  }

  const { state, handleOnChange, handleOnSubmit, disable } = useForm(
    stateSchema,
    validationStateSchema,
    onSubmitForm
  );


  const errorStyle = {
    color: 'darkred',
    fontSize: '12px',
    lineHeight: '16px',
    margin: "6px 0"
  };

  return (
    <form
      onSubmit={handleOnSubmit}
      css={css`
        width: 100%;
        display: flex;
        flex-direction: column;

        .list-item {
          margin-top: 16px;
          display: flex;
          flex-direction: column;

          &:first-of-type {
            margin-top: 0;
          }

          label {
            font-size: 12px;
          }

          input {
            border-radius: 2px;
            border: none;
            font-size: 16px;
            padding: 4px 2px;
          }
        }
      `}
    >
      <ul
        css={css`
          display: contents;
          padding: 0;
          margin: 16px 0;
          list-style: none;
        `}
      >
        <li className="list-item">
          <label htmlFor="name">Имя ленты</label>
          <input type="text" name="name" onChange={handleOnChange} value={state.name.value} required/>
          {state.name.error && <p style={errorStyle}>{state.name.error}</p>}
        </li>
        <li className="list-item">
          <label htmlFor="link">Ссылка на RSS</label>
          <input type="text" name="link" onChange={handleOnChange} value={state.link.value} required/>
          {state.link.error && <p style={errorStyle}>{state.link.error}</p>}
        </li>
        <li className="list-item">
          <label htmlFor="category">Категория</label>
          <input type="text" name="category" onChange={handleOnChange} value={state.category.value} required/>
          {state.category.error && <p style={errorStyle}>{state.category.error}</p>}
        </li>
      </ul>
      <Button
        type="submit"
        name="submit"
        disabled={disable}
        title="Добавить"
        onClick={props.onClick}
        css={css`
          margin-top: 16px;
        `}
      />
    </form>
  );
}

export default Form;
