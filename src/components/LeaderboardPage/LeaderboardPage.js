import React, { Component } from "react";

import { Fab, Box } from "@material-ui/core";
import EmptyState from "../EmptyState";
import { Timer as GameIcon } from "@material-ui/icons";
import { Link } from "react-router-dom";

class LeaderboardPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
   
      return (<EmptyState
      title="Under Construction!"
      description="This page is still under construction, check back soon."
      size="medium"
    />)

  }
}

export default LeaderboardPage;
