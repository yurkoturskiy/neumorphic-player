import React from "react";
import ReactDOM from "react-dom";

import CodeSandboxLogo from "./misc/CodeSandboxLogo";
import Player from "./Player";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    {/* <CodeSandboxLogo /> */}
    <Player />
  </React.StrictMode>,
  rootElement
);
