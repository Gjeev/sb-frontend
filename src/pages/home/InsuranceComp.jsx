import {
  buttonStyle,
  guideBox,
  guideText,
  guideSmallText,
} from "./popupstyles";
import { Box, Button, Popover, Typography } from "@mui/material";
import { useState } from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import InsightsIcon from "@mui/icons-material/Insights";

export default function InsuranceComp({ handleClose, handleShowPanel }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const guideOpen = Boolean(anchorEl);
  const info = [
    "Region - Taluk, district and state.",
    "Coordinates of the area(s) of interest.",
    "Crop cycles in 1 year",
    "Crop presence",
    "Seasonality of the crop",
  ];

  return (
    <>
      <Button
        variant="contained"
        size="small"
        aria-owns={guideOpen ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        sx={buttonStyle}
        onClick={() => {
          handleShowPanel(true);
          handleClose();
        }}
      >
        Insurance Companies
        <HelpOutlineIcon sx={{ fontSize: "small" }} />
      </Button>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={guideOpen}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={guideBox}>
            <Typography sx={guideText}>
              This option will enable you to generate a downloadable PDF with
              A-grade graphics and data.
            </Typography>
            {info.map((item) => (
              <Typography sx={guideSmallText}>
                <InsightsIcon sx={{ fontSize: "13px" }} /> {item}
              </Typography>
            ))}
          </Box>
        </Box>
      </Popover>
    </>
  );
}
