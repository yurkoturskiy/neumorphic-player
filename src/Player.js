import React, { useState, useCallback } from "react";
import SoundIcon from "./components/SoundIcon";
import MusicOffIcon from "./components/MusicOffIcon";
import SoundWaves from "./components/SoundWaves";
import LoFiSong from "./components/LoFiSong";
import "./styles.css";

function Player(props) {
  const [power, setPower] = useState();
  const switcher = useCallback(() => {
    const lofiSongElement = document.getElementById("lofi-song");
    lofiSongElement.muted = power;
    lofiSongElement.play();
    setPower(!power);
  }, [power]);
  return (
    <div className="wrapper">
      <LoFiSong />
      <div className={`player__body ${power && "on"}`} />
      <div className={`player__button ${power && "on"}`} onClick={switcher} />
      <div className={`player__display ${power && "on"}`} />
      <div className="player__glare" />
      <SoundWaves
        className={`player__spinner ${power && "on"}`}
        duration={2000}
        shiftStep={200}
        numOfKeyPaths={3}
        numOfShapes={5}
        colors={["#F3FFFE", "#FFF3FC", "#F7FFED", "#F3FFFE"]}
        contrast={0.35}
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
