import * as React from "react";
import {
  Box,
  createTheme,
  Stack,
  Switch,
  ThemeProvider,
  Typography,
} from "@mui/material";

type GPToggleProps = {
  gamepiece: string;
  setGP: Function;
};

const theme = createTheme({
  components: {
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          // Controls default (unchecked) color for the thumb
          color: "aqua",
        },
        colorPrimary: {
          "&.Mui-checked": {
            // Controls checked color for the thumb
            color: "fuchsia",
          },
        },
        track: {
          // Controls default (unchecked) color for the track
          opacity: 0.3,
          backgroundColor: "aqua",
          ".Mui-checked.Mui-checked + &": {
            // Controls checked color for the track
            opacity: 0.6,
            backgroundColor: "fuchsia",
          },
        },
      },
    },
  },
});

export default function GPToggle(props: GPToggleProps) {
  const handleGP = (
    event: React.ChangeEvent<HTMLInputElement>,
    isCoral: boolean
  ) => {
    let nextGP = isCoral ? "coral" : "algae";
    props.setGP(nextGP);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          height: 120,
          width: 700,
        }}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Typography sx={{ pr: 12, fontSize: 60 }}>A</Typography>
          <Switch
            defaultChecked
            checked={props.gamepiece == "coral"}
            onChange={handleGP}
            sx={{
              transform: "scale(6)",
              m: 40,
            }}
          />
          <Typography sx={{ pl: 12, fontSize: 60 }}>C</Typography>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
