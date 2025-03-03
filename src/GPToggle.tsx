import * as React from "react";
import {
  Box,
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
  const handleGP = (event: React.MouseEvent<HTMLElement>, nextGP: string) => {
    if (nextGP) {
      props.setGP(nextGP);
      props.setScoreHeight("level1");
      props.setReefTarget(-1);
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
        value={props.gamepiece}
        exclusive
        onChange={handleGP}
        sx={{ p: 0, m: 0 }}
      >
        <ToggleButton
          value="coral"
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
            CORAL
          </Typography>
        </ToggleButton>
        <ToggleButton
          value="algae"
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
            ALGAE
          </Typography>
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}
