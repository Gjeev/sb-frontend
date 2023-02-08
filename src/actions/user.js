import {
  LOGIN,
  LOGOUT,
  INVALID_CREDENTIALS,
  USERNAME_DNE,
  USER_ALREADY_EXISTS,
  USER_VALID_FOR_SIGNUP,
  INVALID_OTP,
} from "../constants";
import * as api from "../api";
import { useDispatch } from "react-redux";
import { Auth, LoginCredentials } from "two-step-auth";

LoginCredentials.mailID = "sensingbharat@gmail.com"; //This should have less secure apps enabled
LoginCredentials.password = "sensingbharatteam@123"; // you can store them in your env variables and access them, it will work fine
LoginCredentials.use = true;
export const login =
  (formData, history, onInvalidCredentials, onUsernameDNE) =>
  async (dispatch) => {
    try {
      const { data } = await api.signIn(formData);
      dispatch({ type: LOGIN, data });
      history.push("/");
    } catch (error) {
      const errorMessage = error.response.data.message;
      switch (errorMessage) {
        case INVALID_CREDENTIALS:
          onInvalidCredentials();
          break;
        case USERNAME_DNE:
          onUsernameDNE();
          break;
        default:
        //no action as of now
      }
    }
  };

export const checkIfUserExists =
  (formData, setUsernameAlreadyExists, continueToOtp) => async (dispatch) => {
    try {
      // console.log(req.body);
      // console.log(formData);
      const { data } = await api.userExistsCheck(formData);
      continueToOtp();
      // res.status(200).json({message:USER_VALID_FOR_SIGNUP});
      return;
      // return USER_VALID_FOR_SIGNUP;
    } catch (error) {
      console.log(error);
      const errorMessage = error.response.data.message;
      console.log(errorMessage);
      switch (errorMessage) {
        case USER_ALREADY_EXISTS:
          setUsernameAlreadyExists();
          return;
        default:
          console.log(error);
      }
    }
  };
export const verifyCredentials = (formData) => async (dispatch) => {
  try {
    // console.log(formData);
    const { data } = await api.otpverify(formData);
  } catch (error) {
    console.log(error);
  }
};

export const signup =
  (loginData, history, setInvalidOTP, closeOTPSendAndDisplayBox) =>
  async (dispatch) => {
    try {
      const { temporary } = await api.validateotp(loginData);
      closeOTPSendAndDisplayBox();
      const { data } = await api.signUp(loginData);
      // console.log(loginData);
      // console.log(data);
      dispatch({ type: LOGIN, data });
      history.push("/");
    } catch (error) {
      console.log(error);
      const errorMessage = error.response.data.message;
      switch (errorMessage) {
        case INVALID_OTP:
          setInvalidOTP();
          return false;
        default:
          break;
      }
    }
  };

export const logout = (history, onUserLogout) => async (dispatch) => {
  dispatch({ type: LOGOUT });
  onUserLogout();
  history.push("/");
};
