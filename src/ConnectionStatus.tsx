import * as React from "react";
import { Alert, Box } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";

type ConStatusProps = {
  isConnected: boolean;
};

export default function ConnectionStatus(props: ConStatusProps) {
  return (
    <Box>
      <Snackbar
        sx={{ height: "70%" }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={true}
      >
        <Alert
          severity={props.isConnected ? "success" : "error"}
          variant="filled"
          icon={false}
          sx={{ width: "100%", fontSize: 30 }}
        >
          {props.isConnected ? "NT Connected" : "Disconnected"}
        </Alert>
      </Snackbar>
    </Box>
  );
}
