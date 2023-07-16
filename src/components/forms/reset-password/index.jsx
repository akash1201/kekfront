import React, { useState, useEffect } from "react";
import { StaticImage } from "gatsby-plugin-image";
import Button from "../../../components/shared/button";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import ReactLoading from 'react-loading';
import { resetPassword, signup } from "../../../service/auth";
import { useRef } from "react";
import { toast } from "react-toastify";


const initialValues = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
};

const ResetPasswordForm = () => {

    const validationSchema = Yup.object().shape({
        oldPassword: Yup.string().required('Old password is required'),
        newPassword: Yup.string().required('New password is required').matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/, 'Password must have one special character, one number,one upper case and one lower case letter').min(6, 'Min 6 characters required'),
        confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'New and confirm password must match')
        .required('Confirm Password is required'),
        });
    
    const { userInfo } = useSelector(state => state?.auth);

    const [loading, setLoading] = useState(false);

    const formRef = useRef();

    const submitHandler = (values) => {
        const payload = {
            email: userInfo?.email,
            old_password: values?.oldPassword,
            new_password: values?.newPassword
          };
         console.log(payload)
          setLoading(true);
          resetPassword(payload)
          .then(response => {
            if(response?.error){
             toast.error(response?.error || 'something went wrong')
            }else{
            formRef?.current?.resetForm();
            toast.success('password changed successfully');
            }
            setLoading(false);
          });
    }

    return (
        <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={validationSchema}
        innerRef={formRef}
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
                    type="password"
                    placeholder="old password"
                    value={values?.oldPassword}
                    onChange={(e) => {
                        setFieldValue('oldPassword', e?.target?.value);
                    }}
                />
                {errors?.oldPassword && <span className="validation-error">{errors?.oldPassword}</span>}
            </div>
            
            <div className="single-fild">
                <input
                    className="px-6 h-14 mb-6 border-secondary-90 bg-secondary-100 hover:border-primary transition-all border-2 border-solid block rounded-md w-full focus:outline-none"
                    type="password"
                    placeholder="new password"
                    value={values?.newPassword}
                    onChange={(e) => {
                        setFieldValue('newPassword', e?.target?.value);
                    }}
                />
                {errors?.newPassword && <span className="validation-error">{errors?.newPassword}</span>}
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
                        Reset
                        <StaticImage
                            className="align-middle ml-3 transition-all group-hover:ml-5"
                            src="../../../data/images/icons/arrrow-icon.webp"
                            alt=""
                        />
                        </>
                    }
                </Button>
            </div>
        </form>
          );
        }}
      </Formik>
    );
};

export default ResetPasswordForm;
