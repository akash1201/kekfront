/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it

import "./src/assets/css/global.css";
import React from "react";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const wrapRootElement = ({ element }) => {
  return (
    <GoogleOAuthProvider clientId="746871060422-c47eq82di72seqd57r9dkhoh9v59fv1k.apps.googleusercontent.com">
      <Provider store={store}>
        <ToastContainer />
        {element}
      </Provider>
    </GoogleOAuthProvider>
  );
};
