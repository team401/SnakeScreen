import * as React from "react";
import {Box, IconButton, Modal, TextField, Button, Typography, Switch, FormControlLabel} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import { useEntry } from "@frc-web-components/react";

interface SettingsProps {
  IP: string;
  setIP: React.Dispatch<React.SetStateAction<string>>;
  setBackgroundMode: React.Dispatch<React.SetStateAction<"static" | "video">>;
  setFullscreen: React.Dispatch<React.SetStateAction<boolean>>;
  flipSides: boolean;
  setFlipSides: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Settings({ IP, setIP, setBackgroundMode, setFullscreen, flipSides, setFlipSides}: SettingsProps) {
  const [open, setOpen] = React.useState(false);
  const [speedLevel, setSpeedLevel] = useEntry("/speedLevel", "pro"); 

  const handleFullscreenToggle = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setFullscreen(false);
    } else {
      document.documentElement.requestFullscreen();
      setFullscreen(true);
    }
  };

  const handleButtonClick = (newIP: string) => {
    if (IP !== newIP) {
      setIP(newIP);
    }
  };

  //Watch for IP change,then reload
  React.useEffect(() => {
    if (IP !== localStorage.getItem("robotIP")) {
      localStorage.setItem("robotIP", IP);
      setTimeout(() => {
        window.location.reload();
      }, 300);
    }
  }, [IP]);

  return (
    <>
      <IconButton
        onClick={() => setOpen(true)}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          backgroundColor: "rgb(255, 255, 255)",
          "&:hover": { backgroundColor: "rgb(187, 187, 187)" },
        }}
      >
        <SettingsIcon />
      </IconButton>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 540,
            height: 650,
            bgcolor: "white",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <IconButton
            onClick={() => setOpen(false)}
            sx={{
              scale: "2",
              position: "absolute",
              top: 25,
              right: 25,
              backgroundColor: "rgb(255, 0, 0)",
              "&:hover": { backgroundColor: "rgba(255, 0, 0, 0.85)" },
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h5" sx={{ mb: 2, textAlign: "left" }}>
            Settings
          </Typography>

          <TextField
            label="IP Address"
            variant="outlined"
            fullWidth
            value={IP}
            onChange={(changeIP) => setIP(changeIP.target.value)}
            sx={{ mb: 2, mt: 2, scale: 1.1 }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button onClick={() => handleButtonClick("10.4.1.2")} sx={{ scale: 2 }}>
              ROBOT
            </Button>
            <Button onClick={() => handleButtonClick("localhost")} sx={{ scale: 2 }}>
              SIM
            </Button>
          </Box>

          <Typography variant="h6" sx={{ mt: 3, mb: 1, textAlign: "left" }}>
            Display Settings
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "space-around", gap: 0.5, mt: 6 }}>
            <Button
              onClick={() => setBackgroundMode("static")}
              sx={{ scale: 1.5, bgcolor: "lightgray", "&:hover": { bgcolor: "gray" } }}
            >
              Locked In Mode
            </Button>
            <Button
              onClick={() => setBackgroundMode("video")}
              sx={{ scale: 1.5, bgcolor: "lightblue", "&:hover": { bgcolor: "blue" } }}
            >
              Geeked Mode
            </Button>
          </Box>

          <FormControlLabel
            control={<Switch checked={flipSides} onChange={(e) => setFlipSides(e.target.checked)} />}
            label="sigmalucinda locked in mode"
            sx={{ mt: 4 }}
          />

          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Button
              onClick={handleFullscreenToggle}
              sx={{
                scale: 1.5,
                bgcolor: "lightgreen",
                "&:hover": { bgcolor: "green" },
              }}
            >
              Toggle Fullscreen
            </Button>
          </Box>
           
          <Typography variant="h6" sx={{ mt: 3, mb: 1, textAlign: "left" }}>
            Speed Settings
          </Typography>
              
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4, gap: 2 }}>
            <Button
              variant="contained"
              color="success"
              fullWidth
              sx={{ py: 2 }}
              onClick={() => setSpeedLevel("pro")}
              disabled={speedLevel === "pro"}
            >
              Pro
            </Button>
            <Button
              variant="contained"
              color="warning"
              fullWidth
              sx={{ py: 2 }}
              onClick={() => setSpeedLevel("amateur")}
              disabled={speedLevel === "amateur"}
            >
              Amateur
            </Button>
            <Button
              variant="contained"
              color="error"
              fullWidth
              sx={{ py: 2 }}
              onClick={() => setSpeedLevel("child")}
              disabled={speedLevel === "child"}
            >
              Child
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
