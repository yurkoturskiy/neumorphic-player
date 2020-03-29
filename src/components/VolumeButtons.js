import React from "react";
import MinusIcon from "../static/MinusIcon@4.png";
import PlusIcon from "../static/PlusIcon@4.png";

function VolumeButtons({ updateVolume }) {
  return (
    <div>
      <div className="volume-button__wrapper minus">
        <div
          className="volume-button__body"
          onClick={() => updateVolume("down")}
        />
        <img src={MinusIcon} />
      </div>
      <div className="volume-button__wrapper plus">
        <div
          className="volume-button__body"
          onClick={() => updateVolume("up")}
        />
        <img src={PlusIcon} />
      </div>
    </div>
  );
}

export default VolumeButtons;
