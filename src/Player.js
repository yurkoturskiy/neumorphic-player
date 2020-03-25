import React, { useState, useCallback } from "react";
import SoundIcon from "./SoundIcon";

function Player(props) {
  const [power, setPower] = useState();
  const switcher = useCallback(() => setPower(power => !power), []);
  return (
    <div className="wrapper">
      <div className={`player__body`} />
      <div className={`player__button`} onClick={switcher} />
      <div className={`player__icon light ${power && "on"}`}>
        <SoundIcon power={power} />
      </div>
      <div className={`player__icon glare ${power && "on"}`}>
        <SoundIcon power={power} />
      </div>
    </div>
  );
}

export default Player;
