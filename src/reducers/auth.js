import { LOGIN, LOGOUT } from "../constants";
const authReducer = (
  state = {
    isAuthenticated: false,
    user: null,
    token: null,
  },
  action
) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem("profile", JSON.stringify({ ...action.data }));
      return {
        ...state,
        isAuthenticated: true,
        user: action.data.result,
        token: action.data.token,
      };
    case LOGOUT:
      localStorage.removeItem("profile");
      // console.log(action.data);
      // console.log(state);
      return { ...state, isAuthenticated: false, user: null, token: null };
    default:
      return state;
  }
};
export default authReducer;
