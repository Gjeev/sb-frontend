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
import Alert from "@mui/material/Alert";
import { Button } from "@mui/material";

export default function App() {
  const [gridId, setGridId] = useState([]);
  const [open, setOpen] = useState(true);
  const onGridIdChange = (changedArray) => {
    setGridId(changedArray);
  };

  // Driver.js tutorial
  const [driver, setDriver] = useState(null);

  useEffect(() => {
    const newDriver = new Driver();
    newDriver.defineSteps([
      {
        element: "#first",
        popover: {
          className: "first-step-popover-class",
          title: "Hello :)",
          description:
            "Welcome to our tutorial! Once you have navigated through the tutorial, you can try it on your own.",
          position: "bottom",
        },
      },
      {
        element: ".buttons-header",
        popover: {
          title: "Sign Up or Login",
          description:
            "Sign up for an account or Login to save your grids and access them later!",
          position: "bottom",
        },
      },
      {
        element: ".information",
        popover: {
          title: "Displays the coordinates of your pointer",
          description:
            "The website automatically navigates to your current location. You can also search for a location using the search box.",
          position: "top",
        },
      },
      {
        element: ".mapboxgl-ctrl-geocoder--input",
        popover: {
          title: "Enter your location in words on in coordinates",
          description:
            "Select from the dropdown list or press enter to navigate to the location!",
          position: "left",
        },
      },
      {
        element: ".layer-li",
        popover: {
          title: "Select the layer you want to view",
          description:
            "We have a selection of data-rich layers to choose from!",
          position: "right",
        },
      },
      {
        element: ".select-list",
        popover: {
          title: "Your selected grids appear here!",
          description:
            "You cannot add duplicate grids and you can delete the grids here!",
          position: "right",
        },
      },
      {
        element: ".delete-list",
        popover: {
          title: "Remove the current layer on the map",
          description:
            "You can remove the current layer on the map by clicking on the delete icon. Not deleting the layer can alter the way the next layer is displayed.",
          position: "right",
        },
      },
      {
        element: ".button-box",
        popover: {
          title: "Select a grid",
          description:
            "Click on a grid to select it. You can also remove the grid layer by clicking on the button.",
          position: "left",
        },
      },
      {
        element: ".tut-about",
        popover: {
          title: "Interested in learning more about us?",
          description:
            "Click on the about us button to learn more about us and our mission!",
          position: "bottom",
        },
      },
    ]);

    setDriver(newDriver);
  }, []);

  const handleTutorial = () => {
    if (window.location.href == "https://sensingbharat.com/") {
      driver.start();
    }
  };

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Header />
            {open && (
              <Alert severity="info" onClose={() => setOpen(false)}>
                Welcome to our website! We are currently in the process of
                developing our website. Please bear with us as we work on it.
                Thank you!
                <Button variant="contained" onClick={handleTutorial}>
                  Click here to see a tutorial!
                </Button>
              </Alert>
            )}
            <Body gridId={gridId} onGridIdChange={onGridIdChange} />
          </Route>

          <Route exact path="/about">
            <Header />
            <About></About>
          </Route>

          <Route exact path="/login">
            <Header />
            <Body gridId={gridId} onGridIdChange={onGridIdChange} />
            <Login />
          </Route>

          <Route exact path="/signUp">
            <Header />
            <Body gridId={gridId} onGridIdChange={onGridIdChange} />
            <SignUp />
          </Route>

          <Route exact path="/contactus">
            <Header />
            <ContactUs />
            <Footer />
          </Route>

          <Route exact path="/cart">
            <Header />
            <Cart gridId={gridId} onGridIdChange={onGridIdChange} />
          </Route>
        </Switch>
      </Router>
    </>
  );
}
