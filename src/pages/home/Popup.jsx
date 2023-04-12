import Modal from "@mui/material/Modal";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  modalStyle,
  typographyStyle,
  modalPadding,
  userText,
} from "./popupstyles";
import InsuranceComp from "./InsuranceComp";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Farmer from "./Farmer";

export default function Popup({ showPopup, handleShowPopup, handleShowPanel }) {
  const [open, setOpen] = useState(showPopup);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={typographyStyle}
        >
          Interested in our products
          <ArrowForwardIosIcon sx={{ fontSize: "large" }} />
        </Typography>
        <Box sx={modalPadding}>
          <Typography id="modal-modal-description" sx={userText}>
            Which of these best suit your needs?
          </Typography>
          <InsuranceComp handleShowPopup={handleShowPopup} handleShowPanel={handleShowPanel}/>
          <Farmer />
        </Box>
      </Box>
    </Modal>
  );
}
