import React, { Component } from "react";

import PropTypes from "prop-types";

import { Hidden } from "@material-ui/core";

import SignUpDialog from "../SignUpDialog";
import SignInDialog from "../SignInDialog";
import SettingsDialog from "../SettingsDialog";
import DeleteAccountDialog from "../DeleteAccountDialog";
import AlertDialog from "../AlertDialog";
import CustomGameDialog from "../CustomGameDialog";

class DialogHost extends Component {
  render() {
    // Properties
    const { performingAction, theme, user, userData, dialogs } = this.props;

    // Functions
    const { openSnackbar } = this.props;

    const signUpDialog = dialogs.signUpDialog;
    const signInDialog = dialogs.signInDialog;
    const settingsDialog = dialogs.settingsDialog;
    const deleteAccountDialog = dialogs.deleteAccountDialog;
    const signOutDialog = dialogs.signOutDialog;
    const noUsernameDialog = dialogs.noUsernameDialog;
    const customGameDialog = dialogs.customGameDialog;

    return (
      <>
        {user && (
          <>
            <AlertDialog
              dialogProps={signOutDialog.dialogProps}
              performingAction={performingAction}
              theme={theme}
              user={user}
              userData={userData}
              openSnackbar={openSnackbar}
              {...signOutDialog.props}
            />

            <AlertDialog
              dialogProps={noUsernameDialog.dialogProps}
              performingAction={performingAction}
              theme={theme}
              user={user}
              userData={userData}
              openSnackbar={openSnackbar}
              {...noUsernameDialog.props}
            />
          </>
        )}

        <Hidden xsDown>
          {user && (
            <>
              <DeleteAccountDialog
                dialogProps={deleteAccountDialog.dialogProps}
                performingAction={performingAction}
                theme={theme}
                user={user}
                userData={userData}
                openSnackbar={openSnackbar}
                {...deleteAccountDialog.props}
              />
            </>
          )}

          {!user && (
            <>
              <SignUpDialog
                dialogProps={signUpDialog.dialogProps}
                performingAction={performingAction}
                theme={theme}
                user={user}
                userData={userData}
                openSnackbar={openSnackbar}
                {...signUpDialog.props}
              />

              <SignInDialog
                dialogProps={signInDialog.dialogProps}
                performingAction={performingAction}
                theme={theme}
                user={user}
                userData={userData}
                openSnackbar={openSnackbar}
                {...signInDialog.props}
              />
            </>
          )}
        </Hidden>

        <Hidden smDown>
          <CustomGameDialog
            dialogProps={customGameDialog.dialogProps}
            performingAction={performingAction}
            theme={theme}
            user={user}
            userData={userData}
            openSnackbar={openSnackbar}
            {...customGameDialog.props}
          />

          {user && (
            <>
              <SettingsDialog
                dialogProps={settingsDialog.dialogProps}
                performingAction={performingAction}
                theme={theme}
                user={user}
                userData={userData}
                openSnackbar={openSnackbar}
                {...settingsDialog.props}
              />
            </>
          )}
        </Hidden>

        <Hidden smUp>
          {user && (
            <>
              <DeleteAccountDialog
                dialogProps={{
                  fullScreen: true,

                  ...deleteAccountDialog.dialogProps,
                }}
                performingAction={performingAction}
                theme={theme}
                user={user}
                userData={userData}
                openSnackbar={openSnackbar}
                {...deleteAccountDialog.props}
              />
            </>
          )}

          {!user && (
            <>
              <SignUpDialog
                dialogProps={{
                  fullScreen: true,

                  ...signUpDialog.dialogProps,
                }}
                performingAction={performingAction}
                theme={theme}
                user={user}
                userData={userData}
                openSnackbar={openSnackbar}
                {...signUpDialog.props}
              />

              <SignInDialog
                dialogProps={{
                  fullScreen: true,

                  ...signInDialog.dialogProps,
                }}
                performingAction={performingAction}
                theme={theme}
                user={user}
                userData={userData}
                openSnackbar={openSnackbar}
                {...signInDialog.props}
              />
            </>
          )}
        </Hidden>

        <Hidden mdUp>
          <CustomGameDialog
            dialogProps={{ fullScreen: true, ...customGameDialog.dialogProps }}
            performingAction={performingAction}
            theme={theme}
            user={user}
            userData={userData}
            openSnackbar={openSnackbar}
            {...customGameDialog.props}
          />

          {user && (
            <>
              <SettingsDialog
                dialogProps={{
                  fullScreen: true,

                  ...settingsDialog.dialogProps,
                }}
                performingAction={performingAction}
                theme={theme}
                user={user}
                userData={userData}
                openSnackbar={openSnackbar}
                {...settingsDialog.props}
              />
            </>
          )}
        </Hidden>
      </>
    );
  }
}

DialogHost.propTypes = {
  // Properties
  performingAction: PropTypes.bool.isRequired,
  theme: PropTypes.object.isRequired,
  user: PropTypes.object,
  userData: PropTypes.object,
  dialogs: PropTypes.object.isRequired,

  // Functions
  openSnackbar: PropTypes.func.isRequired,
};

export default DialogHost;
