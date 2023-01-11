// map on load style on load changes to be made
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import "../css/panel.css";
import Tooltip from "@mui/material/Tooltip";
import tt from "@tomtom-international/web-sdk-maps";
import { data } from "../data/data.js";
import { useEffect, useState, useRef } from "react";
export default function Panel(props) {
  const [gridLayer, setGridLayer] = useState(false);
  const progressRef = useRef(null);
  // const [isSourceLoaded, setIsSourceLoaded] = useState(false);
  //adding and removing layers;
  function addLayer(boolean) {
    
    if (boolean == true) {
      props.map.addLayer({
        id: "gridOverlay",
        type: "fill",
        source: {
          type: "geojson",
          data: data,
        },
        layout: {},
        paint: {
          "fill-color": "#A4BFC1",
          "fill-opacity": 0.6,
          "fill-outline-color": "black",
        },
      });
      // console.log(props.map.MapDataEvent);
    } else {
      if (props.map.isSourceLoaded("gridOverlay") == true) {
        props.map.removeLayer("gridOverlay");
        props.map.removeSource("gridOverlay");
      } else {
        console.log("source is loading,pls wait , add spinner");
      }
    }
  }

  function handleLayerClick() {
    addLayer(!gridLayer);
    setGridLayer(!gridLayer);
  }

  return (
    <div className="left-panel">
      <ul>
        <li id="third">
          <Tooltip placement="top" title="select AOI">
            <img src="/images/panelicon1.png" />
          </Tooltip>
        </li>
        <li>
          <Tooltip placement="top" title="upload to cart">
            <a href="/">
              <img src="/images/panelicon2.png" />
            </a>
          </Tooltip>
        </li>
        <li>
          <Tooltip placement="top" title="delete grids">
            <a href="/">
              <img src="/images/panelicon3.png" />
            </a>
          </Tooltip>
        </li>
        <li onClick={handleLayerClick} id="second">
          <Tooltip placement="top" title="show layers">
            <img src="/images/panelicon4.png" />
          </Tooltip>
        </li>
      </ul>
      <div className="progress-close" ref={progressRef} id="progress">
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      </div>
    </div>
  );
}
