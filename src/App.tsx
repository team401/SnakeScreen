import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Reef from "./Reef";
import ScoringHeight from "./ScoringHeight";
import { Stack } from "@mui/material";
import GPToggle from "./GPToggle";

export default function App() {
  return (
    <Container sx={{ pl: 1 }} maxWidth={false} disableGutters>
      <Box sx={{ m: 0, p: 0 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          SnakeScreen
        </Typography>
        <Stack direction={"row"} spacing={8}>
          <ScoringHeight />
          <Reef />
        </Stack>
        <GPToggle />
      </Box>
    </Container>
  );
}
