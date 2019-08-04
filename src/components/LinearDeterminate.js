/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import { useState, useEffect } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";

function LinearDeterminate() {
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    function progress() {
      setCompleted(oldCompleted => {
        if (oldCompleted === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldCompleted + diff, 100);
      });
    }

    const timer = setInterval(progress, 500);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Grid
      css={css`
        flex-grow: 1;
      `}
    >
      <LinearProgress variant="determinate" value={completed} />
    </Grid>
  );
}

export default LinearDeterminate;
