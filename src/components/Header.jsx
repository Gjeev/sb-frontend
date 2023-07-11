import "../css/header.css";
import {  useHistory } from "react-router-dom";
import { logout } from "../actions/user";
import { useDispatch, useSelector } from "react-redux";
import { forwardRef } from "react";
import { Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import { Dropdown } from "react-bootstrap";
export default function Header() {
  const history = useHistory();
  const dispatch = useDispatch();

  const isUserLogged = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  // gridId is referred to as cartData here as it is
  // used to display the number of items in the cart

  const cartData = useSelector((state) => state.cart.items || []);

  const handleUserLogout = async () => {};
  const handleLogoutButtonClick = () => {

    dispatch(logout(history, handleUserLogout));
  };

  const CustomCartToggle = forwardRef(({ onClick }, ref) => (
    <div
      className="cart-icon"
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <Badge badgeContent={cartData.length} color="secondary">
        <ShoppingCartIcon />
      </Badge>
    </div>
  ));

  return (
    <div className="header">
      <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: "white" }}>
        <Container>
          <Navbar.Brand href="/">RemSensing Bharat</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="What do we do" id="collasible-nav-dropdown">
                <NavDropdown.Item href="">Meet the team</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/about">Our Products</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="">Our Mission</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/contactus">Contact Us</Nav.Link>
              <Nav.Link href="">Pricing</Nav.Link>
            </Nav>
            <Nav>
              <Dropdown>
                <Dropdown.Toggle
                  as={CustomCartToggle}
                  id="dropdown-custom-components"
                ></Dropdown.Toggle>
                <Dropdown.Menu>
                  {cartData.length > 0 ? (
                    cartData.map((item) => {
                      let farmId = "";
                      if (typeof item.id == "number") {
                        const idToString = item.id.toString();
                        farmId = `Grid-${idToString.substr(0, 4)}`;
                      } else {
                        farmId = `Farm-${item.id.substr(0, 4)}`;
                      }
                      return (
                        <Dropdown.Item key={farmId}>{farmId}</Dropdown.Item>
                      );
                    })
                  ) : (
                    <Dropdown.Item>Empty!</Dropdown.Item>
                  )}
                  <Dropdown.Divider />
                  <div className="checkout-btn">
                    <Button href="/cart">Checkout</Button>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
              {isUserLogged ? (
                <>
                  <Nav className="nav-components">
                    <Nav.Link href="/profile/123">{user.name}</Nav.Link>
                    <Button
                      className="login-btn"
                      onClick={handleLogoutButtonClick}
                    >
                      Logout
                    </Button>
                  </Nav>
                </>
              ) : (
                <>
                  <Nav className="join-btns">
                    <Button className="login-btn" href="/login">
                      Login
                    </Button>
                    <Button className="login-btn" href="/signup">
                      Sign Up
                    </Button>
                  </Nav>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
