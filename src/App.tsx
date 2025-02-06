import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Reef from "./Reef";
import ScoringHeight from "./ScoringHeight";
import { Grid, Stack } from "@mui/material";
import GPToggle from "./GPToggle";
import { BooleanBox, NT4Provider } from "@frc-web-components/react";
import Autonomy from "./Autonomy";
import GPIndicator from "./GPIndicator";

export default function App() {
  return (
    <NT4Provider address="localhost">
      <Container sx={{ pl: 1 }} maxWidth={false} disableGutters>
        <Box sx={{ m: 0, p: 0, zIndex: 1 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{ m: 0, p: 0, position: "absolute", right: 0 }}
          >
            <Box fontWeight="900" sx={{ textAlign: "right", m: 0, p: 0 }}>
              SnakeScreen
            </Box>
          </Typography>
          <Stack direction={"row"} spacing={0} sx={{ my: 0, pt: 2 }}>
            <Stack direction={"column"} spacing={15} sx={{ px: 0, mx: 0 }}>
              <ScoringHeight />
              <GPToggle />
            </Stack>

            <Reef />
            <Stack sx={{ position: "absolute", right: 1, top: 100 }}>
              <GPIndicator name=" Coral " ntPath="/hasCoral" />
              <GPIndicator name="Algae" ntPath="/hasAlgae" />
            </Stack>
            <Autonomy />
          </Stack>
        </Box>
      </Container>
    </NT4Provider>
  );
}
