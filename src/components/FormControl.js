/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import React from "react";
import { FormControl as MaterialFormControl, Select } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "./Input";
import MenuItem from "@material-ui/core/MenuItem";
import useTheme from "@material-ui/core/styles/useTheme";
import { useState } from "react";

const categories = ["Программирование", "Музыка", "Дизайн"];

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 152,
      width: 250
    }
  }
};

function getStyles(value, category, theme) {
  return {
    fontWeight: category.indexOf(value) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
  };
}

function FormControl(props) {
  function handleOnChange(event) {
    props.onChange(event);
  }

  const theme = useTheme();

  const [category, setCategory] = useState([]);

  function handleChange(event) {
    setCategory(event.target.value);
  }

  const errorStyle = {
    color: "darkred",
    fontSize: "12px",
    lineHeight: "16px",
    margin: "6px 0"
  };

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
            multiple
            value={category}
            onChange={handleChange}
            input={<Input id="category" />}
            MenuProps={MenuProps}
            css={css`
              margin-left: 0;
              margin-bottom: 0;
              color: white;

              :hover:before {
                border-bottom: 2px solid white !important;
              }
            `}
          >
            {categories.map(value => (
              <MenuItem key={value} value={value} style={getStyles(value, category, theme)}>
                {value}
              </MenuItem>
            ))}
          </Select>
          {!category && <FormHelperText style={errorStyle}>Не выбрана категория</FormHelperText>}
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
            onChange={handleOnChange}
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
          {props.error && <FormHelperText style={errorStyle}>{props.error}</FormHelperText>}
        </React.Fragment>
      )}
    </MaterialFormControl>
  );
}

export default FormControl;
