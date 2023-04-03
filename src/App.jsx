import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Body from "./pages/home/Body.jsx";
import Login from "./pages/user/Login.jsx";
import SignUp from "./pages/user/SignUp.jsx";
import About from "./pages/about/About.jsx";
import "./css/styles.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Driver from "driver.js";
import { useState, useEffect } from "react";
import "driver.js/dist/driver.min.css";
import ContactUs from "./pages/contact/ContactUs.jsx";
import Cart from "./pages/checkout/Cart";
import { steps } from "./data/driver.js";
import Profile from "./pages/user/Profile.jsx";
import { useSelector } from "react-redux";
export default function App() {
  const user = useSelector((state) => state.authReducer.user);
  const [gridId, setGridId] = useState([]);
  const [open, setOpen] = useState(true);
  const onGridIdChange = (changedArray) => {
    setGridId(changedArray);
  };

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
  useEffect(() => {
    console.log("gridId", gridId);
  }, [gridId]);

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Header gridId={gridId} onGridIdChange={onGridIdChange}/>
            <Body gridId={gridId} onGridIdChange={onGridIdChange} />
          </Route>

          <Route exact path="/about">
            <Header gridId={gridId} onGridIdChange={onGridIdChange}/>
            <About></About>
          </Route>

          <Route exact path="/login">
            <Header gridId={gridId} onGridIdChange={onGridIdChange}/>
            <Body gridId={gridId} onGridIdChange={onGridIdChange} />
            <Login />
          </Route>

          <Route exact path="/signUp">
            <Header gridId={gridId} onGridIdChange={onGridIdChange}/>
            <Body gridId={gridId} onGridIdChange={onGridIdChange} />
            <SignUp />
          </Route>

          <Route exact path="/contactus">
            <Header gridId={gridId} onGridIdChange={onGridIdChange}/>
            <ContactUs />
            <Footer />
          </Route>

          <Route exact path="/cart">
            <Header gridId={gridId} onGridIdChange={onGridIdChange}/>
            <Cart gridId={gridId} onGridIdChange={onGridIdChange} />
          </Route>

          <Route exact path="/profile/123">
            <Header gridId={gridId} onGridIdChange={onGridIdChange}/>
            <Profile></Profile>
          </Route>
        </Switch>
      </Router>
    </>
  );
}
