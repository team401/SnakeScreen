import * as React from "react";
import { Alert, Box } from "@mui/material";

type ConStatusProps = {
  isConnected: boolean;
};

export default function ConnectionStatus(props: ConStatusProps) {
  return (
    <Box>
      <Alert
        severity={props.isConnected ? "success" : "error"}
        variant="filled"
        icon={false}
        sx={{ width: "100%", fontSize: 30 }}
      >
        {props.isConnected ? "NT Connected" : "Disconnected"}
      </Alert>
    </Box>
  );
}
