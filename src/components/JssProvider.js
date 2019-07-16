/** @jsx jsx */

import { jsx } from "@emotion/core";
import { create } from "jss";
import { StylesProvider, jssPreset } from "@material-ui/styles";

const jss = create({
  ...jssPreset(),
  insertionPoint: document.getElementById("jss-insertion-point")
});

const JssProvider = ({ children }) => {
  return <StylesProvider jss={jss}>{children}</StylesProvider>;
};

export default JssProvider;
