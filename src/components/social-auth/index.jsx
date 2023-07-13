import React from "react";
import FacebookAuth from "./facebook";
import GoogleAuth from "./google";

const SocialAuth = () => {

    return (
        <div className="form-login mt-10">        
         <div className="social-auth">
             <FacebookAuth />
             <GoogleAuth />
         </div>
        </div>
    );
};

export default SocialAuth;
