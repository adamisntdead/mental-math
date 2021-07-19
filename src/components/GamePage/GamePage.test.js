import React from "react";

import ReactDOM from "react-dom";

import { MemoryRouter } from "react-router-dom";

import GamePage from "./GamePage";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <MemoryRouter>
      <GamePage />
    </MemoryRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
