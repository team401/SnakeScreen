import * as React from "react";
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useEntry } from "@frc-web-components/react";

type autonomyLevels = {
  value: string;
  label: string;
};

export default function Autonomy() {
  const [autonomy, setAutonomy] = useEntry("/autonomyLevel", "mid");

  const modes: autonomyLevels[] = [
    { value: "high", label: "High" },
    { value: "mid", label: "Mid" },
    { value: "low", label: "Low" },
  ];

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    nextMode: string
  ) => {
    if (nextMode) {
      setAutonomy(nextMode);
    }
  };

  return (
    <Box
      sx={{
        height: 290,
        width: 200,
        position: "absolute",
        right: 5,
        bottom: 1,
        m: 0,
        p: 0,
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        textAlign={"center"}
        sx={{ m: 0 }}
      >
        Autonomy
      </Typography>
      <ToggleButtonGroup
        orientation="vertical"
        value={autonomy}
        exclusive
        onChange={handleChange}
        sx={{ p: 0, m: 0 }}
      >
        {modes.map((mode) => (
          <ToggleButton
            value={mode.value}
            sx={{ width: 200, height: 80, borderWidth: 2, border: "solid" }}
            color="error"
          >
            <Typography
              fontSize={70}
              sx={{ px: 1, width: 200, textWrap: "nowrap" }}
            >
              {mode.label}
            </Typography>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
}
