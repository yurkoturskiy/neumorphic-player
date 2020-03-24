import React, { useState, useCallback } from "react";
import SoundIcon from "./SoundIcon";

function Player(props) {
  const [power, setPower] = useState(false);
  const switcher = useCallback(() => setPower(power => !power), []);
  return (
    <div className="wrapper">
      <div className="player-body" />
      <div className="button" onClick={switcher} />
      <div className="icon-wrapper light">
        <SoundIcon />
      </div>
      <div className="icon-wrapper glare">
        <SoundIcon />
      </div>
    </div>
  );
}

export default Player;
