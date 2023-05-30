import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Body from "./pages/home/Body.jsx";
import Login from "./pages/user/Login.jsx";
import SignUp from "./pages/user/SignUp.jsx";
import About from "./pages/about/About.jsx";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ContactUs from "./pages/contact/ContactUs.jsx";
import Cart from "./pages/checkout/Cart";
import Profile from "./pages/user/Profile.jsx";
import Order from "./pages/order/Order.jsx";
import "./css/styles.css";
export default function App() {

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <div className="app">
              <Header />
              <Body />
            </div>
          </Route>

          <Route exact path="/about">
            <Header />
            <About></About>
          </Route>

          <Route exact path="/login">
            <Header />
            <Body  />
            <Login />
          </Route>

          <Route exact path="/signUp">
            <Header />
            <Body  />
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
