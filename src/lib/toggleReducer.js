import { pipe } from "ramda";

const updateLastVol = (s) => ({ ...s, lastVol: s.volume });
const switchPower = (s) => {
  s.element.muted = s.power;
  s.element.play();
  const volume = s.volume >= 0.1 ? s.volume : 0.1;
  s.element.volume = volume;
  return {
    ...s,
    power: !s.power,
    volume,
  };
};

const turnOn = pipe(switchPower);

const turnOff = pipe(switchPower);

export default (state) => (state.power ? turnOff(state) : turnOn(state));
