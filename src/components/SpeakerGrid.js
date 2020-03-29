import React, { useState } from "react";
import speakerGrid from "../static/SpeakerGridHoles@4.png";
import { pipe } from "ramda";

const setHoleBox = (p) => ({
  ...p,
  holeBoxWidth: p.holeWidth + p.holeMargin * 2,
  holeBoxHeight: p.holeHeight + p.holeMargin * 2,
});

const setHolePos = (p) => (hole, index) => {
  const yShift = p.holeMargin;
  const y = hole.rowIndex * p.holeBoxHeight + yShift;
  const xRowShift = hole.isEvenRow ? p.evenRowXShift : p.oddRowXShift;
  const xShift = xRowShift + p.holeMargin;
  const x = index * p.holeBoxWidth + xShift;
  return { ...hole, index, x, y };
};

const setHolesPerRow = (p) => (_, index) => {
  const isEvenRow = index % 2 === 0;
  return Array(isEvenRow ? p.numOfEvenRowHoles : p.numOfOddRowHoles)
    .fill({
      isEvenRow,
      rowIndex: index,
      x: null,
      y: null,
    })
    .map(setHolePos(p));
};

const setHoles = (p) => ({
  ...p,
  holes: Array(p.numOfRows).fill(null).map(setHolesPerRow(p)).flat(),
});

const setGridBox = (p) => ({
  ...p,
  gridBoxHeight: p.numOfRows * p.holeBoxHeight,
  gridBoxWidth:
    Math.max(p.numOfEvenRowHoles, p.numOfOddRowHoles) * p.holeBoxWidth,
});

const setGrid = pipe(setHoleBox, setHoles, setGridBox);

function SvgComponent(props) {
  const p = setGrid({
    holeWidth: 3,
    holeHeight: 3,
    holeMargin: 0.5,
    numOfRows: 3,
    numOfEvenRowHoles: 7,
    numOfOddRowHoles: 8,
    evenRowXShift: 2,
    oddRowXShift: 0,
  });

  const svgHoles = p.holes.map((hole) => (
    <use href="#speaker-hole" x={hole.x} y={hole.y} />
  ));

  return (
    <img
      src={speakerGrid}
      className="speaker-grid"
      alt="speaker grid"
      width="31px"
    />
  );
}

export default SvgComponent;
