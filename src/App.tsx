import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ScoringHeight from "./ScoringHeight";
import { Stack } from "@mui/material";
import GPToggle from "./GPToggle";
import { NT4Provider, useEntry, useNt4 } from "@frc-web-components/react";
import Autonomy from "./Autonomy";
import GPIndicator from "./GPIndicator";
import ConnectionStatus from "./ConnectionStatus";
import StationToggle from "./stationToggle";
import Settings from "./Settings"; // Import Settings component

export default function App() {
  const [intakeStation, setIntakeStation] = useEntry("/stationTarget", "left");
  const [coralHeight, setCoralHeight] = useEntry("/coralHeight", "level4");
  const [algaeScoreHeight, setAlgaeScoreHeight] = useEntry(
    "/algaeScoreHeight",
    "level4"
  );
  const [algaeIntakeHeight, setAlgaeIntakeHeight] = useEntry(
    "/algaeIntakeHeight",
    "level3"
  );
  const [gamepiece, setGamepiece] = useEntry("/gpMode", "coral");
  const [autonomy, setAutonomy] = useEntry("/autonomyLevel", "smart");
  const [hasCoral, setHasCoral] = useEntry("/hasCoral", false);
  const [hasAlgae, setHasAlgae] = useEntry("/hasAlgae", false);
  const [isConnected, setConnected] = React.useState(false);

  const [IP, setIP] = React.useState("10.4.1.2"); // IP state for your settings modal

  useNt4().nt4Provider.addConnectionListener((conn: boolean) => {
    setConnected(conn), true;
  });

  return (
    <NT4Provider address={IP}> {/* Pass IP to NT4Provider */}
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
              <GPToggle gamepiece={gamepiece} setGP={setGamepiece} />
              <ScoringHeight
                coralHeight={coralHeight}
                setCoralHeight={setCoralHeight}
                algaeScoreHeight={algaeScoreHeight}
                setAlgaeScoreHeight={setAlgaeScoreHeight}
                algaeIntakeHeight={algaeIntakeHeight}
                setAlgaeIntakeHeight={setAlgaeIntakeHeight}
              />
            </Stack>
            <Stack
              direction={"column"}
              spacing={20}
              sx={{ px: 0, mx: 0, justifyContent: "space-around" }}
            >
              <StationToggle
                station={intakeStation}
                setStation={setIntakeStation}
              />
              <Autonomy autonomy={autonomy} setAutonomy={setAutonomy} />
            </Stack>
            <Stack
              direction={"column"}
              spacing={7}
              sx={{ px: 0, mx: 0, justifyContent: "center" }}
            >
              <GPIndicator name=" Coral " value={hasCoral} />
              <GPIndicator name="Algae" value={hasAlgae} />
              <ConnectionStatus isConnected={isConnected} />
            </Stack>
          </Stack>
        </Box>
      </Container>
      <Settings IP={IP} setIP={setIP} /> {/* Settings is now part of App */}
    </NT4Provider>
  );
}
