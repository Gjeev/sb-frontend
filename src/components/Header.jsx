import "../css/header.css";
import { Link, useHistory } from "react-router-dom";
import { Button, Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { logout } from "../actions/user";
import { createPdf } from "../actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Stack,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function Header() {
  const history = useHistory();
  const dispatch = useDispatch();

  const isUserLogged = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const userToken = useSelector((state) => state.auth.token);

  // gridId is referred to as cartData here (sorries)

  const cartData = useSelector((state) => state.cart.items || []);

  const handleUserLogout = async () => {};
  const handleLogoutButtonClick = () => {
    //some checks might need to be done when further features are added
    dispatch(logout(history, handleUserLogout));
  };

  const handlePDFCheck = () => {
    dispatch(createPdf());
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleCartClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCartClose = () => {
    setAnchorEl(null);
  };

  const renderList = cartData.map((item) => {
    return (
      <MenuItem onClick={handleCartClose} key={item.id}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Button variant="outlined" size="small">
            {item.geometry.type === "Polygon"
              ? (() => {
                  let truncatedId = item.id.substring(0, 5);
                  let farmName = `Farm-${truncatedId}`;
                  return farmName;
                })()
              : item.id}
          </Button>
        </Stack>
      </MenuItem>
    );
  });

  return (
    <header>
      <div className="logosection">
        <div id="logo">
          <img src="./images/logo.svg" alt="LOGO" />
        </div>
        <div id="logotext">SensingBharat</div>
      </div>
      <div className="nav-items">
        <ul>
          <li id="first">
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about" className="tut-about">
              About
            </a>
          </li>

          <li>
            <a href="/contactus">Contact Us</a>
          </li>
        </ul>
      </div>
      {isUserLogged ? (
        <>
          <div className="buttons-information-header">
            <div className="user-name">
              <Link to="/profile/123">{user.name}</Link>
            </div>
            <div className="user-image picture-user">
              <Avatar
                sx={{ bgcolor: deepOrange[500] }}
                alt={user.name}
                src={user.picture}
              >
                {/* { {user.name.charAt(0).toUpperCase()} } */}
              </Avatar>
            </div>
            <div className="icons" onClick={handleCartClick}>
              <IconButton
                aria-controls="cart-menu"
                aria-haspopup="true"
                onClick={handleCartClick}
                color="inherit"
              >
                <Badge badgeContent={cartData.length} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </div>
            <Menu
              id="cart-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={handleCartClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: 0,
                horizontal: -10,
              }}
            >
              {cartData.length > 0 ? (
                renderList
              ) : (
                <MenuItem>
                  <Typography
                    variant="subtitle1"
                    sx={{ py: 2, textAlign: "center" }}
                  >
                    Your cart is empty. High class reports, few clicks away.
                  </Typography>
                </MenuItem>
              )}
              <MenuItem>
                {cartData.length > 0 ? (
                  <Button
                    variant="contained"
                    color="info"
                    component="a"
                    href="/cart"
                    rel="noopener"
                  >
                    Checkout
                  </Button>
                ) : null}
              </MenuItem>
            </Menu>
            <Button className="buttonhome" onClick={handleLogoutButtonClick}>
              LOG OUT
            </Button>
            {/* <Button className="buttonhome" onClick={handlePDFCheck}>
                PDF check
              </Button> */}
          </div>
        </>
      ) : (
        <>
          <div className="buttons-header">
            <div className="icons" onClick={handleCartClick}>
              <IconButton
                aria-controls="cart-menu"
                aria-haspopup="true"
                onClick={handleCartClick}
                color="inherit"
              >
                <Badge badgeContent={cartData.length} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </div>
            <Menu
              id="cart-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={handleCartClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: 0,
                horizontal: -10,
              }}
            >
              {cartData.length > 0 ? (
                renderList
              ) : (
                <>
                  <MenuItem>
                    <Typography
                      variant="subtitle1"
                      sx={{ py: 2, textAlign: "center" }}
                    >
                      Your cart is empty. High class reports, few clicks away.
                    </Typography>
                  </MenuItem>
                </>
              )}
              <MenuItem>
                {cartData.length > 0 ? (
                  <>
                    <Button
                      variant="contained"
                      color="info"
                      component="a"
                      href="/cart"
                      rel="noopener"
                    >
                      Checkout
                    </Button>
                  </>
                ) : null}
              </MenuItem>
            </Menu>
            <Button className="buttonhome" component={Link} to="/login">
              LOG IN
            </Button>
            <Button className="buttonhome" component={Link} to="/signUp">
              SIGN UP
            </Button>
          </div>
        </>
      )}
    </header>
  );
}
