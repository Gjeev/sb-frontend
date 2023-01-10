import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Body from "./pages/home/Body.jsx";
import Login from './pages/user/Login.jsx';
import SignUp from "./pages/user/SignUp.jsx";
import About from "./pages/about/About.jsx";
// import Cart from "./pages/checkout/Cart.jsx";
import "./css/styles.css";
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import Driver from "driver.js";
import { useEffect } from "react";
import 'driver.js/dist/driver.min.css';
import Contact from "./pages/contact/Contact.jsx";
export default function App()
{
    useEffect(() => {
        const driver = new Driver();

// Define the steps for introduction
driver.defineSteps([
  {
    element: '#first',
    popover: {
      className: 'first-step-popover-class',
      title: 'Hello :)',
      description: 'Welcome to our tutorial! Once you have navigated through the tutorial, you can try it on your own.',
      position: 'bottom'
    }
  },
  {
    element: '.tt-search-box',
    popover: {
      title: 'Enter your location',
      description: 'Click on the search result to automatically move to your location.',
      position: 'bottom'
    }
  },
  {
    element: '.tt-zoom-control',
    popover: {
      title: 'How to zoom in/out?',
      description: 'You can either use the zoom controls or scroll using your mouse!',
      position: 'left'
    }
  },
  {
    element: '.tt-pan-controls',
    popover: {
      title: 'How to move the map?',
      description: 'You can use the direction controls to move or just drag ',
      position: 'left'
    }
  },
  {
    element: '#second',
    popover: {
      title: 'Step 1 - select your layer',
      description: 'We have xyz layers available with more coming soon!',
      position: 'right'
    }
  },
  {
    element: '#third',
    popover: {
      title: 'Step 2 - select the areas of your interest',
      description: 'you can either choose a point or draw a rectangle on the map!',
      position: 'right'
    }
  },
]);

// Start the introduction
if(window.location.href == "http://localhost:5173/"){
    driver.start();
}
    },[]); 
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
                <Login />
                </Route>

                <Route exact path="/sign-up">
                <SignUp />
                </Route>

                <Route exact path="/contact">
                  <Header />
                  <Contact></Contact>
                  <Footer />
                </Route>
                

            </Switch>
        </Router>
            
        </>
    );
}