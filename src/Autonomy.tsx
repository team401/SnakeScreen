import * as React from "react";
import {
  Box,
  Stack,
  Switch,
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
    //{ value: "high", label: "Full" },
    { value: "smart", label: "Smart" },
    //{ value: "mid", label: "Mixed" },
    { value: "low", label: "None" },
  ];

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    isRight: boolean
  ) => {
    let newMode = isRight ? "smart" : "low";
    props.setAutonomy(newMode);
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
      <Typography sx={{ pb: 2, fontSize: 60 }}>Autonomy</Typography>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <Typography sx={{ pr: 12, fontSize: 60 }}>🚫</Typography>
        <Switch
          color="success"
          checked={props.autonomy === "smart"}
          onChange={handleChange}
          sx={{ transform: "scale(6)", m: 40 }}
        />
        <Typography sx={{ pl: 12, fontSize: 60 }}>🧠</Typography>
      </Stack>
    </Box>
  );
}
