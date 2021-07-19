import React from "react";
import { Box, Input } from "@material-ui/core";

function ProblemState(props) {
  return (
    <Box>
      <div
        className="banner"
        style={{
          textAlign: "center",
          padding: "10px 0",
          lineHeight: "54px",
          fontSize: "36px",
        }}
      >
        <div className="start">
          <span className="problem">{props.currentProblem[0]}</span>
          &nbsp; = &nbsp;
          <Input
            type="number"
            inputProps={{
              pattern: '\d*'
            }}
            autoFocus={true}
            style={{ fontSize: "36px", fontFamily: "inherit", width: "180px" }}
            className="answer"
            value={props.currentAnswer}
            onChange={props.handleChange}
          />
        </div>
      </div>
    </Box>
  );
}

export default ProblemState;
