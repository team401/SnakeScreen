import * as React from "react";
import { Box, ToggleButton, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import reefImg from "./reef.png";

type ReefButton = {
  x: number;
  y: number;
  value: number;
  piece: string;
};

type StationButton = {
  x: number;
  y: number;
  value: number;
  label: React.ReactElement;
};

type ReefProps = {
  gamepiece: string;
  reefTarget: number;
  setReefTarget: Function;
  intakeStation: number;
  setIntakeStation: Function;
};

export default function Reef(props: ReefProps) {
  let divW = 1200;
  let imgW = 900;
  let padder = (divW - imgW) / 2;
  let bPad = padder / 2;

  let buttonList: ReefButton[] = [
    { x: bPad + imgW * 0.4, y: 0, value: 0, piece: "coral" },
    { x: bPad + imgW * 0.65, y: 0, value: 1, piece: "coral" },
    { x: bPad + imgW * 0.9, y: imgW * 0.15, value: 2, piece: "coral" },
    { x: bPad + imgW * 1.05, y: imgW * 0.4, value: 3, piece: "coral" },
    { x: bPad + imgW * 1.05, y: imgW * 0.65, value: 4, piece: "coral" },
    { x: bPad + imgW * 0.9, y: imgW * 0.85, value: 5, piece: "coral" },
    { x: bPad + imgW * 0.65, y: imgW, value: 6, piece: "coral" },
    { x: bPad + imgW * 0.4, y: imgW, value: 7, piece: "coral" },
    { x: bPad + imgW * 0.12, y: imgW * 0.85, value: 8, piece: "coral" },
    { x: bPad, y: imgW * 0.65, value: 9, piece: "coral" },
    { x: bPad, y: imgW * 0.4, value: 10, piece: "coral" },
    { x: bPad + imgW * 0.12, y: imgW * 0.15, value: 11, piece: "coral" },
    { x: bPad + imgW * 0.52, y: 0, value: 0, piece: "algae" },
    { x: bPad + imgW * 0.95, y: imgW * 0.25, value: 1, piece: "algae" },
    { x: bPad + imgW * 0.95, y: imgW * 0.75, value: 2, piece: "algae" },
    { x: bPad + imgW * 0.52, y: imgW, value: 3, piece: "algae" },
    { x: bPad + imgW * 0.08, y: imgW * 0.75, value: 4, piece: "algae" },
    { x: bPad + imgW * 0.08, y: imgW * 0.25, value: 5, piece: "algae" },
  ];

  let intakeStations: StationButton[] = [
    {
      x: 0,
      y: imgW,
      value: 20,
      label: <ArrowBackIcon sx={{ fontSize: 100 }} />,
    },
    {
      x: bPad + imgW * 1.1,
      y: imgW,
      value: 21,
      label: <ArrowForwardIcon sx={{ fontSize: 100 }} />,
    },
  ];
  return (
    <Box
      sx={{
        width: divW,
        height: 700,
        position: "relative",
      }}
    >
      <Box px={padder.toString() + "px"} py={"120px"}>
        <img src={reefImg} width={imgW} alt="" />
      </Box>

      {buttonList
        .filter((entry) => entry.piece == props.gamepiece)
        .map((entry) => (
          <div
            key={entry.piece + entry.value}
            style={{
              position: "absolute",
              top: entry.y,
              left: entry.x,
              zIndex: 1000,
              padding: 0,
              margin: 0,
            }}
          >
            <ToggleButton
              color="error"
              value={entry.value}
              sx={{
                padding: 0,
                margin: 0,
                width: "120px",
                borderWidth: 2,
                border: "solid",
              }}
              selected={props.reefTarget == entry.value}
              onChange={() => props.setReefTarget(entry.value)}
            >
              <Typography px={3} py={1.5} m={0} fontSize={100} lineHeight={0.9}>
                {entry.value}
              </Typography>
            </ToggleButton>
          </div>
        ))}
      {intakeStations.map((entry) => (
        <div
          key={entry.value}
          style={{
            position: "absolute",
            top: entry.y,
            left: entry.x,
            zIndex: 1000,
            padding: 0,
            margin: 0,
          }}
        >
          <ToggleButton
            color="error"
            value={entry.value}
            sx={{
              padding: 0,
              margin: 0,
              width: "120px",
              borderWidth: 2,
              border: "solid",
            }}
            selected={props.intakeStation == entry.value}
            onChange={() => props.setIntakeStation(entry.value)}
          >
            <Typography px={3} py={0} m={0} fontSize={100} lineHeight={0.9}>
              {entry.label}
            </Typography>
          </ToggleButton>
        </div>
      ))}
    </Box>
  );
}
