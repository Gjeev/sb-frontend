import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Body from "./pages/home/Body.jsx";
import Login from "./pages/user/Login.jsx";
import SignUp from "./pages/user/SignUp.jsx";
import About from "./pages/about/About.jsx";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Driver from "driver.js";
import { useState } from "react";
import ContactUs from "./pages/contact/ContactUs.jsx";
import Cart from "./pages/checkout/Cart";
import { steps } from "./data/driver.js";
import Profile from "./pages/user/Profile.jsx";
import Order from "./pages/order/Order.jsx";

import "./css/styles.css";
import "driver.js/dist/driver.min.css";

export default function App() {

  // Driver.js tutorial
  const [driver, setDriver] = useState(null);
  const handleTutorial = () => {
    if (window.location.href == "https://sensingbharat.com/") {
      const newDriver = new Driver();
      newDriver.defineSteps(steps);
      console.log(steps);
      setDriver(newDriver);
      if (driver) {
        driver.start();
      }
    }
  };


  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Header />
            <Body />
          </Route>

          <Route exact path="/about">
            <Header />
            <About></About>
          </Route>

          <Route exact path="/login">
            <Header />
            <Body />
            <Login />
          </Route>

          <Route exact path="/signUp">
            <Header />
            <Body />
            <SignUp />
          </Route>

          <Route exact path="/contactus">
            <Header />
            <ContactUs />
            <Footer />
          </Route>

          <Route exact path="/cart">
            <Header />
            <Cart />
          </Route>

          <Route exact path="/profile/123">
            <Header />
            <Profile></Profile>
          </Route>

          <Route exact path="/profile/order_id=:order_id">
            <Order></Order>
          </Route>

        </Switch>
      </Router>
    </>
  );
}
