import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";

export default function List4(props) {
  const map = props.map;
  const gridId = props.gridId;
  const setGridId = props.setGridId;

  //controls closing of layer menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleLayerLiOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLayerLiClose = () => {
    setAnchorEl(null);
  };

  //controls adding & removing of india layer
  const handleIndiaLayerClick = () => {
    addIndiaLayer();
    setAnchorEl(null);
  };
  function addIndiaLayer() {
    map.addSource("india", {
      type: "geojson",
      // Use a URL for the value for the `data` property.
      data: "https://gjeev.github.io/layers/india.json",
    });

    map.addLayer({
      id: "india-layer",
      type: "fill",
      source: "india",
      paint: {
        "fill-color": "#A4BFC1",
        "fill-opacity": 0.6,
        "fill-outline-color": "#A4BFC1",
      },
    });
    //create popups on clicked grids
    map.on("click", "india-layer", (e) => {
      let id = e.features[0].properties.id;
      setGridId((gridId) => [...gridId, id]);
      let coordinates = e.features[0].geometry.coordinates[0];
      map.addLayer({
        id: `popUp${id}`,
        type: "fill",
        source: {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  coordinates[0],
                  coordinates[1],
                  coordinates[2],
                  coordinates[3],
                  coordinates[4],
                ],
              ],
            },
          },
        },
        layout: {},
        paint: {
          "fill-color": "#A4BFC1",
          "fill-opacity": 1,
          "fill-outline-color": "#A4BFC1",
        },
      });
    });
  }

  return (
    <>
      <li id="second" className="list" onClick={handleLayerLiOpen}>
        <Tooltip placement="top" title="show layers">
          <img src="/images/panelicon4.png" />
        </Tooltip>
      </li>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleLayerLiClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: 0,
          horizontal: -10,
        }}
      >
        <MenuItem onClick={handleIndiaLayerClick}>
          Add India Grid Layer
        </MenuItem>
        <MenuItem onClick={handleLayerLiClose}>Add Binary Mask Layer</MenuItem>
      </Menu>
    </>
  );
}
