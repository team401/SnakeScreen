import * as React from "react";
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useEntry } from "@frc-web-components/react";

export default function GPToggle() {
  const [selected, setSelected] = useEntry("/scoreHeight", "-1");
  const [target, setTarget] = useEntry("/reefTarget", -1);
  const [gpMode, setGP] = useEntry("/gpMode", "-1");

  const handleGP = (event: React.MouseEvent<HTMLElement>, nextGP: string) => {
    if (nextGP) {
      setGP(nextGP);
      nextGP == "algae" ? setSelected("algae1") : setSelected("level1");
      setTarget(-1);
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
        value={gpMode}
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
