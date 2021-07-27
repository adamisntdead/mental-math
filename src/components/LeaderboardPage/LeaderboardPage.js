import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Grid, Fab, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Refresh as RefreshIcon, Home as HomeIcon } from "@material-ui/icons";
import { firestore } from "../../firebase";
import EmptyState from "../EmptyState";
import Loader from "../Loader";
import LeaderboardCard from "../LeaderboardCard";

const useStyles = makeStyles({
  grid: {
    margin: 0,
    width: "100%",
  },
});

function LeaderboardPage() {
  const classes = useStyles();

  return (
    <Grid className={classes.grid} container justify="center" spacing={5}>
      <Grid item xs={12} md={6} lg={4}>
        <LeaderboardCard />
      </Grid>
    </Grid>
  );
}

export default LeaderboardPage;
