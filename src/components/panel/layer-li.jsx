import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import RiceBowlIcon from "@mui/icons-material/RiceBowl";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useState } from "react";
import ParkIcon from "@mui/icons-material/Park";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

export default function LayerMenu({ map }) {

  //controls snakcbar
  const [openSB, setOpenSB] = useState(false);
  const handleClick = () => {
    setOpenSB(true);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSB(false);
  };

  const action = (
    <>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
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
  //controls closing of layer menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleRiceLayerPunjab = () => {
    setAnchorEl(null);
    handleClick();
    map.addSource("rice", {
      type: "image",
      url: "https://gjeev.github.io/layers/PB_onlyrice.png",
      coordinates: [
        [73.8707565171, 32.5761012214],
        [76.928, 32.576],
        [76.92937, 29.546575],
        [73.876018, 29.547445],
      ],
    });
    map.addLayer({
      id: "rice-layer",
      type: "raster",
      source: "rice",
      paint: {
        "raster-fade-duration": 0,
      },
    });
  };

  const handleRiceLayerWestBengal = () => {};

  const handleSCLayerUP = () => {
    setAnchorEl(null);
    map.flyTo({ center:[79.4, 30.4,], zoom: 6})
    map.loadImage(
      "https://gjeev.github.io/layers/purple-sugarcane.png",
      function (error, image) {
        if (error) throw error;
        map.addImage("pcane", image);
        map.addSource("sugarcane", {
          type: "geojson",
          // Use a URL for the value for the `data` property.
          data: "https://gjeev.github.io/layers/binarymask.json",
        });

        map.addLayer({
          id: "sugarcane-layer",
          type: "symbol",
          source: "sugarcane",
          layout: {
            "icon-image": "pcane",
          },
        });
      }
    );
  };

  return (
    <>
    {openSB && <Snackbar
    open={openSB}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Note archived"
        action={action}
        ></Snackbar>}
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
        <MenuItem onClick={handleRiceLayerPunjab}>
          <ListItemIcon>
            <RiceBowlIcon></RiceBowlIcon>
          </ListItemIcon>{" "}
          <ListItemText>Rice Binary Mask Punjab</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleRiceLayerWestBengal}>
          <ListItemIcon>
            <RiceBowlIcon></RiceBowlIcon>
          </ListItemIcon>{" "}
          <ListItemText>Rice Binary Mask West Bengal</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleSCLayerUP}>
          <ListItemIcon>
            <ParkIcon></ParkIcon>
          </ListItemIcon>{" "}
          <ListItemText>Sugarcane Binary Mask UttarPradesh</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
