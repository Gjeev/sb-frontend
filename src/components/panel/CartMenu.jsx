import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function CartMenu({gridId}) {

  //controls closing of layer menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleGridsLiOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleGridsLiClose = () => {
    setAnchorEl(null);
  };

  // adds selected grids to menu
  const renderList = gridId.map((id) => (
    <MenuItem onClick={handleGridsLiClose} key={id}>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" color="success">
          {id}
        </Button>
      </Stack>
    </MenuItem>
  ));
  return (
    <>
      <li id="third" className="list select-list" onClick={handleGridsLiOpen}>
        <Tooltip placement="top" title="selected grids">
          <img src="/images/panelicon1.png" />
        </Tooltip>
      </li>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleGridsLiClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: 0,
          horizontal: -10,
        }}
      >
        {renderList}
      </Menu>
    </>
  );
}
