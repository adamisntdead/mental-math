import React, { useState, useEffect } from "react";

import { useParams, Link } from "react-router-dom";

import { Grid, Fab, Box } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import { Refresh as RefreshIcon, Home as HomeIcon } from "@material-ui/icons";

import { firestore } from "../../firebase";

import EmptyState from "../EmptyState";

import Loader from "../Loader";
import UserCard from "../UserCard";

const useStyles = makeStyles({
  grid: {
    margin: 0,
    width: "100%",
  },
});

function UserPage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const { userId } = useParams();
  const classes = useStyles();

  useEffect(() => {
    return firestore
      .collection("users")
      .doc(userId)
      .onSnapshot(
        (snapshot) => {
          setLoading(false);
          setUser(snapshot.data());
        },
        (error) => {
          setLoading(false);
          setError(error);
        }
      );
  }, [userId]);

  if (error) {
    return (
      <EmptyState
        title="Couldn’t retrieve user."
        description="Something went wrong when trying to retrieve the requested user."
        button={
          <Fab
            variant="extended"
            color="primary"
            onClick={() => window.location.reload()}
          >
            <Box clone mr={1}>
              <RefreshIcon />
            </Box>
            Retry
          </Fab>
        }
      />
    );
  }

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return (
      <EmptyState
        title="User doesn’t exist."
        description="The requested user doesn’t exist."
        button={
          <Fab variant="extended" color="primary" component={Link} to="/">
            <Box clone mr={1}>
              <HomeIcon />
            </Box>
            Home
          </Fab>
        }
      />
    );
  }

  const hasProfile = !!user.username;

  if (hasProfile) {
    return (
      <Grid className={classes.grid} container justify="center" spacing={5}>
        <Grid item xs={12} md={6} lg={4}>
          <UserCard user={user} userId={userId} />
        </Grid>
      </Grid>
    );
  }

  return (
    <EmptyState
      title="No profile."
      description="The user hasn‘t setup their profile. If this is your profile page, make sure to set your username in the settings!"
    />
  );
}

export default UserPage;
