/** @jsx jsx */

import { jsx } from "@emotion/core";
import StylesProvider from "@material-ui/styles/StylesProvider";

const JssProvider = ({ children }) => {
  return <StylesProvider injectFirst>{children}</StylesProvider>;
};

export default JssProvider;
