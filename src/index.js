import React from "react";
import ReactDOM from "react-dom";

import SocialButtons from "./misc/SocialButtons";
import Player from "./Player";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Player />
    <SocialButtons />
  </React.StrictMode>,
  rootElement
);
