import * as React from "react";
import { Alert, Box } from "@mui/material";

type ConStatusProps = {
  isConnected: boolean;
  isConnecting: boolean; 
};

export default function ConnectionStatus({ isConnected, isConnecting }: ConStatusProps) {
  let statusText = "Disconnected";
  let severity: "success" | "error" | "info" = "error";

  if (isConnecting) {
    statusText = "Connecting...";
    severity = "info";
  } else if (isConnected) {
    statusText = "NT Connected";
    severity = "success";
  }

  return (
    <Box>
      <Alert
        severity={severity}
        variant="filled"
        icon={false}
        sx={{ width: "100%", fontSize: 30 }}
      >
        {statusText}
      </Alert>
    </Box>
  );
}
