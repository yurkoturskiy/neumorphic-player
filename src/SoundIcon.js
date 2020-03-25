import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useReducer
} from "react";
import "./styles.css";

const init = power => ({
  isPlaying: false,
  repeatCount: power ? "indefinite" : "0",
  numOfCycles: 0,
  duration: "680ms"
});

const reducer = (state, action) => {
  switch (action.type) {
    case "ON":
      return { ...state, repeatCount: "indefinite" };
    case "OFF":
      return { ...state, repeatCount: "0" };
    case "REPEAT":
      return { ...state, numOfCycles: state.numOfCycles + 1 };
    default:
      return state;
  }
};

const createAction = dispatch => type => payload => dispatch({ type, payload });

export default function App({ power }) {
  const [state, dispatch] = useReducer(reducer, power, init);
  const repeatAction = createAction(dispatch);
  const animateRef = useRef(null);
  const [switcher, setSwitcher] = useState(false);
  const [repeatCount, setRepeatCount] = useState(power ? "indefinite" : "0");
  const [repeatCycles, setRepeatCycles] = useState(0);
  const [duration] = useState("680ms");
  const animatePattern = {
    calcMode: "linear",
    attributeName: "d",
    dur: state.duration,
    repeatCount: state.repeatCount
  };
  console.log("animatePattern", animatePattern);

  const onRepeat = useCallback(e => {
    console.log("repeat event", e);
    setRepeatCycles(repeatCycles => repeatCycles + 1);
  }, []);

  // Set animation repeat event
  useEffect(() => {
    const animateElement = animateRef.current;
    animateElement.addEventListener("repeatEvent", onRepeat);
    return () => {
      animateElement.removeEventListener("repeatEvent", onRepeat);
    };
  });

  // Handle power and repeatCount
  useEffect(() => {
    setRepeatCount(power ? "indefinite" : repeatCount);
    console.log("power", power);
  }, [power, repeatCount]);

  // Handle repeat cycles
  useEffect(() => {
    console.log("repeat cycles", repeatCycles);
  }, [repeatCycles, power]);

  return (
    <svg className="icon" viewBox="0 0 24 24">
      <path d="M4 10 L 4 14 Z">
        <animate
          ref={animateRef}
          {...animatePattern}
          values="M4 10 L4 14 Z; M4 4 L4 20 Z; M4 10 L4 14 Z"
        />
      </path>
      <path d="M8 8 L 8 14 Z">
        <animate
          {...animatePattern}
          keyTimes="0; 0.25; 0.75; 1"
          values="M8 7 L8 17 Z; M8 10 L8 15 Z; M8 4 L8 20 Z; M8 7 L8 17 Z"
        />
      </path>
      <path d="M12 4 L12 20 Z">
        <animate
          {...animatePattern}
          values="M12 4 L12 20 Z; M12 10 L12 14 Z; M12 4 L12 20 Z"
        />
      </path>
      <path d="M16 7 L16 17 Z">
        <animate
          {...animatePattern}
          keyTimes="0; 0.25; 0.75; 1"
          values="M16 7 L16 17 Z; M16 4 L16 20 Z; M16 10 L16 14 Z; M16 7 L16 17 Z"
        />
      </path>
      <path d="M20 10 L20 14 Z">
        <animate
          {...animatePattern}
          values="M20 10 L20 14 Z; M20 4 L20 20 Z; M20 10 L20 14 Z"
        />
      </path>
    </svg>
  );
}
