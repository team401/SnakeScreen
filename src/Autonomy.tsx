import * as React from "react";
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

type autonomyLevels = {
  value: string;
  label: string;
};

type autoProps = {
  setAutonomy: Function;
  autonomy: string;
};

export default function Autonomy(props: autoProps) {
  const modes: autonomyLevels[] = [
    { value: "high", label: "Full" },
    { value: "mid", label: "Mixed" },
    { value: "low", label: "None" },
  ];

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    nextMode: string
  ) => {
    if (nextMode) {
      props.setAutonomy(nextMode);
    }
  };

  return (
    <Box
      sx={{
        height: 290,
        width: 220,
        position: "absolute",
        right: 5,
        bottom: 2,
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
        value={props.autonomy}
        exclusive
        onChange={handleChange}
        sx={{ p: 0, m: 0 }}
      >
        {modes.map((mode) => (
          <ToggleButton
            key={mode.value}
            value={mode.value}
            sx={{
              width: 220,
              height: 80,
              borderWidth: 2,
              border: "solid",
              p: 0,
              ml: 0,
            }}
            color="error"
          >
            <Typography
              fontSize={70}
              sx={{ mx: 0, px: 0, width: 210, textWrap: "nowrap" }}
            >
              {mode.label}
            </Typography>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
}
