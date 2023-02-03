import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
export default function List3(props) {
  const map = props.map;

  //controls closing of layer menu
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleDelLiOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handlDelLiClose = () => {
      setAnchorEl(null);
    };
    const handlDelIndiaLayer = () => {
      setAnchorEl(null);
      map.removeLayer("india-layer");
      map.removeSource("india");
    };

  return (
    <>
      <li className="list" onClick={handleDelLiOpen}>
        <Tooltip placement="top" title="delete grids">
          <img src="/images/panelicon3.png" />
        </Tooltip>
      </li>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handlDelLiClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: 0,
          horizontal: -10,
        }}
      >
        <MenuItem onClick={handlDelIndiaLayer}>
          Remove India Grid Layer
        </MenuItem>
        <MenuItem onClick={handlDelLiClose}>Remove Binary Mask Layer</MenuItem>
      </Menu>
    </>
  );
}
