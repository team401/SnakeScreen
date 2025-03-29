import * as React from "react";
import { Box, IconButton, Modal, TextField, Button, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";

interface SettingsProps {
  IP: string;
  setIP: React.Dispatch<React.SetStateAction<string>>;
  setBackgroundMode: React.Dispatch<React.SetStateAction<"static" | "video">>;
  setFullscreen: React.Dispatch<React.SetStateAction<boolean>>;  // Prop to control fullscreen state
}

export default function Settings({ IP, setIP, setBackgroundMode, setFullscreen }: SettingsProps) {
  const [open, setOpen] = React.useState(false);

  // Handle Fullscreen toggle
  const handleFullscreenToggle = () => {
    const elem = document.documentElement;
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setFullscreen(false);
    } else {
      elem.requestFullscreen();
      setFullscreen(true);
    }
  };

  const handleButtonClick = (newIP: string) => {
    if (IP !== newIP) {
      setIP(newIP);
    }
  };

  // Watch for IP change, then reload
  React.useEffect(() => {
    if (IP !== localStorage.getItem("robotIP")) {
      localStorage.setItem("robotIP", IP);
      setTimeout(() => {
        window.location.reload();
      }, 300); // Slight delay ensures the state is updated before reload
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
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.2)" },
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
            width: 500,
            height: 500,
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
              top: 20,
              right: 20,
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
            Background Settings
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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

          {/* Fullscreen button */}
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
        </Box>
      </Modal>
    </>
  );
}
