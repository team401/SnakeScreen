import * as React from "react";
import { Box, Stack, styled, Switch, Typography } from "@mui/material";

type StationToggleProps = {
  station: string;
  setStation: Function;
};

export default function StationToggle(props: StationToggleProps) {
  const handleStation = (
    event: React.ChangeEvent<HTMLInputElement>,
    isRight: boolean
  ) => {
    let newStation = isRight ? "right" : "left";
    props.setStation(newStation);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      sx={{
        height: 120,
        width: 400,
        m: 0,
      }}
    >
      <Typography sx={{ pb: 2, fontSize: 60 }}>Intake</Typography>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <Typography sx={{ pr: 12, fontSize: 60 }}>L</Typography>
        <Switch
          color="error"
          checked={props.station === "right"}
          onChange={handleStation}
          sx={{ transform: "scale(6)", m: 40 }}
        />
        <Typography sx={{ pl: 12, fontSize: 60 }}>R</Typography>
      </Stack>
    </Box>
  );
}
