import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ScoringHeight from "./ScoringHeight";
import { Stack } from "@mui/material";
import GPToggle from "./GPToggle";
import { useEntry, useNt4 } from "@frc-web-components/react";
import Autonomy from "./Autonomy";
import GPIndicator from "./GPIndicator";
import ConnectionStatus from "./ConnectionStatus";
import StationToggle from "./stationToggle";
import Settings from "./Settings";

interface IPprops {
  IP: string;
  setIP: React.Dispatch<React.SetStateAction<string>>;
}

export default function App({ IP, setIP }: IPprops) {
  const [intakeStation, setIntakeStation] = useEntry("/stationTarget", "left");
  const [coralHeight, setCoralHeight] = useEntry("/coralHeight", "level4");
  const [algaeScoreHeight, setAlgaeScoreHeight] = useEntry("/algaeScoreHeight", "level4");
  const [algaeIntakeHeight, setAlgaeIntakeHeight] = useEntry("/algaeIntakeHeight", "level3");
  const [gamepiece, setGamepiece] = useEntry("/gpMode", "coral");
  const [autonomy, setAutonomy] = useEntry("/autonomyLevel", "smart");
  const [hasCoral, setHasCoral] = useEntry("/hasCoral", false);
  const [hasAlgae, setHasAlgae] = useEntry("/hasAlgae", false);
  const [isConnected, setConnected] = React.useState(false);
  const [isConnecting, setIsConnecting] = React.useState(false);
  const [backgroundMode, setBackgroundMode] = React.useState<"static" | "video">("static"); 
  const [isFullscreen, setFullscreen] = React.useState(false); 

  const nt4 = useNt4();

  React.useEffect(() => {
    setIsConnecting(true);

    const timeout = setTimeout(() => {
      nt4.nt4Provider.addConnectionListener((conn: boolean) => {
        setConnected(conn);
        setIsConnecting(false);
      }, true);
    }, 500);

    return () => clearTimeout(timeout);
  }, [IP, nt4]);

  return (
    <Box sx={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
      {/* Video Background */}
      {backgroundMode === "video" && (
       <video
       autoPlay
       loop
       muted
       playsInline
       style={{
         position: "absolute",
         top: "50%",
         left: "50%",
         width: "auto",
         height: "100%", // Make it fit height-wise
         transform: "translate(-50%, -50%)", // Center the video
         objectFit: "cover", // Cover the screen without black bars
         zIndex: -1,
       }}
     >
       <source src="./background.mp4" type="video/mp4" />
       Your browser does not support the video tag.
     </video>
      )}

      {/* Static White Background */}
      {backgroundMode === "static" && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "white",
            zIndex: -1,
          }}
        />
      )}

      {/* Main Content */}
      <Container sx={{ position: "relative", pl: 1, zIndex: 1 }} maxWidth={false} disableGutters>
        <Box sx={{ m: 0, p: 0, zIndex: 1 }}>
          <Typography variant="h3" component="h1" sx={{ m: 0, pb: 6 }}>
            <Box sx={{ fontSize: 60, textAlign: "center", m: 0, pb: 0 }}>
              SnakeScreen
            </Box>
          </Typography>
          <Stack direction={"row"} spacing={20} sx={{ my: 0, p: 0, justifyContent: "center" }}>
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
            <Stack direction={"column"} spacing={20} sx={{ px: 0, mx: 0, justifyContent: "space-around" }}>
              <StationToggle station={intakeStation} setStation={setIntakeStation} />
              <Autonomy autonomy={autonomy} setAutonomy={setAutonomy} />
            </Stack>
            <Stack direction={"column"} spacing={7} sx={{ px: 0, mx: 0, justifyContent: "center" }}>
              <GPIndicator name="Coral" value={hasCoral} />
              <GPIndicator name="Algae" value={hasAlgae} />
              <ConnectionStatus isConnected={isConnected} isConnecting={isConnecting} />
            </Stack>
          </Stack>
        </Box>
      </Container>

      {/* Settings Component */}
      <Settings IP={IP} setIP={setIP} setBackgroundMode={setBackgroundMode} setFullscreen={setFullscreen}  />
    </Box>
  );
}
