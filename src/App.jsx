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

export default function App() {

  const [endDriver, setEndDriver] = useState(false);

  useEffect(() => {
    const driver = new Driver();

    // Define the steps for introduction
    driver.defineSteps([
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
        element: ".information",
        popover: {
          title: "Displays the coordinates of your pointer",
          description:
            "The website automatically navigates to your current location. You can also search for a location using the search box.",
          position: "bottom",
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
          description: "You cannot add duplicate grids and you can delete the grids you do not want here!",
          position: "right",
        },
      },
      {
        element: ".delete-list",
        popover: {
          title: "Remove the current layer on the map",
          description:
            "You can remove the current layer on the map by clicking on the delete icon.",
          position: "right",
        },
      },
      {
        element: ".cart-list",
        popover: {
          title: "Save your grids to the cart!",
          description:
            "You can save your grids to the cart once you are happy with the selection.",
          position: "right",
        },
      },
    ]);

    // Start the introduction
    if (window.location.href == "http://localhost:5173/") {
      // console.log("working")
      driver.start();
      if(driver.hasNextStep() == null)
      {
        setEndDriver(true);
      }
    }
  }, [endDriver]);
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Header />
            <Body/>
          </Route>

          <Route exact path="/about">
            <Header />
            <About></About>
          </Route>

          <Route exact path="/login">
          <Header />
                <Body/>
                <Login/>
          </Route>

          <Route exact path="/signUp">
          <Header />
                <Body/>
                <SignUp/>
          </Route>

          
          <Route exact path="/contactus">
            <Header />
            <ContactUs/>
            <Footer />
          </Route>
        </Switch>
      </Router>
    </>
  );
}
