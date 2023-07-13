import React, { useState, useEffect } from "react";
import { navigate } from "gatsby";
import { useDispatch, useSelector } from 'react-redux';
import FacebookLogin from '@greatsumini/react-facebook-login';
import { facebookAuth } from "../../../service/auth";
import { setStorage } from "../../../utils/functions";
import { LOGIN_SUCCESS } from "../../../redux/types/authTypes";

const FacebookAuth = () => {

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const {isLoggedIn} = useSelector(state => state?.auth);

    useEffect(() => {
        if(isLoggedIn){
           navigate('/');
        }
    }, [isLoggedIn]);


    const handleLogin = (response) => {
          // Handle the login response here
          const payload = {
                    facebook: {
                      id: response?.userID,
                      name: response?.name,
                      email: response?.email
                    }
                  }
                  facebookAuth(payload)
                  .then(response => {
                    setLoading(false);
                    console.log(response)
                    setStorage('userInfo', JSON.stringify(response));
                    dispatch({type: LOGIN_SUCCESS, payload: response});
                })
                .catch((err) => {
                    setLoading(false);
                    console.log(err);
                })
        };

    return (
            <div className="single-fild">
               <FacebookLogin
                    appId={process.env.GATSBY_FACEBOOK_APP_ID}
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={handleLogin}
                    />
            </div>
    );
};

export default FacebookAuth;
