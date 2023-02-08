import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import { grid } from "@mui/system";
import Snackbar from "@mui/material/Snackbar";

export default function List4({
  map,
  gridId,
  onGridIdChange,
  layerLoad,
  setLayerLoad
}) {
  //localGridId is used to store the id of the grids that are clicked
  let localGridId = [...gridId];

  //controls closing of layer menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleLayerLiOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLayerLiClose = () => {
    setAnchorEl(null);
  };

  //alerts the user about the zooming in for optimised loading times
  const [zoomAlert, setZoomAlert] = useState(false);
  const handleZoomAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setZoomAlert(false);
};

  //controls adding & removing of binary mask layer
  // const handleBinaryMaskLayerClick = () => {
  //   addBinaryMaskLayer();
  //   console.log("clicked");
  //   setLayerLoad(true);
  //   setAnchorEl(null);
  // };
  // function addBinaryMaskLayer() {
  //   map.addSource("binaryMask", {
  //     type: "geojson",
  //     data: "https://gjeev.github.io/layers/binarymask.geojson",
  //   });

  //   map.addLayer({
  //     id: "binaryMask-layer",
  //     type: "symbol",
  //     source: "binaryMask",
  //     layout: {
  //       "icon-allow-overlap": true,
  //       "icon-image": "circle-15",
  //       "icon-size": 0.5,
  //     },
  //   });
  // }

  //controls adding & removing of india layer
  const handleIndiaLayerClick = () => {
    addIndiaLayer();
    setLayerLoad(true);
    setAnchorEl(null);
  };
  function addIndiaLayer() {
    if (map.getZoom() < 12) {
      setZoomAlert(true);
      map.flyTo({ zoom: 14 });
    }
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

    //we will check if map has finished rendering the source on the map
    //using the idle event because even if the source is loaded
    //it takes more time to render it on the map.
    map.on("idle", () => {
      if (map.getSource("india") && map.isSourceLoaded("india")) {
        setLayerLoad(false);
      }
    });

    //create popups on clicked grids
    map.on("click", "india-layer", (e) => {
      // setLayerLoad(true);
      let id = e.features[0].properties.id;
      if (localGridId.includes(id)) {
        console.log("this grid already exists");
      } else {
        localGridId.push(id);
        onGridIdChange(localGridId);
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
      }
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
      <Snackbar
        open={zoomAlert}
        autoHideDuration={5000}
        message="the map will zoom in order to decrease loading times!"
        onClose={handleZoomAlertClose}
      />
    </>
  );
}
