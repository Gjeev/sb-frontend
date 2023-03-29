import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import RiceBowlIcon from "@mui/icons-material/RiceBowl";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useState } from "react";
import ParkIcon from "@mui/icons-material/Park";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

export default function LayerMenu({ map }) {
  const [layer, setLayer] = useState("");

  // snackbar which let's the user know
  // that the layer has been added
  // also has an option to remove the layer from the map

  const [openSB, setOpenSB] = useState(false);
  const handleClick = () => {
    setOpenSB(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSB(false);
  };
  const handleRemoveLayer = () => {
    switch (layer) {
      case "sugarcane":
        map.removeLayer("unclustered-point");
        map.removeLayer("cluster-count");
        map.removeLayer("clusters");
        map.removeSource("earthquakes");
        handleClose();

      case "vegetation", "builtup","rice":
        map.setStyle("mapbox://styles/jemm/cle5ppqxd003y01qmqn05pwpf");
        handleClose();

      default:
        break;
    }
  };

  const action = (
    <>
      <Button color="secondary" size="small" onClick={handleRemoveLayer}>
        Remove this Layer
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  // layer menu

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // add layers functions

  const handleRiceLayerUP = () => {
    setAnchorEl(null);
    handleClick();
    setLayer("rice");
    map.setStyle("mapbox://styles/jemm/clftlljk100jp01p4glkjh9tk");
  };

  // const handleRiceLayerWestBengal = () => {};

  const handleSCLayerUP = () => {
    setAnchorEl(null);
    setLayer("sugarcane");
    map.flyTo({ center: [79.4, 30.4], zoom: 6 });
    map.addSource("earthquakes", {
      type: "geojson",
      data: "https://gjeev.github.io/layers/binarymasksugarcane.json",
      cluster: true,
      clusterMaxZoom: 14,
      clusterRadius: 50,
    });

    map.addLayer({
      id: "clusters",
      type: "circle",
      source: "earthquakes",
      filter: ["has", "point_count"],
      paint: {
        "circle-color": [
          "step",
          ["get", "point_count"],
          "#51bbd6",
          100,
          "#f1f075",
          750,
          "#f28cb1",
        ],
        "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
      },
    });

    map.addLayer({
      id: "cluster-count",
      type: "symbol",
      source: "earthquakes",
      filter: ["has", "point_count"],
      layout: {
        "text-field": ["get", "point_count_abbreviated"],
        "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
        "text-size": 12,
      },
    });

    map.addLayer({
      id: "unclustered-point",
      type: "circle",
      source: "earthquakes",
      filter: ["!", ["has", "point_count"]],
      paint: {
        "circle-color": "#11b4da",
        "circle-radius": 4,
        "circle-stroke-width": 1,
        "circle-stroke-color": "#fff",
      },
    });

    map.on("mouseenter", "clusters", () => {
      map.getCanvas().style.cursor = "pointer";
    });
    map.on("mouseleave", "clusters", () => {
      map.getCanvas().style.cursor = "";
    });

    handleClick();
  };

  const handleBuiltUp = () => {
    setLayer("builtup");
    map.flyTo({ center: [80.026, 24.46], zoom: 3.6 });
    map.setStyle("mapbox://styles/jemm/clf2e7e07007101qocb6hpjl4");
    setAnchorEl(null);
    handleClick();
  };

  const handleVegetation = () => {
    setLayer("vegetation");
    map.flyTo({ center: [80.026, 24.46], zoom: 3.6 });
    map.setStyle("mapbox://styles/jemm/clf465b1r001i01o961bjki7v");
    setAnchorEl(null);
    handleClick();
  };

  return (
    <>
      {openSB && (
        <Snackbar
          open={openSB}
          onClose={handleClose}
          message="Layer Set!"
          action={action}
        ></Snackbar>
      )}
      <li id="second" className="list layer-li" onClick={handleMenuOpen}>
        <Tooltip placement="top" title="show layers">
          <img src="/images/panelicon4.png" />
        </Tooltip>
      </li>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: 0,
          horizontal: -10,
        }}
      >
        {/* <MenuItem onClick={handleRiceLayerPunjab}>
          <ListItemIcon>
            <RiceBowlIcon></RiceBowlIcon>
          </ListItemIcon>{" "}
          <ListItemText>Rice Binary Mask Punjab</ListItemText>
        </MenuItem> */}
        {/* <MenuItem onClick={handleRiceLayerWestBengal}>
          <ListItemIcon>
            <LunchDiningIcon></LunchDiningIcon>
          </ListItemIcon>{" "}
          <ListItemText>Rice Binary Mask West Bengal</ListItemText>
        </MenuItem> */}
        <MenuItem onClick={handleSCLayerUP}>
          <ListItemIcon>
            <ParkIcon></ParkIcon>
          </ListItemIcon>{" "}
          <ListItemText>Sugarcane Binary Mask UttarPradesh</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleBuiltUp}>
          <ListItemIcon>
            <AutoFixHighIcon></AutoFixHighIcon>
          </ListItemIcon>{" "}
          <ListItemText>Built up layer</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleVegetation}>
          <ListItemIcon>
            <AutoFixHighIcon></AutoFixHighIcon>
          </ListItemIcon>{" "}
          <ListItemText>India Wide Vegetation layer</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleRiceLayerUP}>
          <ListItemIcon>
            <AutoFixHighIcon></AutoFixHighIcon>
          </ListItemIcon>{" "}
          <ListItemText>Rice Up</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
