import React from 'react';
import { navigate } from 'gatsby';
import PropTypes from "prop-types";
import { useEffect } from 'react';
import { getStorage } from '../../utils/functions';

const PrivateRoute = ({ children }) => {

 useEffect(() => {
          if(!getStorage('userInfo')){
                    navigate('/login');
          }
 }, [])

  return <React.Fragment>{children}</React.Fragment>;
};

PrivateRoute.propTypes = {
          children: PropTypes.element
      };

export default PrivateRoute;