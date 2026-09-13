import { useId } from "react";
import { Box, Modal, Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// Centered MUI modal with a title. Shared by every "edit" dialog in the app.
const ModalBox = ({ open, onClose, title, children }) => {
  const titleId = useId();
  return (
    <Modal open={open} onClose={onClose} aria-labelledby={titleId}>
      <Box sx={style}>
        <Typography id={titleId} variant="h6" component="h2">
          {title}
        </Typography>
        {children}
      </Box>
    </Modal>
  );
};

export default ModalBox;
