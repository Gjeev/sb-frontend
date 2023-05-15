import "../../css/login.css";
import Input from "./Input";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Button, Grid, Divider, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { login } from "../../actions/user";
import { useHistory } from "react-router-dom";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import jwt_decode from "jwt-decode";

export default function Login() {
  const initialData = { email: "", password: "" };
  const [formData, setFormData] = useState(initialData);
  const [showPassword, setShowPassword] = useState(false);
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const [usernameDNE, setUsernameDNE] = useState(false);
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();
  const provider = new GoogleAuthProvider();
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID,
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  useLayoutEffect(() => {
    setWidth(ref.current.offsetWidth);
  }, []);

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: `${import.meta.env.VITE_GOOGLE_CLIENT_ID}`,
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large", width: width } // customization attributes
    );
  }, [width]);

  const handleCredentialResponse = (response) => {
    const idToken = response.credential;
    const credential = GoogleAuthProvider.credential(idToken);

    const result = jwt_decode(idToken);
    signInWithCredential(auth, credential).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
    try {
      dispatch({ type: "LOGIN", data: { result, token: idToken } });
      const prevRoute = sessionStorage.getItem("prevRoute") || "/";
      sessionStorage.removeItem("prevRoute");
      history.push(prevRoute);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleShowPassword = () => {
    const toggle = !showPassword;
    setShowPassword(toggle);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setInvalidCredentials(false);
    setUsernameDNE(false);
    dispatch(
      login(formData, history, handleInvalidCredentials, handleUsernameDNE)
    );
  };
  const handleInvalidCredentials = () => {
    setInvalidCredentials(true);
  };
  const handleUsernameDNE = () => {
    setUsernameDNE(true);
  };

  return (
    <div className="login-page">
      <div className="globe">
        <h1>Sensing Bharat</h1>
        <h4>Search your data and let us provide you the package!</h4>
        <img src="/images/globe.png" />
      </div>
      <div className="login">
        <a className="login-link" href="/">
          Back
        </a>
        <h1>Login</h1>
        <p className="login-paragraph">
          Welcome Back! Please Log in to your account.
        </p>
        <form onSubmit={handleSubmit} sx={{ mt: 3, width: 1 }}>
          <Grid container spacing={2}>
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {invalidCredentials && (
              <p className="red-error-login">
                Invalid Username or Password, try again.
              </p>
            )}
            {usernameDNE && (
              <p className="red-error-login">
                Email ID does not exist. Please Sign Up or login with Google
              </p>
            )}
          </Grid>
          <br />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mb: 3 }}
          >
            LOG IN
          </Button>
        </form>

        <a className="login-link fp" href="#">
          Forgot Password?
        </a>
        <Divider className="login-paragraph">OR</Divider>

        <Box id="buttonDiv" ref={ref}></Box>
      </div>
    </div>
  );
}
