import React from "react";
import MinusIcon from "../static/MinusIcon@4.png";
import PlusIcon from "../static/PlusIcon@4.png";

function VolumeButtons({ setVolumeAction, updateVolume }) {
  const onButtonPress = (action) => {
    setVolumeAction(action);
    updateVolume();
  };
  return (
    <div>
      <div className="volume-button__wrapper minus">
        <div
          className="volume-button__body"
          onMouseDown={() => onButtonPress("down")}
          onMouseUp={() => setVolumeAction(null)}
        />
        <img src={MinusIcon} />
      </div>
      <div className="volume-button__wrapper plus">
        <div
          className="volume-button__body"
          onMouseDown={() => onButtonPress("up")}
          onMouseUp={() => setVolumeAction(null)}
        />
        <img src={PlusIcon} />
      </div>
    </div>
  );
}

export default VolumeButtons;
