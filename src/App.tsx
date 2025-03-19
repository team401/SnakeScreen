import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Reef from "./Reef";
import ScoringHeight from "./ScoringHeight";
import { Grid, Stack } from "@mui/material";
import GPToggle from "./GPToggle";
import {
  BooleanBox,
  NT4Provider,
  useEntry,
  useNt4,
} from "@frc-web-components/react";
import Autonomy from "./Autonomy";
import GPIndicator from "./GPIndicator";
import ConnectionStatus from "./ConnectionStatus";
import StationToggle from "./stationToggle";

export default function App() {
  const nt4 = useNt4().nt4Provider;

  const [reefTarget, setReefTarget] = useEntry("/reefTarget", 10);
  const [intakeStation, setIntakeStation] = useEntry("/stationTarget", "left");
  const [coralHeight, setCoralHeight] = useEntry("/coralHeight", "level4");
  const [algaeHeight, setAlgaeHeight] = useEntry("/algaeHeight", "level4");
  const [gamepiece, setGamepiece] = useEntry("/gpMode", "coral");
  const [autonomy, setAutonomy] = useEntry("/autonomyLevel", "smart");
  const [hasCoral, setHasCoral] = useEntry("/hasCoral", false);
  const [hasAlgae, setHasAlgae] = useEntry("/hasAlgae", false);
  const [isConnected, setConnected] = React.useState(nt4.isConnected());

  useNt4().nt4Provider.addConnectionListener((conn: boolean) => {
    setConnected(conn), true;
  });

  return (
    <Container sx={{ pl: 1 }} maxWidth={false} disableGutters>
      <Box sx={{ m: 0, p: 0, zIndex: 1 }}>
        <Typography variant="h3" component="h1" sx={{ m: 0, pb: 6 }}>
          <Box sx={{ fontSize: 60, textAlign: "center", m: 0, pb: 0 }}>
            SnakeScreen
          </Box>
        </Typography>
        <Stack
          direction={"row"}
          spacing={20}
          sx={{ my: 0, p: 0, justifyContent: "center" }}
        >
          <Stack direction={"column"} spacing={7} sx={{ px: 0, mx: 0 }}>
            <GPToggle
              gamepiece={gamepiece}
              setGP={setGamepiece}
              reefTarget={reefTarget}
              setReefTarget={setReefTarget}
            />
            <ScoringHeight
              coralHeight={coralHeight}
              setCoralHeight={setCoralHeight}
              algaeHeight={algaeHeight}
              setAlgaeHeight={setAlgaeHeight}
            />
          </Stack>
          <Stack direction={"column"} spacing={20} sx={{ px: 0, mx: 0 }}>
            <StationToggle
              station={intakeStation}
              setStation={setIntakeStation}
            />
            <Autonomy autonomy={autonomy} setAutonomy={setAutonomy} />
          </Stack>

          <Stack direction={"column"} spacing={7} sx={{ px: 0, mx: 0 }}>
            <GPIndicator name=" Coral " value={hasCoral} />
            <GPIndicator name="Algae" value={hasAlgae} />
            <ConnectionStatus isConnected={isConnected} />
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
}
