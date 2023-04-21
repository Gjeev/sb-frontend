import "../../css/panel.css";
import Crop from "./layers/Crop";
import { CropMenuItems } from "./layers/menu-items/crop/item";
import { UrbanMenuItems } from "./layers/menu-items/urban/item";
import { Box, Typography } from "@mui/material";

export default function Panel({ map }) {
  return (
      <Box
        sx={{
          display: "flex",
          width: "8rem",
          height: "100%",
          backgroundColor: "#14151b",
          color: "white",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: "1.5rem 0.5rem 0 0.5rem",
        }}
      >
        <Typography sx={{
          fontFamily: "Inter",
          fontSize: "0.9rem",
          fontWeight: "500",
          color: "#19B1B1",

        }}>India wide Layers</Typography>
        <Box>
        <div className="menu">
        {CropMenuItems.map((item) => {
            return <Crop item={item} map={map}></Crop>;
          })}
          {UrbanMenuItems.map((item) => {
            return <Crop item={item} map={map}></Crop>;
          })}
        </div>

        </Box>
      </Box>
  );
}
