import React, { useState, useEffect, useMemo } from "react";
import { morphing } from "primitivo-svg";

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function SoundWaves(props) {
  const [width, setWidth] = useState(128);
  const [height, setHeight] = useState(128);
  const [pathsVisibility, setPathVisibility] = useState([]);

  const durPerPath = props.duration / (props.numOfKeyPaths * 2 - 1);
  const numOfColors = props.colors.length;
  const animateColorDuration =
    numOfColors * durPerPath - props.shiftStep * props.numOfShapes + "ms";

  useEffect(() => {
    setPathVisibility((pathsVisibility) => {
      var proto = [];
      for (let i = 0; i < props.numOfShapes; i++) {
        proto[i] = setTimeout(() => true, props.shiftStep * i);
      }
      return proto;
    });
  }, []);

  const morphParams = {
    numOfKeyPaths: props.numOfKeyPaths,
    loop: "circle",
  };

  const pathParams = {
    numOfSegments: props.numOfPathSegments,
    depth: 0,
    x: 0,
    y: 0,
    width,
    height,
    centerX: width / 2,
    centerY: height / 2,
    rotate: 0,
    numOfGroups: 1,
    groups: [
      {
        type: "radial",
        incircle: true,
        round: props.round,
        distance: [1 - props.contrast, 1],
      },
    ],
  };

  const blob = useMemo(() => morphing(morphParams, pathParams), []);

  const animateColorValues = props.colors.join(";");
  const animatePathDuration = props.duration + "ms";
  var paths = [];
  for (let i = 0; i < props.numOfShapes; i++) {
    paths.push(
      pathsVisibility[i] && (
        <path key={i} d={blob.dValuesFrames[0]}>
          <animate
            attributeName="d"
            dur={`${getRandomArbitrary(1000, 1600)}ms`}
            repeatCount="indefinite"
            calcMode="linear"
            values={morphing(morphParams, pathParams).dValues}
          />
          <animate
            begin={props.shiftStep * i + "ms"}
            attributeName="stroke"
            values={animateColorValues}
            dur={`${getRandomArbitrary(1000, 1600)}ms`}
            repeatCount="indefinite"
          />
        </path>
      )
    );
  }

  return (
    <div className={props.className}>
      <svg viewBox={`0 0 ${width} ${height}`}>{paths}</svg>
      {props.lable && <span>{props.lable}</span>}
    </div>
  );
}

export default SoundWaves;
