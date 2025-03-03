import { Link } from 'react-router-dom'
import '../css/LoginForm.css'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { loginSchema } from '../schemas/loginSchema';

const LoginForm = () => {
    const [passwordShowLogin, setPasswordShowLogin] = useState(false);


    const initialValues = {
        emailName: "",
        emailPassword: "",
        emailRemember: false
    }


    return (
        <div className='loginForm-outer-container-desgin'>
            <Formik
                initialValues={initialValues}
                validationSchema={loginSchema}
                onSubmit={(values, action) => {
                    // same shape as initial values
                    console.log(values);
                    action.resetForm();
                }}
            >
                {() => (
                    <Form>
                        <h3>Account Login</h3>
                        <p>If you are already a member you can login with your email address and password.</p>

                        {/* Email Field */}
                        <label htmlFor="emailName">Email address</label><br />
                        <Field
                            type="email"
                            id="username-email"
                            className='inputUserDetails emailName'
                            name="emailName"
                        />
                        <div style={{ minHeight: "24px" }}>
                            <ErrorMessage name="emailName" component="p" className='form-error' />
                        </div>

                        {/* Password Field */}
                        <label htmlFor="emailPassword">Password</label><br />
                        <div className='email-password-div'>
                            <Field
                                type={(passwordShowLogin) ? "text" : "password"}
                                id="password-email"
                                className='inputUserDetails emailPassword'
                                name="emailPassword" />

                            {(passwordShowLogin) ?
                                <FaEye
                                    className='eyePasswordIcon eyeNotSlash'
                                    onClick={() => {
                                        setPasswordShowLogin((prev) => !prev);
                                    }}
                                />
                                :
                                <FaEyeSlash
                                    className='eyePasswordIcon eyeSlash'
                                    // onClick={handleShowPasswordLogin}
                                    onClick={() => {
                                        setPasswordShowLogin((prev) => !prev);
                                    }}
                                />
                            }
                        </div>
                        <div style={{ minHeight: "24px" }}>
                            <ErrorMessage name="emailPassword" component="p" className='form-error' />
                        </div>
                        {/* Remember Me Checkbox */}
                        <div className='checkbox-Rememberme-login'>
                            <Field
                                type="checkbox" name="emailRemember" id="emailRemember" /><label htmlFor="emailRemember">Remember me</label>
                        </div>
                        <br />

                        <button type="submit">Login</button><br /><br />
                    </Form>
                )}
            </Formik>
            <p className='signUpInfo-para'>
                Dont have an account ? &nbsp;
                <Link to="/signup" className='signUpLink'>
                    <span className='login-sign-in'>
                        Sign up here
                    </span>
                </Link>
            </p>
        </div>
    )
}

export default LoginForm
