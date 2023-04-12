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
      return {
        ...state,
        isAuthenticated: true,
        user: action.data.result,
        token: action.data.token,
      };
    case LOGOUT:
      return { ...state, isAuthenticated: false, user: null, token: null };
    default:
      return state;
  }
};
export default authReducer;
