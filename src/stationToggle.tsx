import * as React from "react";
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

type StationToggleProps = {
  station: string;
  setStation: Function;
};

export default function StationToggle(props: StationToggleProps) {
  const handleStation = (
    event: React.MouseEvent<HTMLElement>,
    nextStation: string
  ) => {
    if (nextStation) {
      props.setStation(nextStation);
    }
  };

  return (
    <Box
      sx={{
        height: 120,
        width: 350,
        p: 0,
        m: 0,
      }}
    >
      <ToggleButtonGroup
        orientation="vertical"
        value={props.station}
        exclusive
        onChange={handleStation}
        sx={{ p: 0, m: 0 }}
      >
        <ToggleButton
          value="left"
          sx={{
            my: 0,
            borderWidth: 2,
            border: "solid",
            height: 100,
            width: 350,
          }}
          color="error"
        >
          <Typography fontSize={100} sx={{ px: 1, textWrap: "nowrap" }}>
            LEFT
          </Typography>
        </ToggleButton>
        <ToggleButton
          value="right"
          sx={{
            my: 8,
            borderWidth: 2,
            border: "solid",
            height: 100,
            width: 350,
          }}
          color="error"
        >
          <Typography fontSize={100} sx={{ px: 1, textWrap: "nowrap" }}>
            RIGHT
          </Typography>
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}
