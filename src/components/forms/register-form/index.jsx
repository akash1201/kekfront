import React, { useState, useEffect } from "react";
import { StaticImage } from "gatsby-plugin-image";
import Button from "../../../components/shared/button";
import { Link, navigate } from "gatsby";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import ReactLoading from 'react-loading';
import { signup } from "../../../service/auth";
import { setStorage } from "../../../utils/functions";
import { LOGIN_SUCCESS } from "../../../redux/types/authTypes";
import FacebookAuth from "../../social-auth/facebook";
import SocialAuth from "../../social-auth";


const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const RegisterForm = () => {

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required').matches(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Enter a valid name').min(1).max(35, 'Max 35 characters allowed'),
        email: Yup.string().email('Invalid email address').matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email').required('Email is required'),
        password: Yup.string().required('Password is required').matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, 'Password must have one special character, one number,one upper case and one lower case letter').min(6, 'Min 6 characters required'),
        confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
        });

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const {isLoggedIn} = useSelector(state => state?.auth);

    useEffect(() => {
        if(isLoggedIn){
           navigate('/');
        }
    }, [isLoggedIn]);

    const submitHandler = (values) => {
        const payload = {
            name: values?.name,
            email: values?.email,
            password: values?.password
        }
        setLoading(true)
        signup(payload)
        .then(response => {
            setLoading(false);
            setStorage('userInfo', JSON.stringify(response));
            dispatch({type: LOGIN_SUCCESS, payload: response});
        })
        .catch((err) => {
            setLoading(false);
            console.log(err);
        })
    }

    return (
        <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={(values) => {
            submitHandler(values);
        }}
      >
        {({
          values,
          handleSubmit,
          errors,
          setFieldValue
        }) => {
          return (
            <form className="form-login mt-10" onSubmit={handleSubmit}>
            <div className="single-fild">
                <input
                    className="px-6 h-14 mb-6 border-secondary-90 bg-secondary-100 hover:border-primary transition-all border-2 border-solid block rounded-md w-full focus:outline-none"
                    type="text"
                    placeholder="Name"
                    value={values?.name}
                    onChange={(e) => {
                        setFieldValue('name', e?.target?.value)
                    }}
                />
                {errors?.name && <span className="validation-error">{errors?.name}</span>}
            </div>
            <div className="single-fild">
                <input
                    className="px-6 h-14 mb-6 border-secondary-90 bg-secondary-100 hover:border-primary transition-all border-2 border-solid block rounded-md w-full focus:outline-none"
                    type="email"
                    placeholder="E-mail"
                    value={values?.email}
                    onChange={(e) => {
                        setFieldValue('email', e?.target?.value);
                    }}
                />
                {errors?.email && <span className="validation-error">{errors?.email}</span>}
            </div>
            <div className="single-fild">
                <input
                    className="px-6 h-14 mb-6 border-secondary-90 bg-secondary-100 hover:border-primary transition-all border-2 border-solid block rounded-md w-full focus:outline-none"
                    type="password"
                    placeholder="password"
                    value={values?.password}
                    onChange={(e) => {
                        setFieldValue('password', e?.target?.value);
                    }}
                />
                {errors?.password && <span className="validation-error">{errors?.password}</span>}
            </div>
            <div className="single-fild">
                <input
                    className="px-6 h-14 mb-6 border-secondary-90 bg-secondary-100 hover:border-primary transition-all border-2 border-solid block rounded-md w-full focus:outline-none"
                    type="password"
                    placeholder="Retype Password"
                    value={values?.confirmPassword}
                    onChange={(e) => {
                        setFieldValue('confirmPassword', e?.target?.value);
                    }}
                />
                {errors?.confirmPassword && <span className="validation-error">{errors?.confirmPassword}</span>}
            </div>
            <div className="button text-center">
                <Button className="text-white" type='submit' disabled={loading}>
                {
                        loading ?
                        <div className="loader-div">
                            <ReactLoading type={'spin'} height={'50%'} width={'40%'} />
                        </div>
                        :
                        <>
                        Sign up
                        <StaticImage
                            className="align-middle ml-3 transition-all group-hover:ml-5"
                            src="../../../data/images/icons/arrrow-icon.webp"
                            alt=""
                        />
                        </>
                    }
                </Button>
            </div>
            <div className="button text-center">
                <SocialAuth />
            </div>
            <div className="account-text mt-5 text-center">
                <p>
                    Already have account, {""}
                    <Link to="/login" className="font-semibold text-yellow-400">
                        Login here
                    </Link>
                </p>
            </div>
        </form>
          );
        }}
      </Formik>
    );
};

export default RegisterForm;
