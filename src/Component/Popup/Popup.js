import { Dialog, Stack, Typography } from "@mui/material";
import React from "react";

const Popup = ({ title, openPopup, handleClose, children }) => {
  return (
    <Dialog onClose={handleClose} open={openPopup}>
      <Typography variant="h5" marginBottom="10px" sx={{ m: 2, mb: 0 }}>
        {title}
      </Typography>

      {children}
    </Dialog>
  );
};

export default Popup;
