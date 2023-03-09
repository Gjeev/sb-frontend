import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
export default function DeleteMenu({map}) {

  //controls closing of layer menu
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleDelMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handlDelLiClose = () => {
      setAnchorEl(null);
    };
    const handlDelSCLayer = () => {
      setAnchorEl(null);
      map.removeLayer("sugarcane-layer");
      map.removeSource("sugarcane");
    };

  return (
    <>
      <li className="list delete-list" onClick={handleDelMenuOpen}>
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
        <MenuItem onClick={handlDelSCLayer}>
          Remove Sugarcane Binary Mask UP
        </MenuItem>
      </Menu>
    </>
  );
}
