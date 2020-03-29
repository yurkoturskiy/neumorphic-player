import { pipe } from "ramda";

const updateLastVol = (s) => ({ ...s, lastVol: s.volume });
const switchPower = (s) => {
  s.element.muted = s.power;
  s.element.play();
  return {
    ...s,
    power: !s.power,
  };
};

const turnOn = pipe(switchPower);

const turnOff = pipe(switchPower);

export default (state) => (state.power ? turnOff(state) : turnOn(state));
