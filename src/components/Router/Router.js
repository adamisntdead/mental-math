import React, { Component } from "react";

import PropTypes from "prop-types";

import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";

import HomePage from "../HomePage";
import AdminPage from "../AdminPage";
import UserPage from "../UserPage";
import NotFoundPage from "../NotFoundPage";
import GamePage from "../GamePage";
import LeaderboardPage from "../LeaderboardPage";

class Router extends Component {
  render() {
    // Properties
    const { user, userData, roles, bar, theme } = this.props;

    // Functions
    const { openSnackbar, openDialog } = this.props;

    return (
      <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
        {bar}

        <Switch>
          <Route path="/" exact>
            <HomePage user={user} userData={userData} openSnackbar={openSnackbar} openDialog={openDialog} />
          </Route>

          <Route path="/game">
            {user && userData.username || !user ? (<GamePage timer={theme.timer} user={user} />) : (<Redirect to="/" />)}
          </Route>

          <Route path="/leaderboard">
            <LeaderboardPage />
          </Route>
          <Route path="/admin">
            {user && roles.includes("admin") ? (
              <AdminPage />
            ) : (
              <Redirect to="/" />
            )}
          </Route>

          <Route path="/user/:userId">
            <UserPage />
            {/* {user ? <UserPage /> : <Redirect to="/" />} */}
          </Route>

          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

Router.propTypes = {
  // Properties
  user: PropTypes.object,
  roles: PropTypes.array.isRequired,
  bar: PropTypes.element,

  // Functions
  openSnackbar: PropTypes.func.isRequired,
};

export default Router;
