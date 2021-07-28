import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import { withRouter } from 'react-router-dom';

import {
  Dialog,
  DialogTitle,
  Typography,
  Tooltip,
  IconButton,
  Tabs,
  Tab,
} from "@material-ui/core";

import {
  Close as CloseIcon,
  AccountCircle as AccountCircleIcon,
  Palette as PaletteIcon,
  Link as LinkIcon,
  Security as SecurityIcon,
} from "@material-ui/icons";

import SwipeableViews from "react-swipeable-views";

import AccountTab from "../AccountTab";
import AppearanceTab from "../AppearanceTab";
import LinksTab from "../LinksTab";
import SecurityTab from "../SecurityTab";
import CustomGameTab from "./CustomGameTab";

const styles = (theme) => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
});

const initialState = {
  selectedTab: 0,
};

class CustomGameDialog extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  handleExited = () => {
    this.setState(initialState);
  };

  startGame = (configString) => {
    this.props.dialogProps.onClose()
    this.props.history.push(`/custom/${configString}`)
  }

  render() {
    // Styling
    const { classes } = this.props;

    // Dialog Properties
    const { dialogProps } = this.props;

    // Custom Properties
    const { user, userData, theme } = this.props;

    // Custom Functions
    const { openSnackbar } = this.props;

    // Custom Functions
    const { onDeleteAccountClick } = this.props;


    return (
      <Dialog {...dialogProps} onExited={this.handleExited}>
        <DialogTitle disableTypography>
          <Typography variant="h6">Custom Game</Typography>

          <Tooltip title="Close">
            <IconButton
              className={classes.closeButton}
              onClick={dialogProps.onClose}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </DialogTitle>

        <CustomGameTab
          user={user}
          userData={userData}
          openSnackbar={openSnackbar}
          startGame={this.startGame}
        />

      </Dialog>
    );
  }
}


const GameDialogWithRouter = withRouter(CustomGameDialog)


export default withStyles(styles)(GameDialogWithRouter);
