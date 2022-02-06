import { Grid } from "@material-ui/core";
import { Display } from "./Display";
import { DisplayWithInput } from "./DisplayWithInput";

export function Counter() {
  return (
    <Grid container spacing={3} justify="center" style={{ margin: "20px" }}>
      <Grid item>
        <Display />
      </Grid>
      <Grid item>
        <DisplayWithInput />
      </Grid>
    </Grid>
  );
}
