import "../css/header.css";
import { Link, useHistory } from "react-router-dom";
import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { logout } from "../actions/user";
import { createPdf } from "../actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useState, forwardRef } from "react";
import {
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Stack,
} from "@mui/material";
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
  //const userToken = useSelector((state) => state.auth.token);

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
          <Navbar.Brand href="/">SensingBharat</Navbar.Brand>
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
                      const farmId = `Farm-${item.id.substr(0, 4)}`;
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
