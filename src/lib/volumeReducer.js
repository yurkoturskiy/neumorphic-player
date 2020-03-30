import { pipe, curry } from "ramda";
import setElement from "./setElement";

const limitNumberWithinRange = curry((min, max, num) =>
  Math.min(Math.max(num, min), max)
);
const limitVolume = limitNumberWithinRange(0, 1);

const updateVolume = (s) => {
  const step = s.volumeAction === "up" ? s.volStep : s.volStep * -1;
  const value = s.volume + step;
  const outOfRangeValue = value > 1 && s.outOfRangeValue + step;
  const volume = limitVolume(value);
  s.element.volume = volume;
  s.element.play();
  return { ...s, volume, outOfRangeValue };
};

const checkPower = (s) => {
  const power = s.volume >= 0.1;
  s.element.muted = !power;
  return { ...s, power: s.volume >= 0.1 };
};

export default (state) =>
  state.volumeAction ? pipe(updateVolume, checkPower)(state) : state;
