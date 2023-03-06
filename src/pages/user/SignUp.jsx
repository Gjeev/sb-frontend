import "../../css/login.css";
import Input from "./Input";
import { useState } from "react";
import { Button, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { signup, verifyCredentials, checkIfUserExists } from "../../actions/user";
import { useHistory } from "react-router-dom";
import { styled } from "@mui/material/styles";
import OtpInput from 'react18-input-otp';
import { USER_VALID_FOR_SIGNUP, USER_ALREADY_EXISTS } from "../../constants";

export default function SignUp() {
  const initialData = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState(initialData);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordsNotMatching, setPasswordsNotMatching] = useState(false);
  const [usernameAlreadyExists, setUsernameAlreadyExists] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const [otpInputDisplay, setOtpInputDisplay] = useState(false);
  const [invalidOTP, setInvalidOTP] = useState(false);
  const [otp, setOtp] = useState();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleChangeOtp = (otp) => {
    setOtp(otp);
  };

  const handleShowPassword = () => {
    const toggle = !showPassword;
    setShowPassword(toggle);
  };
  const handlePasswordsNotMatching = () => {
    setPasswordsNotMatching(true);
  };
  const handleUsernameAlreadyExists = () => {
    setUsernameAlreadyExists(true);
  };
  const handleInvalidOTP = () => {
    setInvalidOTP(true);
  };
  const validSignup = () => {
    try {
      dispatch(checkIfUserExists(formData, handleUsernameAlreadyExists, OTPSendAndDisplayBox));
  }
  catch (error) {
      console.log(error);
  }
  };
  const OTPSendAndDisplayBox = async () => {
    setOtpInputDisplay(true);
    dispatch(verifyCredentials(formData));
  };
  const closeOTPSendAndDisplayBox = () => {
    setOtpInputDisplay(false);
  };
  const handleSubmitOTP = () => {
    // console.log("here");
    setInvalidOTP(false);
    const loginData = { ...formData, otp };
    // console.log(loginData);
    try {
      dispatch(
        signup(loginData, history, handleInvalidOTP, closeOTPSendAndDisplayBox)
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setPasswordsNotMatching(false);
    setUsernameAlreadyExists(false);
    if (formData.password != formData.confirmPassword) {
      handlePasswordsNotMatching();
    } else {
      validSignup();
    }
  };

  return (
    <>
      <div className="login-page">
      {otpInputDisplay &&
                    <div className="otpoverlay">
                        <div className="otpbox">
                            <p className="otpheading">Verify Account</p>
                            <p className="otppara1">
                                An OTP has been sent to your entered email address.
                            </p>
                            <div className="otpElements">
                                <p className="otppara2">Enter your Code here</p>
                                <div className="otp">
                                    <OtpInput className="otpinputsection"
                                        onChange={handleChangeOtp}
                                        value={otp}
                                        inputStyle="inputStyle"
                                        numInputs={6}
                                        separator={<span>-</span>}
                                    />
                                </div>
                                {invalidOTP && <p className="red-error-login">Invalid OTP,please try again.</p>}
                                <p className="otppara2">Didn't receive the code?</p>
                                <p className="resend">Resend</p>
                            </div>
                            <Button type="submit" variant="contained" color="primary" onClick={handleSubmitOTP}>Verify</Button>
                        </div>
                    </div>
                }
        <div className="globe">
          <h1>Sensing Bharat</h1>
          <h4>Search your data and let us provide you the package!</h4>
          <img src="/images/globe.png" />
        </div>
        <div className="login">
          <a href="/">Back</a>
          <h1>Sign Up</h1>
          <p>Please set up your account.</p>
          <form onSubmit={handleSubmit} sx={{ mt: 3, width: 1 }}>
            <Grid container spacing={2}>
              <Input name="name" label="Name" handleChange={handleChange} />
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
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
              {passwordsNotMatching && (
                <p className="red-error-login">
                  Passwords do not match, try again.
                </p>
              )}
              {usernameAlreadyExists && (
                <p className="red-error-login">
                  User already exists, please login.
                </p>
              )}
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mb: 3 }}
            >
              SIGN UP
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
