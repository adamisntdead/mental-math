import React, { Component } from "react";

import { Fab, Box, Container, CircularProgress, Paper, Badge } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import ProblemState from "../ProblemState";
import EmptyState from "../EmptyState";
import { Timer as GameIcon } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import { firestore } from "../../firebase";

const GAME_LENGTH = 120

// Get a random number between 0 and n - 1
function randInt(n) {
  return Math.floor(Math.random() * n);
}

function randGen(min, max) {
  return () => min + randInt(max - min + 1);
}

function generate() {
  const options = {
    add: true,
    sub: true,
    mul: true,
    div: true,
    add_left_min: 2,
    add_left_max: 100,
    add_right_min: 2,
    add_right_max: 100,
    mul_left_min: 2,
    mul_left_max: 12,
    mul_right_min: 2,
    mul_right_max: 100,
  };

  const genTypes = ["add_left", "add_right", "mul_left", "mul_right"];
  const randGens = {};
  genTypes.forEach((type) => {
    randGens[type] = randGen(options[`${type}_min`], options[`${type}_max`]);
  });

  const pg_add = function pg_add() {
    const left = randGens[genTypes[0]]();
    const right = randGens[genTypes[1]]();
    return [`${left} + ${right}`, left + right];
  };
  const pg_sub = function pg_sub() {
    const left = randGens[genTypes[0]]();
    const right = randGens[genTypes[1]]();
    return [`${left + right} \u2013 ${left}`, right];
  };
  const pg_mul = function pg_mul() {
    const left = randGens[genTypes[2]]();
    const right = randGens[genTypes[3]]();
    return [`${left} \xD7 ${right}`, left * right];
  };
  const pg_div = function pg_div() {
    const left = randGens[genTypes[2]]();
    const right = randGens[genTypes[3]]();
    if (left !== 0) {
      return [`${left * right} \xF7 ${left}`, right];
    }
  };

  const pgs = [];
  if (options.add) {
    pgs.push(pg_add);
  }
  if (options.sub) {
    pgs.push(pg_sub);
  }
  if (options.mul) {
    pgs.push(pg_mul);
  }
  if (options.div) {
    pgs.push(pg_div);
  }

  const problemGen = function problemGen() {
    let genned = null;

    while (genned == null) {
      genned = pgs[randInt(pgs.length)]();
    }

    return genned;
  };

  return problemGen();
}

function GameTimer(props) {
  return (
    // <Box display="flex" alignItems="center">
    <Box width="100%" mr={1}>
      <LinearProgress variant="determinate" value={props.value / (GAME_LENGTH / 100)} />
    </Box>
  );
}

const loadingStyles = (theme) => ({
  center: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
  },
});

class LoadingGameNoStyle extends Component {
  render() {
    // Styling
    const { classes } = this.props;

    return (
      <div className={classes.center}>
        <CircularProgress value={this.props.progress} />
      </div>
    );
  }
}

const LoadingGame = withStyles(loadingStyles)(LoadingGameNoStyle);

class GamePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      gameOver: false,
      currentProblem: generate(),
      timeLeft: GAME_LENGTH,
      score: 0,
      currentAnswer: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  correctAnswer() {
    // Generate a new problem
    const newProblem = generate();

    this.setState({
      currentAnswer: "",
      currentProblem: newProblem,
      score: this.state.score + 1,
    });
  }

  handleChange(event) {
    const currentAnswer = event.target.value;

    this.setState({
      currentAnswer,
    });

    if (parseInt(currentAnswer, 10) === this.state.currentProblem[1]) {
      this.correctAnswer();
    }
  }

  resetGame() {
    this.setState({
      loading: true,
      gameOver: false,
      currentProblem: generate(),
      timeLeft: GAME_LENGTH,
      score: 0,
      currentAnswer: "",
    });

    this.startLoading()
  }

  gameOver() {
    // Persist the score
    if (this.props.user && this.state.score > 0) {
      const obj = {
        score: this.state.score,
        date: Date.now(),
        user: this.props.user.uid,
        username: this.props.user.username
      }

      Object.keys(obj).forEach(key => obj[key] === undefined ? delete obj[key] : {});

      firestore.collection('game-scores').add(obj)
    }

    this.setState({ gameOver: true });
  }

  countDown() {
    const timer = setInterval(() => {
      if (this.state.timeLeft === 0) {
        clearInterval(timer)
        this.gameOver()
      } else {
        this.setState({ timeLeft: this.state.timeLeft - 1 });
      }
    }, 1000);
  }

  startLoading() {
    setTimeout(() => {
      this.setState({ loading: false });
      this.countDown();
    }, 1500);
  }

  componentDidMount() {
    this.startLoading();
  }

  render() {
    if (this.state.loading) {
      return <LoadingGame />;
    }

    if (this.state.gameOver) {
      return (<EmptyState
        title={`Score: ${this.state.score}`}
        size="large"
        button={
          <Fab variant="extended" color="primary" onClick={this.resetGame}>
            <Box clone mr={1}>
              <GameIcon />
            </Box>
            Restart Game
          </Fab>
        }
      />)
    }

    return (
      <Container maxWidth="sm">
        <Box
          style={{ transform: "translate(-50%, -50%)" }}
          position="absolute"
          top="50%"
          left="50%"
          textAlign="center"
        >
          <Badge max={999} badgeContent={this.state.score} color="primary">
            <Paper elevation={1}>
              <GameTimer value={this.state.timeLeft} />
              <Box style={{ padding: "30px" }}>
                <ProblemState
                  currentProblem={this.state.currentProblem}
                  handleChange={this.handleChange}
                  currentAnswer={this.state.currentAnswer}
                />
              </Box>
            </Paper>
          </Badge>
        </Box>
      </Container>
    );
  }
}

export default GamePage;
