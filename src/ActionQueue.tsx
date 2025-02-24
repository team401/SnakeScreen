import * as React from "react";
import {
  Box,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useEntry } from "@frc-web-components/react";

let initialQueue: string[] = [];

export default function ActionQueue() {
  const [actionQueue, setQueue] = useEntry("/actionQueue", initialQueue);
  const [selected, setSelected] = useEntry("/scoreHeight", "-1");
  const [target, setTarget] = useEntry("/reefTarget", -1);
  const [gpMode, setGP] = useEntry("/gpMode", "-1");

  return (
    <Box>
      <Button
        variant="contained"
        sx={{ width: 200 }}
        onClick={() =>
          setQueue([...actionQueue, gpMode + "/" + target + "/" + selected])
        }
      >
        Add to Queue
      </Button>
      {actionQueue.map((entry, idx) => (
        <Typography sx={{ p: 0, m: 0 }}>
          {entry.toUpperCase().replaceAll("/", " ")}
        </Typography>
      ))}
    </Box>
  );
}
