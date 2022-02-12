import React, { useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { NavLink, Route } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { SignupForm } from "./Components/Login/Formik-login";
import { logoutThunk, setAuthThunk } from "./Reducers/Auth-reducer";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { AppStateType } from "./State/Store";
import LinearProgress from "@material-ui/core/LinearProgress";
import { statusType } from "./Reducers/App-reducer";
import { routes } from "./Navigation/Routes";
import { navlinks } from "./Navigation/NavLinks";

export function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector<AppStateType, any>((state) => state.auth);
  const loading = useSelector<AppStateType, statusType>(
    (state) => state.app.status
  );

  useEffect(() => {
    dispatch(setAuthThunk());
  }, []);

  const logoutHandle = () => {
    dispatch(logoutThunk());
  };

  if (!isAuth.isAuth) {
    return <SignupForm />;
  }

  return (
    <Grid container style={{ flexGrow: 1 }}>
      {loading === "loading" && <LinearProgress />}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            {navlinks.map((el) => {
              return (
                <NavLink to={el.path} style={{ textDecoration: "none" }}>
                  <IconButton>
                    <el.icon />
                  </IconButton>
                </NavLink>
              );
            })}
          </Typography>
          {isAuth.login ? (
            <>
              <Button
                onClick={logoutHandle}
                variant="outlined"
                size="small"
                startIcon={<ExitToAppIcon />}
              >
                Log Out
              </Button>
            </>
          ) : (
            <NavLink to={"/login"} style={{ textDecoration: "none" }}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<VpnKeyIcon />}
              >
                Log In
              </Button>
            </NavLink>
          )}
        </Toolbar>
      </AppBar>
      {routes.map((el) => {
        return <Route path={el.path} render={() => <el.component />} />;
      })}
    </Grid>
  );
}
