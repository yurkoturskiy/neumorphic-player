import React, { useReducer, useEffect, useState, useCallback } from "react";
import toggleReducer from "./lib/toggleReducer";
import volumeReducer from "./lib/volumeReducer";
import SoundIcon from "./components/SoundIcon";
import MusicOffIcon from "./components/MusicOffIcon";
import SoundWaves from "./components/SoundWaves";
import LoFiSong from "./components/LoFiSong";
import SpeakerGrid from "./components/SpeakerGrid";
import VolumeButtons from "./components/VolumeButtons";
import "./styles.css";
import setElement from "./lib/setElement";

const initialState = {
  power: false,
  volume: 0,
  lastVol: 1,
  volStep: 0.1,
  element: undefined,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ON_MOUNT":
      console.log("mount");
      return setElement(state);
    case "TOGGLE_POWER":
      console.log("toggle", state);
      return toggleReducer(state);
    case "UPDATE_VOLUME":
      return volumeReducer(state, action.payload);
    default:
      return state;
  }
};

const dispatcher = (dispatch) => (type) => (payload) =>
  dispatch({ type, payload });

function Player(props) {
  const [s, dispatch] = useReducer(reducer, initialState);
  const action = useCallback(dispatcher(dispatch), []);
  const onMount = useCallback(action("ON_MOUNT"), []);
  const togglePower = useCallback(action("TOGGLE_POWER"), []);
  const updateVolume = useCallback(action("UPDATE_VOLUME"), []);

  useEffect(() => {
    onMount();
  }, []);

  return (
    <div className="wrapper">
      <LoFiSong />
      <SpeakerGrid />
      <div className={`player__body ${s.power && "on"}`} />
      <div
        className={`player__button ${s.power && "on"}`}
        onClick={togglePower}
      />
      <div className={`player__display ${s.power && "on"}`} />
      <div className={`player__gradient ${s.power && "on"}`} />
      <div className="player__glare" />
      <SoundWaves
        className={`player__spinner ${s.power && "on"}`}
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
      <div className={`player__icon ${s.power && "on"}`}>
        <SoundIcon power={true} />
      </div>
      <div className={`player__icon ${!s.power && "off"}`}>
        <MusicOffIcon />
      </div>
      <VolumeButtons updateVolume={updateVolume} />
    </div>
  );
}

export default Player;
