import { Box, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles(() => ({
  modal: {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    padding: 50,
    backgroundColor: "#fff",
  },
}));

export default function ModalContent() {
  const classes = useStyles();
  return (
    <Box className={classes.modal}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Text in a modal
      </Typography>
    </Box>
  );
}
