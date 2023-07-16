import React, { useState } from "react";
import { StaticImage } from "gatsby-plugin-image";
import Button from "../../../components/shared/button";
import { Link, navigate } from "gatsby";
import { Formik } from "formik";
import * as Yup from "yup";
import { login } from "../../../service/auth";
import ReactLoading from "react-loading";
import { setStorage } from "../../../utils/functions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { LOGIN_SUCCESS } from "../../../redux/types/authTypes";
import SocialAuth from "../../social-auth";
import { SHOW_MODAL } from "../../../redux/types/modalType";
import { toast } from "react-toastify";

const initialValues = {
  email: "",
  password: "",
};
const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((state) => state?.auth);
  //validation schema for form
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  const submitHandler = (values) => {
    const payload = {
      email: values?.email,
      password: values?.password,
    };
    setLoading(true);
    login(payload)
      .then((response) => {
        setLoading(false);
        if (!response.token) {
          toast.error(response.message);
          return;
        }
        setStorage("userInfo", JSON.stringify(response));
        dispatch({ type: LOGIN_SUCCESS, payload: response });
        if (response.userCharacter.length) {
          return;
        }
        dispatch({ type: SHOW_MODAL });
      })
      .catch((err) => {
          setLoading(false);
          toast.error("Invalid Email or Password");
      });
  };
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        submitHandler(values);
      }}
    >
      {({ values, handleSubmit, errors, setFieldValue }) => {
        return (
          <form className="form-login mt-10" onSubmit={handleSubmit}>
            <div className="single-fild">
              <input
                className="px-6 h-14 mb-6 border-secondary-90 bg-secondary-100 hover:border-primary transition-all border-2 border-solid block rounded-md w-full focus:outline-none"
                type="email"
                placeholder="E-mail"
                value={values?.email}
                onChange={(e) => {
                  setFieldValue("email", e?.target?.value);
                }}
              />
              {errors?.email && (
                <span className="validation-error">{errors?.email}</span>
              )}
            </div>
            <div className="single-fild">
              <input
                className="px-6 h-14 mb-6 border-secondary-90 bg-secondary-100 hover:border-primary transition-all border-2 border-solid block rounded-md w-full focus:outline-none"
                type="password"
                placeholder="password"
                value={values?.password}
                onChange={(e) => {
                  setFieldValue("password", e?.target?.value);
                }}
              />
              {errors?.password && (
                <span className="validation-error">{errors?.password}</span>
              )}
            </div>
            <div className="button text-center">
              <Button className="text-white" type="submit" disabled={loading}>
                {loading ? (
                  <div className="loader-div">
                    <ReactLoading type={"spin"} height={"50%"} width={"40%"} />
                  </div>
                ) : (
                  <>
                    Login
                    <StaticImage
                      className="align-middle ml-3 transition-all group-hover:ml-5"
                      src="../../../data/images/icons/arrrow-icon.webp"
                      alt=""
                    />
                  </>
                )}
              </Button>
            </div>
            <div className="button text-center">
              <SocialAuth />
            </div>
            <div className="account-text mt-5 text-center">
              <p>
                Do not have any account,{" "}
                <Link to="/register" className="text-yellow-400 font-semibold">
                  Signup here
                </Link>
              </p>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
