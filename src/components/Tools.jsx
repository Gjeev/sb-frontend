import { Box } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import TimelineIcon from "@mui/icons-material/Timeline";
import Tooltip from "@mui/material/Tooltip";
import { useEffect, useState } from "react";
import Grid from "./Grid";
//  css in body.css

export default function Tools({
  map,
  setLayerLoad,
  setShowModal,
  showPanel,
}) {
  const [lng, setLng] = useState(null);
  const [lat, setLat] = useState(null);

  useEffect(() => {
    if (map) {
      map.on("mousemove", (e) => {
        setLng(e.lngLat.lng.toFixed(4));
        setLat(e.lngLat.lat.toFixed(4));
      });
    }
  }, [map]);

  return (
    <Box
      sx={{
        width: "calc(100vw - 8rem)",
        height: "2em",
        backdropFilter: "blur(7.3px)",
        WebkitBackdropFilter: "blur(7.3px)",
        background: "rgba(41, 22, 22, 0.57)",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      {lng && lat && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "16px",
            width: "200px",
          }}
        >
          <p>
            {lng}° | {lat}°
          </p>
        </Box>
      )}
      {showPanel && (
        <>
          <Tooltip title="select a point">
            <div className="tool">
              <PlaceIcon
                sx={{
                  fontSize: "1em",
                  padding: "0.5em",
                }}
              />
            </div>
          </Tooltip>

          <Tooltip title="draw a polygon">
            <div className="tool">
              <TimelineIcon
                sx={{
                  fontSize: "1em",
                  padding: "0.5em",
                }}
              />
            </div>
          </Tooltip>

          <Grid
            map={map}
            setLayerLoad={setLayerLoad}
            setShowModal={setShowModal}
          ></Grid>
        </>
      )}
    </Box>
  );
}
