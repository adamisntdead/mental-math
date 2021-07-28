import React, { Component } from "react";

import PropTypes from "prop-types";

import { makeStyles } from '@material-ui/core/styles';

import { withRouter } from "react-router-dom";

import { Fab, Box } from "@material-ui/core";

import { Timer as GameIcon, Settings as SettingsIcon } from "@material-ui/icons";

import { auth } from "../../firebase";

import authentication from "../../services/authentication";

import EmptyState from "../EmptyState";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  }
}))

// 
function ActionButton(props) {
  const classes = useStyles()

  return (
    <div className={classes.root}>

      <Fab variant="extended" color="primary" onClick={() => {
        if (props.user && !props.userData.username) {
          props.openDialog("noUsernameDialog")
        } else {
          props.history.push('/game')
        }
      }}
      >
        <Box clone mr={1}>
          <GameIcon />
        </Box>
        Start Game
      </Fab>
      <Fab variant="extended" color="secondary" onClick={() => {
        props.openDialog("customGameDialog")
      }}
      >
        <Box clone mr={1}>
          <SettingsIcon />
        </Box>
        Custom Game
      </Fab>

    </div>
  )
}

class HomePage extends Component {
  signInWithEmailLink = () => {
    const { user, userData } = this.props;

    if (user) {
      return;
    }

    const emailLink = window.location.href;

    if (!emailLink) {
      return;
    }

    if (auth.isSignInWithEmailLink(emailLink)) {
      let emailAddress = localStorage.getItem("emailAddress");

      if (!emailAddress) {
        this.props.history.push("/");

        return;
      }

      authentication
        .signInWithEmailLink(emailAddress, emailLink)
        .then((value) => {
          const user = value.user;
          const displayName = user.displayName;
          const emailAddress = user.email;

          this.props.openSnackbar(
            `Signed in as ${displayName || emailAddress}`
          );
        })
        .catch((reason) => {
          const code = reason.code;
          const message = reason.message;

          switch (code) {
            case "auth/expired-action-code":
            case "auth/invalid-email":
            case "auth/user-disabled":
              this.props.openSnackbar(message);
              break;

            default:
              this.props.openSnackbar(message);
              return;
          }
        })
        .finally(() => {
          this.props.history.push("/");
        });
    }
  };

  render() {
    return (
      <EmptyState
        title="Alphamac"
        description="A fast-paced mental arithmetic game, where you are given two minutes to solve as many problems as you can. Alphamac allows you to improve your skills, compete with friends, and track your progress over time."
        size="medium"
        button={
          <ActionButton user={this.props.user} userData={this.props.userData} openDialog={this.props.openDialog} history={this.props.history} />
        }

      />
    );
  }

  componentDidMount() {
    this.signInWithEmailLink();
  }
}

HomePage.propTypes = {
  user: PropTypes.object,
};

export default withRouter(HomePage);
