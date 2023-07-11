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

LoginCredentials.mailID = import.meta.env.VITE_LOGIN_MAIL_ID;
LoginCredentials.password = import.meta.env.VITE_LOGIN_PASSWORD;
LoginCredentials.use = import.meta.env.VITE_LOGIN_USE_MAIL;

export const login =
  (formData, history, onInvalidCredentials, onUsernameDNE) =>
  async (dispatch) => {
    try {
      const { data } = await api.signIn(formData);
      dispatch({ type: LOGIN, data });
      const prevRoute = sessionStorage.getItem("prevRoute") || "/";
      sessionStorage.removeItem("prevRoute");
      history.push(prevRoute);
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
      const { data } = await api.userExistsCheck(formData);
      continueToOtp();
      return;
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
    const { data } = await api.otpverify(formData);
  } catch (error) {
    console.log(error);
  }
};
export const resendotp = (formData) => async (dispatch) => {
  try {
    const { data } = await api.resendotp(formData);
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
  history.push("/");
};
