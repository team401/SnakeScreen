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
  const [gpMode, setGP] = useEntry("/gpMode", "-1");

  const handleGP = (event: React.MouseEvent<HTMLElement>, nextGP: string) => {
    if (nextGP) {
      setGP(nextGP);
      nextGP == "algae" ? setSelected("algae1") : setSelected("coral1");
    }
  };

  return (
    <Box
      sx={{
        height: 150,
        width: 700,
      }}
    >
      <ToggleButtonGroup
        orientation="horizontal"
        value={gpMode}
        exclusive
        onChange={handleGP}
        sx={{ pt: 5 }}
      >
        <ToggleButton value="coral" sx={{ my: 8 }} color="error">
          <Typography fontSize={100} sx={{ px: 1, textWrap: "nowrap" }}>
            CORAL
          </Typography>
        </ToggleButton>
        <ToggleButton value="algae" sx={{ my: 8 }} color="error">
          <Typography fontSize={100} sx={{ px: 1, textWrap: "nowrap" }}>
            ALGAE
          </Typography>
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}
