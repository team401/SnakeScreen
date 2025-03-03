import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Reef from "./Reef";
import ScoringHeight from "./ScoringHeight";
import { Stack } from "@mui/material";
import GPToggle from "./GPToggle";
import { useEntry, useNt4 } from "@frc-web-components/react";
import Autonomy from "./Autonomy";
import GPIndicator from "./GPIndicator";
import ConnectionStatus from "./ConnectionStatus";

export default function App() {
  const nt4 = useNt4().nt4Provider;

  const [reefTarget, setReefTarget] = useEntry("/reefTarget", -1);
  const [intakeStation, setIntakeStation] = useEntry("/stationTarget", 21);
  const [scoreHeight, setScoreHeight] = useEntry("/scoreHeight", "-1");
  const [gamepiece, setGamepiece] = useEntry("/gpMode", "coral");
  const [autonomy, setAutonomy] = useEntry("/autonomyLevel", "mid");
  const [hasCoral, setHasCoral] = useEntry("/hasCoral", false);
  const [hasAlgae, setHasAlgae] = useEntry("/hasAlgae", false);
  const [isConnected, setConnected] = React.useState(nt4.isConnected());

  useNt4().nt4Provider.addConnectionListener((conn) => {
    setConnected(conn), true;
  });

  return (
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
            <ScoringHeight
              height={scoreHeight}
              setHeight={setScoreHeight}
              gamepiece={gamepiece}
            />
            <GPToggle
              gamepiece={gamepiece}
              setGP={setGamepiece}
              scoreHeight={scoreHeight}
              setScoreHeight={setScoreHeight}
              reefTarget={reefTarget}
              setReefTarget={setReefTarget}
            />
          </Stack>

          <Reef
            gamepiece={gamepiece}
            reefTarget={reefTarget}
            setReefTarget={setReefTarget}
            intakeStation={intakeStation}
            setIntakeStation={setIntakeStation}
          />
          <Stack sx={{ position: "absolute", right: 1, top: 100 }}>
            <GPIndicator name=" Coral " value={hasCoral} />
            <GPIndicator name="Algae" value={hasAlgae} />
          </Stack>
          <Autonomy autonomy={autonomy} setAutonomy={setAutonomy} />
        </Stack>
      </Box>
      <ConnectionStatus isConnected={isConnected} />
    </Container>
  );
}
