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
    { label: "Level 4", value: "level4", piece: "coral" },
    { label: "Level 3", value: "level3", piece: "coral" },
    { label: "Level 2", value: "level2", piece: "coral" },
    { label: "Level 1", value: "level1", piece: "coral" },
    { label: "Net", value: "level4", piece: "algae" },
    { label: "⬆️ Reef", value: "level3", piece: "algae" },
    { label: "⬇️ Reef", value: "level2", piece: "algae" },
    { label: "Proc", value: "level1", piece: "algae" },
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
        width: 350,
        height: 500,
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
            <ToggleButton
              value={entry.value}
              sx={{ width: 350, borderWidth: 2, height: 150, border: "solid" }}
              color="error"
            >
              <Typography fontSize={80} sx={{ my: 2, textWrap: "nowrap" }}>
                {entry.label}
              </Typography>
            </ToggleButton>
          ))}
      </ToggleButtonGroup>
    </Box>
  );
}
