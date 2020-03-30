import React, { useEffect } from "react";

function LoFiSong() {
  useEffect(() => {
    const lofiSongElement = document.getElementById("lofi-song");
    lofiSongElement.play();
  }, []);
  return (
    <audio
      id="lofi-song"
      muted
      loop
      autoPlay
      src="https://yurko-sandbox.s3.eu-central-1.amazonaws.com/LoFi.mp3"
    >
      Your browser does not support the
      <code>audio</code> element.
    </audio>
  );
}

export default LoFiSong;
