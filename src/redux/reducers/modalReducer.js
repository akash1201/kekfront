import { SHOW_MODAL, HIDE_MODAL, TOGGLE_ACTIVE } from "../types/modalType";
const initialState = {
  show: false,
  active: "character",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        show: true,
      };
    case TOGGLE_ACTIVE:
      return {
        active: action.payload,
      };

    case HIDE_MODAL:
      return {
        show: false,
      };

    default:
      return state;
  }
};

export default authReducer;
