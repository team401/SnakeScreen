import * as React from "react";
import {
  Box,
  styled,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

type ScoreHeights = {
  label: string;
  value: string;
  piece: "coral" | "algae";
};

type ScoreHeightProps = {
  setCoralHeight: Function;
  coralHeight: string;
  setAlgaeHeight: Function;
  algaeHeight: string;
};

export default function ScoringHeight(props: ScoreHeightProps) {
  const heights: ScoreHeights[] = [
    { label: "Level 4", value: "level4", piece: "coral" },
    { label: "Level 3", value: "level3", piece: "coral" },
    { label: "Level 2", value: "level2", piece: "coral" },
    { label: "Level 1", value: "level1", piece: "coral" },
    { label: "Net", value: "level4", piece: "algae" },
    { label: "⬆️ Reef", value: "level3", piece: "algae" },
    { label: "⬇️ Reef", value: "level2", piece: "algae" },
    { label: "Proc", value: "level1", piece: "algae" },
  ];

  const BigButton = styled(ToggleButton)(({ theme }) => ({
    width: 350,
    borderWidth: 2,
    height: 150,
    border: "solid",
  }));

  const AlgaeButton = styled(BigButton)(({ theme }) => ({
    "&.Mui-selected": {
      color: "black",
      backgroundColor: "aqua",
      "&:hover": {
        color: "black",
        backgroundColor: "aqua",
      },
    },
    "&:hover": {
      color: "black",
      backgroundColor: "aqua",
    },
  }));

  const CoralButton = styled(BigButton)(({ theme }) => ({
    "&.Mui-selected": {
      color: "black",
      backgroundColor: "fuchsia",
      "&:hover": {
        color: "black",
        backgroundColor: "fuchsia",
      },
    },
    "&:hover": {
      color: "black",
      backgroundColor: "fuchsia",
    },
  }));

  const handleCoralChange = (
    event: React.MouseEvent<HTMLElement>,
    nextLevel: string
  ) => {
    if (nextLevel) {
      props.setCoralHeight(nextLevel);
    }
  };

  const handleAlgaeChange = (
    event: React.MouseEvent<HTMLElement>,
    nextLevel: string
  ) => {
    if (nextLevel) {
      props.setAlgaeHeight(nextLevel);
    }
  };

  return (
    <Box
      sx={{
        width: 750,
        height: 500,
      }}
    >
      <ToggleButtonGroup
        orientation="vertical"
        value={props.algaeHeight}
        exclusive
        onChange={handleAlgaeChange}
      >
        {heights
          .filter((entry) => entry.piece == "algae")
          .map((entry) => (
            <AlgaeButton key={entry.value} value={entry.value}>
              <Typography fontSize={80} sx={{ my: 2, textWrap: "nowrap" }}>
                {entry.label}
              </Typography>
            </AlgaeButton>
          ))}
      </ToggleButtonGroup>
      <ToggleButtonGroup
        orientation="vertical"
        value={props.coralHeight}
        sx={{ ml: 4 }}
        exclusive
        onChange={handleCoralChange}
      >
        {heights
          .filter((entry) => entry.piece == "coral")
          .map((entry) => (
            <CoralButton key={entry.value} value={entry.value}>
              <Typography fontSize={80} sx={{ my: 2, textWrap: "nowrap" }}>
                {entry.label}
              </Typography>
            </CoralButton>
          ))}
      </ToggleButtonGroup>
    </Box>
  );
}
