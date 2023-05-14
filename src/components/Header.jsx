import "../css/header.css";
import { Link, useHistory } from "react-router-dom";
import { Button, Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { logout } from "../actions/user";
import { createPdf } from "../actions/actions";
import { useDispatch, useSelector } from "react-redux";

export default function Header() {
  const history = useHistory();
  const dispatch = useDispatch();

  const isUserLogged = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  const user = useSelector((state) => state.authReducer.user);
  const userToken = useSelector((state) => state.authReducer.token);

  const handleUserLogout = async () => {

  };
  const handleLogoutButtonClick = () => {
    //some checks might need to be done when further features are added
    dispatch(logout(history, handleUserLogout));
  };

  const handlePDFCheck = () => {
    dispatch(createPdf());
  };

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
            <Link to="/profile/123">{user.name}</Link></div>
              <div className="user-image picture-user">
                <Avatar
                  sx={{ bgcolor: deepOrange[500] }}
                  alt={user.name}
                  src={user.picture}
                >
                  {/* { {user.name.charAt(0).toUpperCase()} } */}
                </Avatar>
              </div>
            <div className="icons">
              <Link to="/cart">
                <img src="../../public/images/cart.svg"></img>
              </Link>
            </div>
            <Button className="buttonhome" onClick={handleLogoutButtonClick}>
              LOG OUT
            </Button>
            <Button className="buttonhome" onClick={handlePDFCheck}>
                PDF check
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
  );
}
