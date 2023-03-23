import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function CartMenu({ gridId, map }) {
  //controls closing of layer menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleGridsLiOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleGridsLiClose = () => {
    setAnchorEl(null);
  };
  // const handleSideMenuDelClick = () => {
  //   console.log(id);
  // };
  const handleDeleteAllGrids = () => {
    for (const id of gridId) {
      if (map.getLayer(`popUp${id}`)) {
        map.removeLayer(`popUp${id}`);
      }
    }
    gridId.length = 0;
    handleGridsLiClose();
  };

  // adds selected grids to menu
  const renderList = gridId.map((id) => (
    <MenuItem onClick={handleGridsLiClose} key={id}>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" color="success">
          {id}
        </Button>
        {/* <Button
          variant="contained"
          color="error"
          onClick={handleSideMenuDelClick}
        >
          Delete
        </Button> */}
      </Stack>
    </MenuItem>
  ));
  return (
    <>
      <li id="third" className="list select-list" onClick={handleGridsLiOpen}>
        <Tooltip placement="top" title="edit grids">
          <img src="/images/panelicon1.png" />
        </Tooltip>
        <div className="cart-length">{gridId.length}</div>
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
        <MenuItem>
          {gridId.length > 0 ? (
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteAllGrids}
            >
              Delete All
            </Button>
          ) : null}
        </MenuItem>
      </Menu>
    </>
  );
}