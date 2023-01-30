import "../css/panel.css";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
//layer handling yahan pe hoga
export default function Panel(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleLayerOpenClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLayerClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="left-panel">
      <ul>
        <li id="third" className="list">
          <Tooltip placement="top" title="select AOI">
            <img src="/images/panelicon1.png" />
          </Tooltip>
        </li>
        <li className="list">
          <Tooltip placement="top" title="upload to cart">
            <a href="/">
              <img src="/images/panelicon2.png" />
            </a>
          </Tooltip>
        </li>
        <li className="list">
          <Tooltip placement="top" title="delete grids">
            <a href="/">
              <img src="/images/panelicon3.png" />
            </a>
          </Tooltip>
        </li>
        <li id="second" className="list" onClick={handleLayerOpenClick}>
          <Tooltip placement="top" title="show layers">
            <img src="/images/panelicon4.png" />
          </Tooltip>
        </li>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleLayerClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: 0,
            horizontal: -10,
          }}
        >
          <MenuItem onClick={handleLayerClose}>India Grid Layer</MenuItem>
          <MenuItem onClick={handleLayerClose}>Binary Mask Layer</MenuItem>
        </Menu>
      </ul>
    </div>
  );
}
