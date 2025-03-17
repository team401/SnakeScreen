import * as React from "react";
import {
  Box,
  Stack,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

type GPToggleProps = {
  gamepiece: string;
  setGP: Function;
  scoreHeight: string;
  setScoreHeight: Function;
  reefTarget: number;
  setReefTarget: Function;
};

export default function GPToggle(props: GPToggleProps) {
  const handleGP = (
    event: React.ChangeEvent<HTMLInputElement>,
    isCoral: boolean
  ) => {
    let nextGP = isCoral ? "coral" : "algae";
    props.setGP(nextGP);
    props.setScoreHeight(nextGP == "algae" ? "level2" : "level4");
    props.setReefTarget(10);
  };

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 30,
        left: 3,
        height: 120,
        width: 350,
        p: 0,
        m: 0,
      }}
    >
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <Typography sx={{ pr: 8, fontSize: 60 }}>Algae</Typography>
        <Switch
          defaultChecked
          color="error"
          checked={props.gamepiece == "coral"}
          onChange={handleGP}
          sx={{ transform: "scale(5)", m: 40 }}
        />
        <Typography sx={{ pl: 8, fontSize: 60 }}>Coral</Typography>
      </Stack>
    </Box>
  );
}
