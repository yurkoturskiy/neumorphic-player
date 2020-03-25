import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import SoundIcon from "./SoundIcon";
import MusicOffIcon from "./Icons/MusicOffIcon";
import SoundWaves from "./SoundWaves";

function Player(props) {
  const [power, setPower] = useState();
  const switcher = useCallback(() => setPower((power) => !power), []);
  return (
    <div className="wrapper">
      <div className={`player__body`} />
      <div className={`player__button`} onClick={switcher} />
      <div className="player__ring" />
      <SoundWaves
        className={`player__spinner ${power && "on"}`}
        duration={2000}
        shiftStep={200}
        numOfKeyPaths={3}
        numOfShapes={9}
        colors={["#F3FFFE", "#FFF3FC", "#F7FFED", "#F3FFFE"]}
        contrast={0.5}
        round={1}
        numOfPathSegments={8}
        type={"fill"}
        lable={false}
      />
      <div className={`player__icon ${power && "on"}`}>
        <SoundIcon power={true} />
      </div>
      <div className={`player__icon ${!power && "off"}`}>
        <MusicOffIcon />
      </div>
    </div>
  );
}

export default Player;
