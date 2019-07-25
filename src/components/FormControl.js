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

        .input-label {
          color: white !important;
        }

        .helper-text {
          color: darkred;
          font-size: 12px;
          line-height: 16px;
          margin: 6px 0;
        }

        .input {
          margin-left: 0;
          margin-bottom: 0;
          color: white;
          height: 30px;

          :hover:before {
            border-bottom: 2px solid white !important;
          }
        }
      `}
    >
      {props.select ? (
        <React.Fragment>
          <InputLabel htmlFor="category" className="input-label">
            Категория
          </InputLabel>
          <Select
            value={categoryId || ""}
            onChange={onSelectChange}
            input={<Input id="category" />}
            className="input"
            css={css`
              height: 30px;
            `}
          >
            {props.categories.length !== 0 ? (
              props.categories
                .filter(value => !!value.title)
                .map(value => (
                  <MenuItem key={value.title} value={value.id}>
                    {value.title}
                  </MenuItem>
                ))
            ) : (
              <MenuItem value="" disabled>
                Нет категорий
              </MenuItem>
            )}
          </Select>
          {(props.error || !categoryId) && (
            <FormHelperText className="helper-text">Не выбрана категория</FormHelperText>
          )}
        </React.Fragment>
      ) : (
        <React.Fragment>
          <InputLabel htmlFor={props.name} className="input-label">
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
            className="input"
          />
          {props.error && <FormHelperText className="helper-text">{props.error}</FormHelperText>}
        </React.Fragment>
      )}
    </MaterialFormControl>
  );
}

export default FormControl;
