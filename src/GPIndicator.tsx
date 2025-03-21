import * as React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { BooleanBox, useEntry } from "@frc-web-components/react";

type gpInfo = {
  name: string;
  value: boolean;
};

export default function GPIndicator(props: gpInfo) {
  return (
    <Box
      sx={{
        p: 0,
        m: 0,
      }}
    >
      <Stack direction={"row"} textAlign={"right"}>
        <Typography
          variant="h4"
          component="h1"
          textAlign={"center"}
          sx={{ m: 0, pt: 3, width: 160 }}
        >
          Has {props.name}
        </Typography>
        <BooleanBox value={props.value}></BooleanBox>
      </Stack>
    </Box>
  );
}
