import { getStorage } from "../../utils/functions";
import { LOGIN_SUCCESS, LOGOUT } from "../types/authTypes";
const initialState = {
  userInfo: getStorage("userInfo") ? JSON.parse(getStorage("userInfo")) : null,
  isLoggedIn: getStorage("userInfo") ? true : false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        isLoggedIn: true,
      };

    case LOGOUT:
      return {
        ...state,
        userInfo: null,
        isLoggedIn: false,
      };

    // Add more cases for other authentication-related actions if needed

    default:
      return state;
  }
};

export default authReducer;
