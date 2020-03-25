import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useReducer
} from "react";
import "./styles.css";

const init = power => ({
  animate: power,
  power,
  repeatCount: "indefinite",
  numOfCycles: 0,
  duration: "600ms"
});

const reducer = (state, action) => {
  switch (action.type) {
    case "ON":
      return { ...state, animate: true, power: true };
    case "OFF":
      return { ...state, power: false };
    case "REPEAT":
      return { ...state, numOfCycles: state.numOfCycles + 1, animate: state.power };
    default:
      return state;
  }
};

const createDispatcher = dispatch => type => payload => dispatch({ type, payload });

export default function App({ power }) {
  const [state, dispatch] = useReducer(reducer, power, init);
  // actions
  const dispatcher = createDispatcher(dispatch)
  const repeatAction = dispatcher("REPEAT");
  const onAction = dispatcher("ON")
  const offAction = dispatcher("OFF")

  // refs
  const animateRef = useRef(null);

  const animatePattern = {
    calcMode: "linear",
    attributeName: "d",
    dur: state.duration,
    repeatCount: state.repeatCount
  };

  useEffect(() => {
    power ? onAction() : offAction()
  }, [power])

  const onRepeat = useCallback(e => {
    repeatAction(e)
  }, [repeatAction]);

  // Set animation repeat event
  useEffect(() => {
    const animateElement = animateRef.current;
    animateElement && animateElement.addEventListener("repeatEvent", onRepeat);
    return () => {
      animateElement && animateElement.removeEventListener("repeatEvent", onRepeat);
    };
  });

  return (
    <svg className="icon" viewBox="0 0 24 24">
      <path d="M4 10 L 4 14 Z">
        {state.animate  && (
          <animate
          ref={animateRef}
          {...animatePattern}
          values="M4 10 L4 14 Z; M4 4 L4 20 Z; M4 10 L4 14 Z"
        />
        )}
      </path>
      <path d="M8 8 L 8 14 Z">
        {state.animate && (
          <animate
          {...animatePattern}
          keyTimes="0; 0.25; 0.75; 1"
          values="M8 7 L8 17 Z; M8 10 L8 15 Z; M8 4 L8 20 Z; M8 7 L8 17 Z"
        />
        )}
      </path>
      <path d="M12 4 L12 20 Z">
        {state.animate && (
        <animate
          {...animatePattern}
          values="M12 4 L12 20 Z; M12 10 L12 14 Z; M12 4 L12 20 Z"
        />
        )}
      </path>
      <path d="M16 7 L16 17 Z">
        {state.animate && (
        <animate
          {...animatePattern}
          keyTimes="0; 0.25; 0.75; 1"
          values="M16 7 L16 17 Z; M16 4 L16 20 Z; M16 10 L16 14 Z; M16 7 L16 17 Z"
        />
        )}
      </path>
      <path d="M20 10 L20 14 Z">
        {state.animate && (
        <animate
          {...animatePattern}
          values="M20 10 L20 14 Z; M20 4 L20 20 Z; M20 10 L20 14 Z"
        />
        )}
      </path>
    </svg>
  );
}
