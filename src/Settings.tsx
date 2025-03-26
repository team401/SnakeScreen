import * as React from "react";
import { Box, IconButton, Modal, TextField, Button, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import { Scale } from "@mui/icons-material";

interface SettingsProps {
  IP: string;
  setIP: React.Dispatch<React.SetStateAction<string>>;
}

export default function Settings({ IP, setIP }: SettingsProps) {
  const [open, setOpen] = React.useState(false);

  const handleButtonClick = (newIP: string) => {
    setIP(newIP);
  };

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

          {/* Text label above the modal */}
          <Typography variant="h5" sx={{ mb: 2, textAlign: "left" }}>
            Settings 
          </Typography>

          <TextField
            label="IP Address"
            variant="outlined"
            fullWidth
            value={IP}
            onChange={(changeIP) => setIP(changeIP.target.value)}
            sx={{ mb: 2, mt: 2 , scale: 1.1}}
            defaultValue={"10.4.1.2"}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button onClick={() => handleButtonClick("10.4.1.2")} sx={{scale:2}}>ROBOT</Button>
            <Button onClick={() => handleButtonClick("localhost")} sx={{scale:2}}>SIM</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
