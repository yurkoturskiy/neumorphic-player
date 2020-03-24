import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [color] = useState("black");
  const [strokeWidth] = useState("2");
  const [duration] = useState("680ms");

  return (
    <svg className="icon" viewBox="0 0 24 24">
      <path d="M4 10 L 4 14 Z">
        <animate
          calcMode="linear"
          attributeName="d"
          dur={duration}
          repeatCount="indefinite"
          values="M4 10 L4 14 Z; M4 4 L4 20 Z; M4 10 L4 14 Z"
        />
      </path>
      <path d="M8 8 L 8 14 Z">
        <animate
          calcMode="linear"
          attributeName="d"
          dur={duration}
          repeatCount="indefinite"
          keyTimes="0; 0.25; 0.75; 1"
          values="M8 7 L8 17 Z; M8 10 L8 15 Z; M8 4 L8 20 Z; M8 7 L8 17 Z"
        />
      </path>
      <path d="M12 4 L12 20 Z">
        <animate
          calcMode="linear"
          attributeName="d"
          dur={duration}
          repeatCount="indefinite"
          values="M12 4 L12 20 Z; M12 10 L12 14 Z; M12 4 L12 20 Z"
        />
      </path>
      <path d="M16 7 L16 17 Z">
        <animate
          calcMode="linear"
          attributeName="d"
          dur={duration}
          repeatCount="indefinite"
          keyTimes="0; 0.25; 0.75; 1"
          values="M16 7 L16 17 Z; M16 4 L16 20 Z; M16 10 L16 14 Z; M16 7 L16 17 Z"
        />
      </path>
      <path d="M20 10 L20 14 Z">
        <animate
          calcMode="linear"
          attributeName="d"
          dur={duration}
          repeatCount="indefinite"
          values="M20 10 L20 14 Z; M20 4 L20 20 Z; M20 10 L20 14 Z"
        />
      </path>
    </svg>
  );
}
