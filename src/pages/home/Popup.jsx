import Modal from "@mui/material/Modal";
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

export default function Popup({
  handleShowPanel,
  showPopup,
  handleShowPopup,
  handleShowSetting,
}) {

  const handleClose = (event, reason) => {
    if (reason == "backdropClick") {
      handleShowSetting();
    }
    handleShowPopup(false);
  };

  return (
    <>
      <Modal
        open={showPopup}
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
            <InsuranceComp
              handleClose={handleClose}
              handleShowPanel={handleShowPanel}
            />
            <Farmer />
          </Box>
        </Box>
      </Modal>
    </>
  );
}
