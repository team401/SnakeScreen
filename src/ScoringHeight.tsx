import * as React from "react";
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useEntry } from "@frc-web-components/react";

type ScoreHeights = {
  label: string;
  value: string;
  piece: "coral" | "algae";
};

export default function ScoringHeight() {
  const [selected, setSelected] = useEntry("/scoreHeight", "-1");
  const [gpMode, setGP] = useEntry("/gpMode", "coral");

  const heights: ScoreHeights[] = [
    { label: "Level 4", value: "coral4", piece: "coral" },
    { label: "Level 3", value: "coral3", piece: "coral" },
    { label: "Level 2", value: "coral2", piece: "coral" },
    { label: "Level 1", value: "coral1", piece: "coral" },
    { label: "Net", value: "algae4", piece: "algae" },
    { label: "High Reef", value: "algae3", piece: "algae" },
    { label: "Low Reef", value: "algae2", piece: "algae" },
    { label: "Processor", value: "algae1", piece: "algae" },
  ];

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    nextLevel: string
  ) => {
    if (nextLevel) {
      setSelected(nextLevel);
    }
  };

  return (
    <Box
      sx={{
        height: 700,
        width: 600,
      }}
    >
      <ToggleButtonGroup
        orientation="vertical"
        value={selected}
        exclusive
        onChange={handleChange}
      >
        {heights
          .filter((entry) => entry.piece == gpMode)
          .map((entry) => (
            <ToggleButton value={entry.value} sx={{ width: 500 }} color="error">
              <Typography fontSize={80} sx={{ my: 3, textWrap: "nowrap" }}>
                {entry.label}
              </Typography>
            </ToggleButton>
          ))}
      </ToggleButtonGroup>
    </Box>
  );
}
