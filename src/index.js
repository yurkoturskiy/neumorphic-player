import React from "react";
import ReactDOM from "react-dom";

import Player from "./Player";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Player />
  </React.StrictMode>,
  rootElement
);
