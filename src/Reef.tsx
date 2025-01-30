import * as React from "react";
import {
  Box,
  Button,
  IconButton,
  ToggleButton,
  Typography,
} from "@mui/material";
import reefImg from "./reef.png";
import { useEntry } from "@frc-web-components/react";

type ReefButton = {
  x: number;
  y: number;
  value: string;
  piece: string;
};

export default function Reef() {
  const [selected, setSelected] = useEntry("/reefTarget", "-1");
  const [gpMode, setGP] = useEntry("/gpMode", "coral");

  let divW = 1200;
  let imgW = 900;
  let padder = (divW - imgW) / 2;
  let bPad = padder / 2;

  let buttonList: ReefButton[] = [
    { x: bPad + imgW * 0.4, y: 0, value: "0", piece: "coral" },
    { x: bPad + imgW * 0.65, y: 0, value: "1", piece: "coral" },
    { x: bPad + imgW * 0.9, y: imgW * 0.15, value: "2", piece: "coral" },
    { x: bPad + imgW * 1.05, y: imgW * 0.4, value: "3", piece: "coral" },
    { x: bPad + imgW * 1.05, y: imgW * 0.65, value: "4", piece: "coral" },
    { x: bPad + imgW * 0.9, y: imgW * 0.85, value: "5", piece: "coral" },
    { x: bPad + imgW * 0.65, y: imgW, value: "6", piece: "coral" },
    { x: bPad + imgW * 0.4, y: imgW, value: "7", piece: "coral" },
    { x: bPad + imgW * 0.12, y: imgW * 0.85, value: "8", piece: "coral" },
    { x: bPad, y: imgW * 0.65, value: "9", piece: "coral" },
    { x: bPad, y: imgW * 0.4, value: "10", piece: "coral" },
    { x: bPad + imgW * 0.12, y: imgW * 0.15, value: "11", piece: "coral" },
    { x: bPad + imgW * 0.52, y: 0, value: "0", piece: "algae" },
    { x: bPad + imgW * 0.95, y: imgW * 0.25, value: "1", piece: "algae" },
    { x: bPad + imgW * 0.95, y: imgW * 0.75, value: "2", piece: "algae" },
    { x: bPad + imgW * 0.52, y: imgW, value: "3", piece: "algae" },
    { x: bPad + imgW * 0.08, y: imgW * 0.75, value: "4", piece: "algae" },
    { x: bPad + imgW * 0.08, y: imgW * 0.25, value: "5", piece: "algae" },
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
        .filter((entry) => entry.piece == gpMode)
        .map((entry) => (
          <div
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
              selected={selected == entry.value}
              onChange={() => setSelected(entry.value)}
            >
              <Typography px={3} py={1.5} m={0} fontSize={100} lineHeight={0.9}>
                {entry.value}
              </Typography>
            </ToggleButton>
          </div>
        ))}
    </Box>
  );
}
