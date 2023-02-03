import "../css/header.css";
import { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Button, Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { logout } from "../actions/user";
import { useDispatch } from "react-redux";

export default function Header() {
  const history = useHistory();
  const dispatch = useDispatch();
  // button display based on whether user is logged in or not
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const location = useLocation();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const handleUserLogout = () => {
    setUser(null);
  };
  const handleLogoutButtonClick = () => {
    //some checks might need to be done when further features are added
    dispatch(logout(history, handleUserLogout));
  };

  return (
    <>
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
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>
        {user ? (
          <>
            <div className="buttons-information-header">
              <div className="user-name">{user.result.name}</div>
              <div className="user-image picture-user">
                <Avatar
                  sx={{ bgcolor: deepOrange[500] }}
                  alt={user.result.name}
                  src={user.result.picture}
                >
                  {/* {user.result.name.charAt(0).toUpperCase()} */}
                </Avatar>
              </div>
              <div className="icons">
                <img src="./images/cart.svg"></img>
              </div>
              <Button className="buttonhome" onClick={handleLogoutButtonClick}>
                LOG OUT
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="buttons-header">
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
    </>
  );
}
