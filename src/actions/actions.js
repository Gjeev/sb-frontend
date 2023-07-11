import * as api from "../api";

export const sendfeedback = (contactUsFormData) => async (dispatch) => {
  try {
    const item = localStorage.getItem("profile");
    if (item) {
      contactUsFormData = {
        ...contactUsFormData,
        userName: JSON.parse(item).result.email,
      };
    } else {
      contactUsFormData = { ...contactUsFormData, userName: "NOT_LOGGED_IN" };
    }
    api.sendfeedback(contactUsFormData);
  } catch (error) {
    console.log(error);
  }
};
