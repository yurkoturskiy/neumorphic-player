import { curry } from "ramda";
import setElement from "./setElement";

const limitNumberWithinRange = curry((min, max, num) => {
  console.log(min, max, num);
  const MIN = min;
  const MAX = max;
  const parsed = num;
  return Math.min(Math.max(parsed, MIN), MAX);
});

const limitVolume = limitNumberWithinRange(0, 1);

const up = (s) => {
  const volume = limitVolume(s.volume + s.volStep);
  console.log("volume", volume);
  s.element.volume = volume;
  const lastVol = s.volume;
  return { ...s, volume, lastVol };
};

const down = (s) => {
  const volume = limitVolume(s.volume - s.volStep);
  console.log("volume", volume);
  s.element.volume = volume;
  const lastVol = s.volume;
  return { ...s, volume, lastVol };
};

export default (state, action) => (action === "up" ? up(state) : down(state));
