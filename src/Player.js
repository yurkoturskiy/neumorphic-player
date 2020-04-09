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
import "./misc/misc.css";
import setElement from "./lib/setElement";

const initialState = {
  power: false,
  volume: 1,
  volStep: 0.1,
  outOfRangeValue: 0,
  volumeAction: null,
  element: undefined,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ON_MOUNT":
      return setElement(state);
    case "TOGGLE_POWER":
      return toggleReducer(state);
    case "SET_VOLUME_ACTION":
      return { ...state, volumeAction: action.payload };
    case "UPDATE_VOLUME":
      return volumeReducer(state, action.payload);
    case "RESET_OUT_OF_RANGE_VALUE":
      return { ...state, outOfRangeValue: 0 };
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
  const setVolumeAction = useCallback(action("SET_VOLUME_ACTION"), []);
  const resetOutOfRangeValue = useCallback(
    action("RESET_OUT_OF_RANGE_VALUE"),
    []
  );

  useEffect(() => {
    onMount();
  }, []);

  useEffect(() => {
    // Hold volume button effect
    s.volumeAction && setTimeout(() => updateVolume(), 160);
  }, [s.volume, s.volumeAction, updateVolume]);

  useEffect(() => {
    // reset out of range value with delay
    s.outOfRangeValue && setTimeout(() => resetOutOfRangeValue(), 200);
  }, [s.outOfRangeValue]);

  return (
    <div className="wrapper">
      <LoFiSong />
      <SpeakerGrid />
      <div className={`body ${s.power && "on"}`} />
      <div className={`mute-button ${s.power && "on"}`} onClick={togglePower} />
      <div className={`display glass ${s.power && "on"}`} />
      <div className="glare" />
      <div
        className={`display gradient ${s.power && "on"}`}
        style={{ opacity: s.power ? s.volume : 0 }}
      />
      <div
        className={`display background ${s.power && "on"}`}
        style={{ opacity: s.power ? s.volume : 0 }}
      />
      <div
        className={`display alarm ${s.power && "on"}`}
        style={{
          opacity: s.outOfRangeValue ? 1 : 0,
        }}
      />
      <div className={`display__icon ${s.power && "on"}`}>
        <SoundIcon power={true} />
      </div>
      <div className={`display__icon ${!s.power && "off"}`}>
        <MusicOffIcon />
      </div>
      <VolumeButtons
        setVolumeAction={setVolumeAction}
        updateVolume={updateVolume}
      />
      <SoundWaves
        className={`spinner ${s.power && "on"}`}
        duration={2000}
        shiftStep={200}
        numOfKeyPaths={3}
        numOfShapes={5}
        colors={["#F3FFFE", "#FFF3FC", "#F7FFED", "#F3FFFE"]}
        contrast={0.35}
        round={1}
        numOfPathSegments={8}
        type={"stroke"}
        lable={false}
      />
    </div>
  );
}

export default Player;
