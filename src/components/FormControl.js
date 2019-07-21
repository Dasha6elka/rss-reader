/** @jsx jsx */

import { css, jsx } from "@emotion/core";
import React, { useState } from "react";
import { FormControl as MaterialFormControl, Select } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "./Input";
import MenuItem from "@material-ui/core/MenuItem";

function FormControl(props) {
  const [categoryId, setCategoryId] = useState();

  function onInputChange(event) {
    props.onChange(event);
  }

  function onSelectChange(event) {
    setCategoryId(event.target.value);
    props.onChange(event);
  }

  return (
    <MaterialFormControl
      fullWidth={true}
      css={css`
        margin-top: ${!props.first && "16px !important"};
      `}
    >
      {props.select ? (
        <React.Fragment>
          <InputLabel
            htmlFor="category"
            css={css`
              color: white !important;
            `}
          >
            Категория
          </InputLabel>
          <Select
            value={categoryId || ""}
            onChange={onSelectChange}
            input={<Input id="category" />}
            css={css`
              margin-left: 0;
              margin-bottom: 0;
              color: white;
              height: 30px;

              :hover:before {
                border-bottom: 2px solid white !important;
              }
            `}
          >
            {props.categories.map(value => (
              <MenuItem key={value.id} value={value.id}>
                {value.title}
              </MenuItem>
            ))}
          </Select>
          {!categoryId && (
            <FormHelperText
              css={css`
                color: darkred;
                font-size: 12px;
                line-height: 16px;
                margin: 6px 0;
              `}
            >
              Не выбрана категория
            </FormHelperText>
          )}
        </React.Fragment>
      ) : (
        <React.Fragment>
          <InputLabel
            css={css`
              color: white !important;
            `}
            htmlFor={props.name}
          >
            {props.title}
          </InputLabel>
          <Input
            type="text"
            name={props.name}
            autoComplete="off"
            id={props.name}
            onChange={onInputChange}
            value={props.value}
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
          {props.error && (
            <FormHelperText
              css={css`
                color: darkred;
                font-size: 12px;
                line-height: 16px;
                margin: 6px 0;
              `}
            >
              {props.error}
            </FormHelperText>
          )}
        </React.Fragment>
      )}
    </MaterialFormControl>
  );
}

export default FormControl;
