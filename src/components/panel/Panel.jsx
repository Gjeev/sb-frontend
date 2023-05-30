import "../../css/panel.css";
import Crop from "./layers/Crop";
import { CropMenuItems } from "./layers/menu-items/crop/item";
import { UrbanMenuItems } from "./layers/menu-items/urban/item";
import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";

export default function Panel({ map }) {
  const [openPanel, setOpenPanel] = useState(false);
  const handleSVGClick = () => {
    setOpenPanel(!openPanel);
  };
  useEffect(() => {
    if (openPanel) {
      document.querySelector(".left-panel").style.left = "-200px";
    } else {
      document.querySelector(".left-panel").style.left = "0px";
    }
  }, [openPanel]);

  const StyledPanel = styled(Box)(({ openPanel }) => ({
    display: "flex",
    width: "200px",
    height: "100%",
    backgroundColor: "#14151b",
    color: "white",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "1.5rem 0.5rem 0 0.5rem",
  }));

  return (
    <>
    <div data-tut="tour_panel">
    <StyledPanel openPanel={openPanel}>
        <Typography
          sx={{
            fontFamily: "Inter",
            fontSize: "0.9rem",
            fontWeight: "500",
            color: "#19B1B1",
            textAlign: "center",
          }}
        >
          Our Agricultural layers
        </Typography>
        <Box>
          <div className="menu">
            {CropMenuItems.map((item) => {
              return <Crop item={item} map={map}></Crop>;
            })}
          </div>
        </Box>
        <Typography
          sx={{
            fontFamily: "Inter",
            fontSize: "0.9rem",
            fontWeight: "500",
            color: "#19B1B1",
            textAlign: "center",
          }}
        >
          Our Real Estate layers
        </Typography>
        <Box>
          <div className="menu">
            {UrbanMenuItems.map((item) => {
              return <Crop item={item} map={map}></Crop>;
            })}
          </div>
        </Box>
      </StyledPanel>
    </div>

      <div className="panel-opener" onClick={handleSVGClick} >
        <svg
          width="34"
          height="52"
          viewBox="0 0 34 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          data-tut="tour_panelopener"
        >
          <path
            d="M33 1H1V51H33L19.9474 26.3731L33 1Z"
            fill="#D9D9D9"
            stroke="black"
          />
        </svg>
      </div>
    </>
  );
}
