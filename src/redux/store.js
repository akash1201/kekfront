import { legacy_createStore as createStore, combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import modalReducer from "./reducers/modalReducer"
const rootReducer = combineReducers({
  auth: authReducer,
  modal: modalReducer
});

const store = createStore(rootReducer);

export default store;